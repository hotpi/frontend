import { v4 } from 'node-uuid';

import { highlightColors, importantColors } from '../components/helpers/Helpers';

export const CREATE_AND_APPEND_NEXT = 'CREATE_AND_APPEND_NEXT';
export const createAndAppendNext = (index, NoteID) => ({
  type: CREATE_AND_APPEND_NEXT,
  NoteLineID: v4(),
  NoteID,
  index
});

export const CREATE_AND_APPEND_LAST = 'CREATE_AND_APPEND_LAST';
export const createAndAppendLast = (NoteID) => ({
  type: CREATE_AND_APPEND_LAST,
  NoteLineID: v4(),
  NoteID
});

export const DELETE_LINE = 'DELETE_LINE';
export const deleteLine = (NoteLineID, NoteID) => ({
  type: DELETE_LINE,
  NoteLineID,
  NoteID
});

export const IMPORTANT_LINE = 'IMPORTANT_LINE';
export const importantLine = (NoteLineID, value) => ({
  type: IMPORTANT_LINE,
  NoteLineID,
  color: importantColors[+value],
  value
});

export const HIGHLIGHT_LINE = 'HIGHLIGHT_LINE'
export const highlightLine = (NoteLineID, value) => ({
  type: HIGHLIGHT_LINE, 
  NoteLineID,
  color: highlightColors[+value],
  value
});

export const UPDATE_LINE_VALUE = 'UPDATE_LINE_VALUE'
export const updateLineValue = (NoteLineID, opType, value, position) => ({
  type: UPDATE_LINE_VALUE,
  NoteLineID,
  position,
  opType,
  text: value
});