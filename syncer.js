import 'offline-js';
import { throttle } from 'lodash';
import 'isomorphic-fetch';
import Promise from 'bluebird';

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

const POST_FETCH_CONF = (body) => {
  console.log( body )
  const POST_CONF = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
    },
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(body)  
  }

  console.log(POST_CONF)
  return POST_CONF
}

class syncer {
  constructor() {
    this._lastConnectionAt = Date.now()
    this._initialLoad = false

    Offline.options = {checks: {xhr: {url: MONITOR_URL}}};

    Offline.on('down', () => {
      this._lastConnectionAt = Date.now()
    })

    Offline.on('up', () => {
      this.initializeSynchronization(Date.now())
    })

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
        
        if (Offline.state === 'up') {
          this.generateOperation(operation)
        } else {
          this.saveOperationIntoQueue(operation)
        }

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

      if (Offline.state === 'up') {
        this.generateOperation(operation)
      } else {
        this.saveOperationIntoQueue(operation)
      }
    }

  }

  generateOperation(newOp) {
    console.log('generateOperation')
    if (this.inFlight) {
      this.buffer.push(newOp)
    } else {
      this.inFlight = true
      this.inflightOp = newOp
      this.sendToServer()
    }
  }

  transform(operations, receivedOp) {
    console.log('transform')

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
    console.log('sendToServer')

    fetch(SEND_OP_URL, POST_FETCH_CONF({
      operation: this.inflightOp,
      revisionNr: this.revisionNr
    }))
      .then(response =>
        response.json().then(body => ({ body, response }))
      ).then(({ body, response }) => {
        if (!response.ok) {
          throw new Error(body)
        }

        if (response.ok) {
            console.log(body)
          //this.opReceived(response)
        }

        return true;
      })

    return 
  }

  // Fetch uid 
  subscribe() {
    console.log('subscribe')
    return fetch(SUBSCRIBE_URL)
      .then(response => 
        response.json().then(body => ({ body, response }))
        ).then(({ body, response }) => {
          if (!response.ok) {
            throw new Error(body)
          }

          console.log(body)
          this.uid = body.uid
          this.revisionNr = body.revisionNr

          return true;
        })
  }

  timeout(ms, promise) {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve(new Response(JSON.stringify({empty: 'true'}), {ok: true}))
      }, ms)
      promise.then(resolve, reject)
    })
  }


  *poll() {
    while(true) {
      console.log(Offline.state)
      if (Offline.state === 'up') {
        yield fetch(BROADCAST_URL + this.uid + '/' + this.revisionNr)
          .then(response => {
            console.log(response)
            return response.json().then(body => ({ body, response }))
          }
          ).then(({ body, response }) => {
            if (!response.ok) {
              throw new Error(body)
            }

            console.log(body)
            if (typeof body.empty === 'undefined') {
              this.opReceived(body)
            }

            return body;
          })
      }
    }
  }

  // Fetch current status
  listen(generator) {
    if (this.uid === 0 || Offline.state === 'down') {
      return setTimeout(() => this.listen(), 500)
    }

    console.log('listen')

    if (!generator) {
      generator = this.poll()
    }

    var nextIteration = generator.next()

    nextIteration.value.then( (response) => {
      this.listen(generator)
    })
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

  initializeSynchronization(timeOfReconnection) {
    fromDatabase.loadOperationsFromQueue([this._lastConnectionAt, timeOfReconnection])
      .then(operations => {
        console.log(operations)
      })
    // send to server actions
    // wait for them to be received
    // synchronize
    // send back version
  }

  setStore(store) {
    this._store = store
    this._store.subscribe(throttle(() => {
      this.saveCurrentStateIntoIndexedDB()
    }, 1000))
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  initialLoad() {
    // if connection === up get the initialLoad from server
    if (Offline.state === 'up') {
      return fetch(INITAL_STATE_URL)
        .then(response => {
          console.log(response)
          return response.json().then(body => ({ body, response }))
        })
        .then(({ body, response }) => {
          if (!response.ok) {
            throw new Error(body)
          }

          console.log(body)
          

          return { entities: body };
        })
        .catch(
          console.log.bind(console, 'something went wrong..')
        );
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