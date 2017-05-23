import Emitter from 'component-emitter';
import request from 'superagent';

// eslint-disable-next-line
const ROOT_URL = __API_ROOT_URL__;
const MONITOR_URL = ROOT_URL + 'health-check';

class ConnectionMonitor {
  constructor() {
    this.status = 'down';
    this.lastConnectionAt = Date.now();
    this.lastAttemptToReconnect = Date.now();

    // eslint-disable-next-line
    this.connectionEmitter = new Emitter;    

    this.onDisconnectDo = this.onDisconnectDo.bind(this);
    this.onReconnectDo = this.onReconnectDo.bind(this);

    this.createEvents();
  }

  listenToEvent(event, callbacks) {
    // TODO: How to check whether callbacks is a function or an function array
    if (typeof event !== 'string') {
      throw new Error('event must be a string');
    }

    return this.connectionEmitter.on(event, () => {
      if (callbacks.length === 1) {
        callbacks();
      } else if (callbacks.length > 2) {
        callbacks.forEach(callback => {
          callback();
        });
      }

      return null;
    });
  }

  createEvents() {
    // TODO: use the factory?
    this.connectionEmitter.on(
      'disconnected',
      this.onDisconnectDo
      );

    this.connectionEmitter.on('reconnected', this.onReconnectDo);
  }

  onDisconnectDo() {
    this.status = 'down';
    // this.hasAcknowledge = false;
    this.monitorConnectionToServer();
    // console.log('working')
  }

  onReconnectDo() {
    this.status = 'up';
    // this.listen();

    // this.sendToServer();

    // console.log('working too')
  }

  monitorConnectionToServer() {
    let retry = true;

    let monitoredRequest = request
      .head(MONITOR_URL)
      .timeout(300)
      .end((err, res) => {
        if (!res) {
          this.connectionEmitter.emit('reconnected');
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
    }, 5000);

    return null;
  }

  getConnectionStatus() {
    return this.status;
  }
}

export default ConnectionMonitor;
