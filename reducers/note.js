import { combineReducers } from 'redux';
import { v4 } from 'node-uuid';

import noteLines, * as fromNoteLines from './noteLines'

const noteProperties = (state = {
  type: "New"
}, action) => {

  switch(action.type) {
    case 'CHANGE_NOTE_TYPE':
      return {
        ...state,
        type: action.value
      }
    default: 
      return state
  }
}

const note = combineReducers({
  noteProperties,
  noteLines
});

export default note;

export const getAllNoteLines = (state) => fromNoteLines.getAllNoteLines(state.noteLines)
export const getNoteLineById = (state, id) => fromNoteLines.getNoteLineById(state.noteLines, id)