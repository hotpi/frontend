import { combineReducers } from 'redux';

import { routerReducer as routing } from 'react-router-redux';
import note from './note'
import noteLines from './noteLines'

const rootReducer = combineReducers({
  note,
  noteLines,
  routing
})

export default rootReducer;