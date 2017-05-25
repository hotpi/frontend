import Emitter from 'component-emitter';
import request from 'superagent';

// eslint-disable-next-line
const ROOT_URL = __API_ROOT_URL__;
const MONITOR_URL = ROOT_URL + 'health-check';

class ConnectionMonitor {
  constructor() {
    this.status = 'up';
    this.lastConnectionAt = Date.now();
    this.lastAttemptToReconnect = Date.now();

    // eslint-disable-next-line
    this.connectionEmitter = new Emitter;    

    this.onDisconnectDo = this.onDisconnectDo.bind(this);
    this.onReconnectDo = this.onReconnectDo.bind(this);

    this.disconnectListener = this.listenToEvent('disconnected', [ this.onDisconnectDo ]);
    this.reconnectListener = this.listenToEvent('reconnected', [ this.onReconnectDo ]);
  }

  listenToEvent(event, callbacks) {
    // TODO: How to check whether callbacks is a function or an function array
    if (typeof event !== 'string') {
      throw new Error('event must be a string');
    }

    return this.connectionEmitter.on(event, () => {
      if (callbacks.length > 0) {
        callbacks.forEach(callback => {
          callback();
        });
      }

      return null;
    });
  }

  onDisconnectDo() {
    this.status = 'down';
    this.lastConnectionAt = Date.now();
    this.monitorConnectionToServer();
  }

  onReconnectDo() {
    this.status = 'up';
  }

  emit(event) {
    if (typeof event !== 'string') {
      throw new Error('Event must be a string');
    }

    this.connectionEmitter.emit(event);

    return null;
  }

  monitorConnectionToServer() {
    let retry = true;
    this.lastAttemptToReconnect = Date.now();

    let monitoredRequest = request
      .head(MONITOR_URL)
      .timeout(300)
      .end((err, res) => {
        if (res) {
          this.emit('reconnected');
          retry = false;
          return {};
        }

        return null;
      });
      // console.log(monitoredRequest)
    setTimeout(() => {
      if (typeof monitoredRequest.abort === 'function') {
        monitoredRequest.abort();
      }

      if (retry) {
        this.monitorConnectionToServer();
      }
    }, 10000);

    return null;
  }

  getConnectionStatus() {
    return this.status;
  }
}

export default ConnectionMonitor;
