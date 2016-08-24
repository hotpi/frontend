import { db, middleware } from '../index';


const actionQueue = (store) => (next) => (action) =>  {
  middleware.saveActionIntoQueue(action)
  return next(action);
} 

export default actionQueue;