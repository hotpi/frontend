import { combineReducers } from 'redux';
import { v4 } from 'node-uuid';

import noteLine from './noteLine';

export const allIds = (state = [], action) => {
  switch (action.type) {
    case 'DELETE_LINE':
      return [
      ...state.slice(0, action.index), 
      ...state.slice(action.index+1)
        ];
    case 'CREATE_AND_APPEND_NEXT':
      return [
          ...state.slice(0, action.index+1), 
          action.ID,
          ...state.slice(action.index+1)
        ];
    case 'CREATE_AND_APPEND_LAST':
      return [
          ...state,
          action.ID
        ];
    default: 
      return state
  }
}

export const byId = (state = {}, action) => {
  switch (action.type) {
    case 'NOT_EMPTY_AND_NOT_LAST':
    case 'HIGHLIGHT_LINE':
    case 'IMPORTANT_LINE':
    case 'UPDATE_LINE_VALUE':
      return {
        ...state,
        [action.ID]: noteLine(state[action.ID], action)
      };
    case 'CREATE_AND_APPEND_LAST':
    case 'CREATE_AND_APPEND_NEXT':
      return {
        ...state,
        [action.ID]: noteLine(undefined, action)
      };
    case 'DELETE_LINE':
      delete state[action.ID];
      return state;
    default: 
      return state;
  }
}

export const getAllNoteLines = (state) => state.allIds.map(id => ({ID: id, noteLine: state.byId[id]}))

export const getNoteLineById = (state, id) => state.byId[id]
export const getNoteLineId = (state, id) => state.allIds.indexOf(id)

const noteLines = combineReducers({
  byId,
  allIds
})

export default noteLines;
