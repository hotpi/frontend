import { combineReducers } from 'redux';
import { v4 } from 'node-uuid';

import note from './note';

export const notes = (state = {}, action) => {
  switch(action.type) {
    case 'DELETE_NOTE':
      delete state[action.NoteID]
      return state;
    case 'NEW_NOTE':
    case 'CREATE_AND_APPEND_LAST':
    case 'CREATE_AND_APPEND_NEXT':
    case 'DELETE_LINE':
    case 'MERGE_NOTES':
    case 'CHANGE_NOTE_TYPE':
      return {
        ...state,
        [action.NoteID]: note(state[action.NoteID], action) 
      };
    default: 
      return state;
  }
}

export default notes;

export const getNoteLineIds = (state, noteId) => state[noteId].noteLines;