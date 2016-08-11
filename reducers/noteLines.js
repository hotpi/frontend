import { combineReducers } from 'redux';
import { v4 } from 'node-uuid';

import noteLine from './noteLine';

export const noteLines = (state = {}, action) => {  
  switch (action.type) {
    case 'NOT_EMPTY_AND_NOT_LAST':
    case 'HIGHLIGHT_LINE':
    case 'IMPORTANT_LINE':
    case 'UPDATE_LINE_VALUE':
      return {
        ...state,
        [action.NoteLineID]: noteLine(state[action.NoteLineID], action)
      };
    case 'CREATE_AND_APPEND_LAST':
    case 'CREATE_AND_APPEND_NEXT':
      return {
        ...state,
        [action.NoteLineID]: noteLine(undefined, action)
      };
    case 'DELETE_LINE':
      delete state[action.NoteLineID];
      return state;
    default: 
      return state;
  }
}

export default noteLines;

export const getAllNoteLines = (state, ids) => ids.map(noteLineId => state[noteLineId])

export const getNoteLine = (state, noteLineId) => state[noteLineId]