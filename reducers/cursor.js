const cursor = (state = {
  cursorPosition: 0,
  allowedFocusChange: false,
  noteLineId: ''
}, action) => {
  switch (action.type) {
  case 'UPDATE_LINE_VALUE':
    if (!action.fromServer ||
      action.NoteLineID !== state.noteLineId ||
      action.position > state.cursorPosition) {
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
      noteLineId: action.NoteLineID
    };
  case 'ALLOW_FOCUS_CHANGE':
    return {
      ...state,
      allowedFocusChange: action.isAllowed
    };
  case 'CREATE_AND_APPEND_LAST':
    return {
      ...state,
      allowedFocusChange: false
    };
  case 'CREATE_AND_APPEND_NEXT':
    if (action.fromServer) {
      return {
        ...state,
        allowedFocusChange: false
      };
    }

    return {
      ...state,
      allowedFocusChange: true
    };
  default:
    return state;
  }
};

export default cursor;

export const getCursorPosition = (state) => state.cursorPosition;
export const isFocusChangeAllowed = (state) => state.allowedFocusChange;
export const getFocusedNoteLine = (state) => state.noteLineId;

