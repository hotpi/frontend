import { throttle } from 'lodash';
import 'isomorphic-fetch';
import Promise from 'bluebird';
import Emitter from 'component-emitter';
import request from 'superagent';
import Throttle from 'superagent-throttle';
import * as fromDatabase from './helpers/databaseStorage';
import * as fromFakeBackend from './fakeBackend';
import xformT from './helpers/xformT';
import { translateActionToOperation, translateOperationToAction } from './helpers/actionTranslator'

const ROOT_URL = __API_ROOT_URL__
const BROADCAST_URL = ROOT_URL + 'sync/status/'
const SEND_OP_URL = ROOT_URL + 'sync/sendOp'
const SUBSCRIBE_URL = ROOT_URL + 'sync/subscribe'
const INITAL_STATE_URL = ROOT_URL + 'sync/initialState'
const MONITOR_URL = ROOT_URL + 'health-check'

var connectionEmitter = new Emitter

const superagentThrottle = new Throttle({
  active: true,     // set false to pause queue
  rate: 10,          // how many requests can be sent every `ratePer`
  ratePer: 5000,   // number of ms in which `rate` requests may be sent
  concurrent: 5     // how many requests can be sent concurrently
})

class syncer {
  constructor() {
    this._lastConnectionAt = Date.now()
    this._initialLoad = false
    this._connectionStatus = 'up'
    this.requestArray = []

    connectionEmitter.on('disconnected', (e) => {
      this._connectionStatus = 'down'
      this.requestArray.map(request => {
        if (typeof request.abort === 'function') {
          request.abort()
        }
      })
      this.monitorConnectionToServer()
      console.log('working')
    })

    connectionEmitter.on('reconnected', (e) => {
      this._connectionStatus = 'up'
      this.listen()
      this.inFlight ? this.sendToServer() : console.log('buffer empty');
      console.log('working too')
    })
    // Offline.on('down', () => {
      // this._lastConnectionAt = Date.now()
    // })

    /*Offline.on('up', () => {
      this.initializeSynchronization(Date.now())
    })*/

    this.inflightOp = null
    this.inFlight = false
    this.buffer = []
    this.revisionNr = 0
    this.uid = 0

    if (!this.subscribe()) {
      throw new Error('Unable to fetch uid')
    }

    this.listen()
  }

  newAction(action) {
    let translatedOperation = translateActionToOperation(action, this._store)

    if (typeof translatedOperation !== 'undefined') {
      if (translatedOperation.length === 2) {
        let operation = {

        origin: this.uid, //import uid
        type: translatedOperation[0][0],
        accessPath: translatedOperation[0][1],
        node: translatedOperation[0][2],
        action: translatedOperation[0][3]
        }


        console.log('--------------operation--------')
        console.log(operation)
        

        this.generateOperation(operation)
        translatedOperation = translatedOperation[1]
      }
      
      let operation = {
        origin: this.uid, //import uid
        type: translatedOperation[0],
        accessPath: translatedOperation[1],
        node: translatedOperation[2],
        action: translatedOperation[3]
      }

      console.log('--------------operation--------')
      console.log(operation)


      this.generateOperation(operation)
      
    }

  }

  monitorConnectionToServer() {
    var retry = true

    var monitoredRequest = request
      .head(MONITOR_URL)
      .timeout(300)
      .end((err, res) => {

        if (res !== undefined) {
          connectionEmitter.emit('reconnected')
          retry = false
          return {}
        }
      })
    console.log(monitoredRequest)
    setTimeout(() => {
      if (typeof monitoredRequest.abort === 'function') {
        monitoredRequest.abort()
      }

      if (retry) {
        this.monitorConnectionToServer()
      }      
    }, 500)
  }

  generateOperation(newOp) {
    if (this.inFlight) {
      this.buffer.push(newOp)
    } else {
      this.inFlight = true
      this.inflightOp = newOp
      
      if (this._connectionStatus === 'up') {
        this.sendToServer()
      }
    }
  }

  transform(operations, receivedOp) {
    receivedOp = operations.reduce( (prev, curr) => {
      return xformT(prev[0], curr);
    }, [receivedOp, {}])

    return receivedOp;
  }

  apply(operationFunction) {
    console.log('apply')

    if (typeof operationFunction !== 'function') {
      return 'Error: first argument of apply must be a function';
    }

    return operationFunction; 
  }

  // Fetch from server localhost:3001/sendOp
  sendToServer() {
    request
      .post(SEND_OP_URL)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json; charset=utf-8')
      .send({operation: this.inflightOp})
      .send({revisionNr: this.revisionNr})
      .then(
        (res) => {
          if (res.ok) {
            console.log(res.body)
          }

          return true;
        },
        (err) => {
          connectionEmitter.emit('disconnected')
          console.log('Something went wrong..', err)
        }
      )

    return 
  }

  // Fetch uid 
  subscribe() {
    console.log('subscribe')
    return request
      .get(SUBSCRIBE_URL)
      .then(
        (res) => {
          console.log(res.body)
          this.uid = res.body.uid
          this.revisionNr = res.body.revisionNr

          return true;
        },
        (err) => {
          connectionEmitter.emit('disconnected')
          console.log('Something went wrong..', err)
        })
  }

    // Fetch current status
  listen() {
    if (this.uid === 0 || this._connectionStatus === 'down') {
      return setTimeout(() => this.listen(), 500)
    }

    console.log('listen')
    if (this._connectionStatus === 'up') {
      let nextRequest = request
        .get(BROADCAST_URL + this.uid + '/' + this.revisionNr)
        .use(superagentThrottle.plugin())
        .then(
          (res) => { 
            console.log(res.body)
            
            if (res.body.empty === undefined) {
              console.log('---------operation received--------')
              console.log(res.body)
              this.opReceived(res.body)
            }
            console.log('status', this._connectionStatus)
            this.listen()

            return res.body
          },
          (err) => {
            if (err !== null) {
              connectionEmitter.emit('disconnected')
              console.log('Something went wrong..', err)
            }
          }
        )
      this.requestArray.push(nextRequest)       
    } 
  }

  opReceived(receivedOp) {
    this.revisionNr++

    if (typeof receivedOp.acknowledge !== 'undefined') {
      if ( this.buffer.length > 0) {
        this.inflightOp = this.buffer.shift()
        this.sendToServer()
      } else {
        this.inflightOp = null
        this.inFlight = false
      }
    } else {
      if (this.inflightOp) {
        let transformFirst = xformT(receivedOp, this.inflightOp)
        receivedOp = transformFirst[0]
        this.inflightOp = transformFirst[1]

        receivedOp = this.transform(this.buffer, receivedOp)[0]
      }

      this.apply(this._store.dispatch)(translateOperationToAction(receivedOp, this._store))
    }

  }

  setStore(store) {
    this._store = store
    this._store.subscribe(throttle(() => {
      this.saveCurrentStateIntoIndexedDB()
    }, 1000))
  }

  initialLoad() {
    // if connection === up get the initialLoad from server
    if (this._connectionStatus === 'up') {
      return request
        .get(INITAL_STATE_URL)
        .then(
          (res) => {
            console.log(res.body)
          
            return { entities: res.body };
          },
          (err) => {
            connectionEmitter.emit('disconnected')
            console.log.bind(console, 'something went wrong..')
          });
    }

    return fromDatabase.loadState().then(
      state => {
        return {entities: state}
      }, 
      error => console.log('initialLoad failed: ', error)
      )
      .catch(
        console.log.bind(console, 'something went wrong..')
      );
  }

  saveCurrentStateIntoIndexedDB() {
    fromDatabase.saveState(this._store.getState().entities)
  }

  saveOperationIntoQueue(operation) {
    fromDatabase.saveOperationIntoQueue(operation)
  }

  fetchState() {
    if (this._connectionStatus === 'up') {
      return this.delay(500).then(() => {
        return fromFakeBackend.fakeBackend      
      }).catch(console.log.bind(console, 'Error getting state from server: '));
    }
    return this.delay(0).then(() => {
      return fromDatabase.loadState().then(state => state)
    }).catch(console.log.bind(console, 'Error getting state from indexed db: '));
  } 

}

export default syncer;