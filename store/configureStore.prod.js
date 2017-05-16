import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';
import actionQueue from '../redux-middleware/actionQueue';

const configureStore = (state) => {
  const store = createStore(
    rootReducer,
    state,
    applyMiddleware(thunk, actionQueue)
  );

  return store;
};

export default configureStore;
