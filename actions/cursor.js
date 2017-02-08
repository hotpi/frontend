export const FOCUS_CHANGED = 'FOCUS_CHANGED';
export const focusChanged = (NoteLineID) => ({
  type: FOCUS_CHANGED,
  NoteLineID
});

export const UPDATE_CURSOR_POSITION = 'UPDATE_CURSOR_POSITION';
export const updateCursorPosition = (newCursorPosition) => ({
  type: UPDATE_CURSOR_POSITION,
  newCursorPosition
});

export const ALLOW_FOCUS_CHANGE = 'ALLOW_FOCUS_CHANGE';
export const allowFocusChange = (isAllowed) => ({
  type: ALLOW_FOCUS_CHANGE,
  isAllowed
});
