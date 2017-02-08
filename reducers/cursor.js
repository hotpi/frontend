const cursor = (state = {
  cursorPosition: 0,
  noteLineId: ''
}, action ) => {
  switch (action.type) {
    case 'UPDATE_LINE_VALUE':
      if (!action.fromServer || action.NoteLineID !== state.noteLineId || action.position > state.cursorPosition) {
        return state;
      }

      if (action.textOp === 'delete') {
        return {
          ...state,
          cursorPosition: state.cursorPosition - 1
        };
      }

      return {
        ...state,
        cursorPosition: state.cursorPosition + 1
      };
      // delete more than character not possible atm
    case 'UPDATE_CURSOR_POSITION':
      return {
        ...state,
        cursorPosition: action.newCursorPosition
      };
    case 'FOCUS_CHANGED':
      return {
        ...state,
        noteLineId: action.NoteLineID,
      };
    default:
      return state;
  }
}

export default cursor;

export const getCursorPosition = (state) => state.cursorPosition
