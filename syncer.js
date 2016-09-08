import 'offline-js';
import { throttle } from 'lodash';

import * as fromDatabase from './helpers/databaseStorage';
import * as fromFakeBackend from './fakeBackend';

class syncer {
  constructor() {
    this._lastConnectionAt = Date.now()
    this._initialLoad = false

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
  }

  generateOperation(newOp) {
    if (this.inFlight) {
      buffer.push(newOp)
    } else {
      this.inflightOp = newOp
      //sendToServer(this.inflightOp, this.revisionNr)
    }

    //apply
  }

  transform(operations, receivedOp) {
    receivedOp = operations.reduce( (prev, curr) => {
      return xformT(prev[0], curr);
    }, [receivedOp, {}])

    return receivedOp;
  }

  apply(operationFunction) {
    if (typeof operationFunction !== 'function') {
      return 'Error: first argument of apply must be a function';
    }

    return operationFunction(receivedOp); 
  }

  insertNode(receivedOp) {
    const { accessPath, node } = receivedOp 
    let insertAt = jumpToAccessPath(accessPath)
    let applied = [
      ...insertAt.slice(0, accessPath[receivedOp.accessPath.length-1] + 1),
      node,
      ...insertAt.slice(accessPath[receivedOp.accessPath.length-1] + 1),
    ]
    // translate back to the type of collection
    saveChanges(accessPath, applied, 'insert', node)
    // save to database
    return true; 
  } 

  deleteNode(receivedOp) {
    const { accessPath } = receivedOp 
    let deleteAt = jumpToAccessPath(accessPath)
    let deletedNode = deleteAt[accessPath[accessPath.length-1]]
    let applied = [
      ...deleteAt.slice(0, accessPath[accessPath.length-1]),
      ...deleteAt.slice(accessPath[accessPath.length-1] + 1)
      ]
    // translate back to the type of collection
    // save to database
    saveChanges(accessPath, applied, 'delete', deletedNode)

    return true;
  }

  // Fetch from server localhost:3001/sendOp

  // Fetch uid 

  // Fetch current status

  opReceived(receivedOp) {
    this.revisionNr++

    if (receivedOp.acknowledge !== 'undefined') {
      if ( this.buffer.length > 0) {
        this.inflightOp = buffer.shift()
        // sendToServer(this.inflightOp, this.revisionNr)
      } else {
        this.inflightOp = null
        this.inFlight = false
      }
    } else {
      if (!this.inFlight) {
        let transformFirst = xformT(receivedOp, this.inflightOp)
        receivedOp = transformFirst[0]
        this.inflightOp = transformFirst[1]

        this.transform(this.buffer, receivedOp)
      }
    }
    apply(receivedOp.type === 'insert' ? insertNode : deleteNode)(receivedOp)
  }

  initializeSynchronization(timeOfReconnection) {
    fromDatabase.loadActionsFromQueue([this._lastConnectionAt, timeOfReconnection]).then(response => console.log(response))
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
      return this.delay(500).then(() => {
        console.log(fromFakeBackend.fakeBackend)
        return fromFakeBackend.fakeBackend      
      });
    }

    return this.delay(500).then(
      () => {
        return fromDatabase.loadState().then(
          state => {
            return {entities: state}
          }, 
          error => console.log('initialLoad failed: ', error)
        ).catch(
          console.log.bind(console, 'something went wrong..')
        )
      }
    )
  }

  saveCurrentStateIntoIndexedDB() {
    fromDatabase.saveState(this._store.getState().entities)
  }

  saveActionIntoQueue(action) {
    fromDatabase.saveActionIntoQueue(action)
  }

  fetchState() {
    if (this._connectionStatus === 'up') {
      return this.delay(500).then(() => {
        return fromFakeBackend.fakeBackend      
      }).catch(console.log.bind(console, 'Error getting state from server: '));
    }
    return this.delay(5000).then(() => {
      return fromDatabase.loadState().then(state => state)
    }).catch(console.log.bind(console, 'Error getting state from indexed db: '));
  } 

}

export default syncer;