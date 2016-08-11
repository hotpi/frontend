import { highlightColors, importantColors } from '../Helpers'
import { v4 } from 'node-uuid';

export const createAndAppendNext = (index, NoteID) => ({
  type: 'CREATE_AND_APPEND_NEXT',
  NoteLineID: v4(),
  NoteID,
  index
})

export const createAndAppendLast = (NoteID) => ({
  type: 'CREATE_AND_APPEND_LAST',
  NoteLineID: v4(),
  NoteID
})

export const deleteLine = (NoteLineID, NoteID) => ({
  type: 'DELETE_LINE',
  NoteLineID,
  NoteID
})

export const importantLine = (NoteLineID, value) => ({
  type: 'IMPORTANT_LINE',
  NoteLineID,
  color: importantColors[+value],
  value
})

export const highlightLine = (NoteLineID, value) => ({
  type: 'HIGHLIGHT_LINE', 
  NoteLineID,
  color: highlightColors[+value],
  value
})

export const updateLineValue = (NoteLineID, value) => ({
  type: 'UPDATE_LINE_VALUE',
  NoteLineID,
  text: value
})