import { combineReducers } from 'redux';
import { v4 } from 'node-uuid';
import { forOwn as _forOwn, omit as _omit } from 'lodash';

import note from './note';


export const notes = (state = {}, action) => {
  switch(action.type) {
    case 'SYNC_COMPLETED':
      const nextState = { ...state };
      
      _forOwn(action.response.notes, (note, id) => {
        nextState[note.id] = note
      })

      if (nextState.undefined) {
        delete nextState['undefined']
      }

      return nextState;
    case 'DELETE_NOTE':
      return _omit(state, action.NoteID)
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