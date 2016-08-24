import 'offline-js';
import { throttle } from 'lodash';

import * as fromDatabase from './databaseStorage';

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
      // get from server
      // on error log it and get it from indexeddb
    }
    return this.delay(5000).then(() => {
      return fromDatabase.loadState().then(state => state)
    });
  } 

}

export default syncer;