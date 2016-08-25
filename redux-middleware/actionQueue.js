import { db, middleware } from '../index';
import * as syncTypes from '../actions/sync'


const actionQueue = (store) => (next) => (action) =>  {
  if (syncTypes[action.type]) {
    return next(action)
  }

  middleware.saveActionIntoQueue(action)
  return next(action);
} 

export default actionQueue;