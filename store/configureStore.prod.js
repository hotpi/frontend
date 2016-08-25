import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import rootReducer from '../reducers';
import actionQueue from '../redux-middleware/actionQueue';

const configureStore = (state) => {
  const store = createStore(
    rootReducer,
    state,
    applyMiddleware(thunk, actionQueue/*, api, */)
  )

  return store;
}

export default configureStore;