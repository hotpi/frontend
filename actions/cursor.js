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