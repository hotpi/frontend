import { forOwn as _forOwn, omit as _omit } from 'lodash';

import noteLine from './noteLine';

export const noteLines = (state = {}, action) => {
  switch (action.type) {
  case 'SYNC_COMPLETED':
    const nextState = { ...state };

    _forOwn(action.response.noteLines, (currentNoteLine) => {
      nextState[currentNoteLine.id] = currentNoteLine;
    });

    if (nextState.undefined) {
      delete nextState.undefined;
    }

    return nextState;
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
      // eslint-disable-next-line
      [action.NoteLineID]: noteLine(undefined, action)
    };
  case 'DELETE_LINE':
    return _omit(state, action.NoteLineID);
  default:
    return state;
  }
};

export default noteLines;

export const getAllNoteLines = (state, ids) => ids.map(noteLineId => state[noteLineId]);
