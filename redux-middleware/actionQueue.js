import { middleware } from '../index';

import * as syncTypes from '../actions/sync';

// eslint-disable-next-line
const actionQueue = (store) => (next) => (action) => {
  if (syncTypes[action.type]) {
    return next(action);
  }

  if (typeof action.fromServer === 'undefined') {
    middleware.newAction(action);
  }

  return next(action);
};

export default actionQueue;
