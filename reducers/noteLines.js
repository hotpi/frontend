import { v4 } from 'node-uuid';
import noteLine from './noteLine'

export const noteLines = (state = [], action ) => {
  console.log('dispatching in noteLines: ', action.type, action, state)
  switch (action.type) {
    case 'DELETE_LINE':
      return [
      ...state.slice(0, action.index), 
      ...state.slice(action.index+1)
        ];
    case 'CREATE_AND_APPEND_NEXT':
      return [
          ...state.slice(0, action.index+1), 
          noteLine(undefined, action),
          ...state.slice(action.index+1)
        ];
    case 'CREATE_AND_APPEND_LAST':
      return [
          ...state,
          noteLine(undefined, action)
        ];
    case 'NOT_EMPTY_AND_NOT_LAST':
    case 'HIGHLIGHT_LINE':
    case 'IMPORTANT_LINE':
    case 'UPDATE_LINE_VALUE':
      return state.map(line => noteLine(line, action));
    default: 
      return state
  }
}