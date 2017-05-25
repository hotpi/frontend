import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Perf from 'react-addons-perf';

window.Perf = Perf;

import Dexie from 'dexie';

import Root from './containers/main/Root';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import configureStore from './store/configureStore';

import Syncer from './syncer';
import ConnectionMonitor from './resync/src/connectionMonitor';

export const db = new Dexie('hotpi');

db.version(1).stores({
  operations: '++id, executionTime, operation',
  state: '++id, state'
});

export const connectionMonitor = new ConnectionMonitor();
export const middleware = new Syncer();

middleware.initialLoad().then(state => {
  const store = configureStore(state);
  const history = syncHistoryWithStore(browserHistory, store);

  middleware.setStore(store);

  injectTapEventPlugin();

  render(
    <MuiThemeProvider style={{
      height: '100vh',
      width: '100%'
    }}
    >
      <Root
        history={history}
        store={store}
      />
    </MuiThemeProvider>,
    document.getElementById('app')
  );
})
.catch((error) => {
  throw new Error('Unexpected error: ', error);
});
