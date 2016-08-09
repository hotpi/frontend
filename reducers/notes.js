import { combineReducers } from 'redux';
import { v4 } from 'node-uuid';

import note, * as fromNote from './note'

const byId = (state = {}, action) => {
  switch(action.type) {
    case 'CHANGE_NOTE_TYPE':
    case 'NEW_NOTE':
    case 'NOT_EMPTY_AND_NOT_LAST':
    case 'HIGHLIGHT_LINE':
    case 'IMPORTANT_LINE':
    case 'UPDATE_LINE_VALUE':
    case 'CREATE_AND_APPEND_LAST':
    case 'CREATE_AND_APPEND_NEXT':
    case 'DELETE_LINE':
      return {
        ...state,
        [action.noteId]: note(state[action.noteId], action)
      };
    default: 
      return state;
  }
}

const allIds = (state = [], action) => {
  switch(action.type) {
    case 'NEW_NOTE':
      return [
        ...state,
        action.noteId
      ];
    default:
      return state;
  }
}

const notes = combineReducers({
  byId,
  allIds
});

export default notes;

export const getAllNoteLines = (state, noteId) => fromNote.getAllNoteLines(state.byId[noteId])

export const getNoteLineById = (state, noteId, noteLineId) => fromNote.getNoteLineById(state.byId[noteId], noteLineId)
