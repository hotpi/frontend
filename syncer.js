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