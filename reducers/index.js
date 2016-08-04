import { combineReducers } from 'redux';

import { note } from './note'
import { noteLines } from './noteLines'

const reducer = combineReducers({
  note,
  noteLines
})

export default reducer;