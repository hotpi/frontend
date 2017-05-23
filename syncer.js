import 'isomorphic-fetch';
import Emitter from 'component-emitter';
import request from 'superagent';
import Throttle from 'superagent-throttle';
import * as fromDatabase from './helpers/databaseStorage';
import * as fromFakeBackend from './fakeBackend';
import xformT from './helpers/xformT';
import {
  translateActionToOperation,
  translateOperationToAction
} from './helpers/actionTranslator';
import ConnectionMonitor from './resync/src/connectionMonitor';
// eslint-disable-next-line
const connectionEmitter = new Emitter;

// eslint-disable-next-line
const ROOT_URL = __API_ROOT_URL__;
const BROADCAST_URL = ROOT_URL + 'sync/status/';
const SEND_OP_URL = ROOT_URL + 'sync/sendOp';
const SUBSCRIBE_URL = ROOT_URL + 'sync/subscribe';
const INITAL_STATE_URL = ROOT_URL + 'sync/initialState';

const superagentThrottle = new Throttle({
  // set false to pause queue
  active: true,
  // how many requests can be sent every `ratePer`
  rate: 30,
  // number of ms in which `rate` requests may be sent
  ratePer: 5000,
  // how many requests can be sent concurrently
  concurrent: 10
});

class Syncer {
  constructor() {
    this.lastConnectionAt = Date.now();
    this.initialLoad = false;
    this.hasAcknowledge = true;
    // TODO: get it from connectionMonitor
    this.connectionStatus = 'up';
    this.longPolledRequests = [];
    this.newOperationRequests = [];

    this.inflightOp = null;
    this.inFlight = false;
    this.buffer = [];
    this.revisionNr = 0;
    this.uid = 0;

    this.connectionMonitor = new ConnectionMonitor();
    this.disconnectionListener = this.connectionMonitor.listenToEvent(
      'disconnected',
      [
        this.onDisconnectDo.bind(this, this.longPolledRequests, this.newOperationRequests),
        this.getConnectionStatus.bind(this)
      ]
    );

    this.reconnectionListener = this.connectionMonitor.listenToEvent(
      'reconnected',
      [
        this.listen.bind(this),
        this.sendToServer.bind(this),
        this.getConnectionStatus.bind(this)
      ]
    );

    if (!this.subscribe()) {
      throw new Error('Unable to fetch uid');
    }

    this.listen();
  }

  getConnectionStatus() {
    this.connectionStatus = this.connectionMonitor.getConnectionStatus();
    return this.connectionStatus;
  }

  onDisconnectDo(queuedLongPollingRequests, queuedOperationRequests) {
    // this.hasAcknowledge = false;
    // Abort all queued long-polled requests that are open.
    queuedLongPollingRequests.map(longPolledRequest => {
      if (typeof longPolledRequest.abort === 'function') {
        longPolledRequest.abort();
      }
    });

    // Abort all queued new operation requests that are open.
    queuedOperationRequests.map(newOperationRequest => {
      if (typeof newOperationRequest.abort === 'function') {
        newOperationRequest.abort();
      }
    });
  }

  newAction(action) {
    let translatedOperation = translateActionToOperation(action, this.store);

    if (typeof translatedOperation !== 'undefined') {
      if (translatedOperation.length === 2) {
        let operation = {
          // import uid
          origin: this.uid,
          type: translatedOperation[0][0],
          accessPath: translatedOperation[0][1],
          node: translatedOperation[0][2],
          action: translatedOperation[0][3]
        };

        this.generateOperation(operation);
        translatedOperation = translatedOperation[1];
      }

      let operation = {
        // import uid
        origin: this.uid,
        type: translatedOperation[0],
        accessPath: translatedOperation[1],
        node: translatedOperation[2],
        action: translatedOperation[3]
      };

      this.generateOperation(operation);
    }
  }

  generateOperation(newOp) {
    if (this.inFlight) {
      this.buffer.push(newOp);
    } else {
      this.inFlight = true;
      this.inflightOp = newOp;

      if (this.connectionStatus === 'up') {
        this.sendToServer();
      }
    }
  }

  transform(operations, receivedOp) {
    receivedOp = operations.reduce((prev, curr) => {
      return xformT(prev[0], curr);
    }, [receivedOp, {}]);

    return receivedOp;
  }

  apply(operationFunction) {
    if (typeof operationFunction !== 'function') {
      throw new Error('First argument of apply must be a function');
    }

    return operationFunction;
  }

  // Fetch from server localhost:3001/sendOp
  sendToServer() {
    // console.log('Sending operation: ', this.inflightOp, 'revisionNr: ', this.revisionNr);
    if (this.inFlight && this.hasAcknowledge) {
      this.hasAcknowledge = false;
      let newOperationRequest = request
        .post(SEND_OP_URL)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json; charset=utf-8')
        .send({
          operation: this.inflightOp
        })
        .send({
          revisionNr: this.revisionNr
        })
        .then(
          (res) => {
            if (res.ok) {
              // console.log(res.body)
            }

            return true;
          },
          (err) => {
            connectionEmitter.emit('disconnected');
            throw new Error('Something went wrong..', err);
            // console.log('Something went wrong..', err)
          }
        );
      this.newOperationRequests.push(newOperationRequest);
    }
    if (!this.hasAcknowledge) {
      setTimeout(() => {
        this.sendToServer();
      }, 3000);
    }

    return;
  }

  // Fetch uid
  subscribe() {
    return request
      .get(SUBSCRIBE_URL)
      .then(
        (res) => {
          this.uid = res.body.uid;
          this.revisionNr = res.body.revisionNr;

          return true;
        },
        (err) => {
          connectionEmitter.emit('disconnected');
          throw new Error('Something went wrong..', err);
        }
      );
  }

  // Fetch current status
  listen() {
    if (this.uid === 0 || this.connectionStatus === 'down') {
      return setTimeout(() => this.listen(), 500);
    }

    if (this.connectionStatus === 'up') {
      let nextRequest = request
        .get(BROADCAST_URL + this.uid + '/' + this.revisionNr)
        .use(superagentThrottle.plugin())
        .then(
          (res) => {
            if (!res.body.empty) {
              this.opReceived(res.body);
            } else {
              this.hasAcknowledge = true;
            }

            this.listen();

            return res.body;
          },
          (err) => {
            if (err !== null) {
              connectionEmitter.emit('disconnected');
              throw new Error('Something went wrong..', err);
            }
          }
        );

      this.longPolledRequests.push(nextRequest);
    }

    return null;
  }

  // if inflightop was affected through the transformation
  // should it be sent again and cancel the last one?
  opReceived(receivedOp) {
    // console.log('Operation received: ', receivedOp, 'current revisionNr: ', this.revisionNr)
    this.revisionNr = this.revisionNr + 1;
    if (typeof receivedOp.acknowledge !== 'undefined') {
      this.hasAcknowledge = true;

      if (this.buffer.length > 0) {
        this.inflightOp = this.buffer.shift();
        this.sendToServer();
      } else {
        this.inflightOp = null;
        this.inFlight = false;
      }
    } else {
      if (this.inflightOp) {
        let transformFirst = xformT(receivedOp, this.inflightOp);
        receivedOp = transformFirst[0];
        this.inflightOp = transformFirst[1];

        receivedOp = this.transform(this.buffer, receivedOp)[0];
      }

      this.apply(this.store.dispatch)(translateOperationToAction(receivedOp, this.store));
    }
  }

  setStore(store) {
    this.store = store;
      // this.store.subscribe(throttle(() => {
      //  this.saveCurrentStateIntoIndexedDB()
      // }, 1000))
  }

  initialLoad() {
    // if connection === up get the initialLoad from server
    if (this.connectionStatus === 'up') {
      return request
        .get(INITAL_STATE_URL)
        .then(
          (res) => {
            // console.log(res.body)

            return {
              entities: res.body
            };
          },
          (err) => {
            connectionEmitter.emit('disconnected');
            throw new Error('Something went wrong fetching initial state..' + err);
          }
        );
    }

    return fromDatabase.loadState().then(
        state => {
          return {
            entities: state
          };
        },
        error => {
          throw new Error('Initial load from database failed: ', error);
        }
      )
      .catch((err) => {
        throw new Error('Something went wrong..' + err);
      });
  }

  saveCurrentStateIntoIndexedDB() {
    fromDatabase.saveState(this.store.getState().entities);
  }

  saveOperationIntoQueue(operation) {
    fromDatabase.saveOperationIntoQueue(operation);
  }

  fetchState() {
    if (this.connectionStatus === 'up') {
      return this.delay(500).then(() => {
        return fromFakeBackend.fakeBackend;
      })
      .catch((err) => {
        throw new Error('Error getting state from server: ' + err);
      });
    }

    return this.delay(0).then(() => {
      return fromDatabase.loadState().then(state => state);
    })
    .catch((err) => {
      throw new Error('Error getting state from indexed Db: ' + err);
    });
  }

}

export default Syncer;
