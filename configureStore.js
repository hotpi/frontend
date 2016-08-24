import { v4 } from 'node-uuid'; //TODO: Delete me when the time is right
import rootReducer from './reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import actionQueue from './middleware/actionQueue';

const configureStore = (state) => {
  const store = createStore(
    rootReducer,
    state,
    compose(
      applyMiddleware(thunk, actionQueue, /*api, */createLogger()),
      window.devToolsExtension && window.devToolsExtension()
      //DevTools.instrument()
    )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store;
}

export default configureStore;
