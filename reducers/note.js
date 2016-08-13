import { combineReducers } from 'redux';
import { v4 } from 'node-uuid';

import { allIds as noteLines } from './noteLines'
import  * as fromNoteLines from './noteLines'

const note = (state = {
  ID: '',
  type: "new",
  noteLines: []
}, action) => {

  switch(action.type) {
    case 'NEW_NOTE':
      return {
        ...state, 
        ID: action.NoteID,
        noteLines: [...state.noteLines, action.NoteLineID]
      }
    case 'CHANGE_NOTE_TYPE':
      return {
        ...state,
        type: action.value
      }
    case 'DELETE_LINE':
      return {
        ...state,
        noteLines: state.noteLines.filter(noteLineId => noteLineId !== action.NoteLineID)
      }
    case 'CREATE_AND_APPEND_NEXT':
      return {
        ...state,
        noteLines: [
          ...state.noteLines.slice(0, action.index+1), 
          action.NoteLineID,
          ...state.noteLines.slice(action.index+1)
        ]
      }
    case 'CREATE_AND_APPEND_LAST':
      return {
        ...state,
        noteLines: [...state.noteLines, action.NoteLineID]
      }
    default: 
      return state
  }
}

export default note;