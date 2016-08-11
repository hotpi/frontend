import { combineReducers } from 'redux';
import { v4 } from 'node-uuid';

import note from './note' 
import * as fromNoteLines from './noteLines'

export const notes = (state = {}, action) => {
  switch(action.type) {
    case 'CHANGE_NOTE_TYPE':
    case 'NEW_NOTE':
    case 'CREATE_AND_APPEND_LAST':
    case 'CREATE_AND_APPEND_NEXT':
    case 'DELETE_LINE':
      return {
        ...state,
        [action.NoteID]: note(state[action.NoteID], action) // TODO: Change noteId -> NoteID
      };
    default: 
      return state;
  }
}

export default notes;

export const getNoteLineIds = (state, noteId) => state[noteId].noteLines