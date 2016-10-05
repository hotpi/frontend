import { db, middleware } from '../index';

import * as syncTypes from '../actions/sync';
import * as noteTypes from '../actions/note';
import * as noteLineTypes from '../actions/noteLines';
import * as patientTypes from '../actions/patients';

const actionQueue = (store) => (next) => (action) =>  {
  if (syncTypes[action.type]) {
    return next(action)
  }

  if (typeof action.fromServer === 'undefined') {
    middleware.newAction(action)
  }
  if (typeof action.next === 'function') {
    next(action)

    return next(action.next());    
  }
  

  return next(action);
} 



export default actionQueue;