import { highlightColors, importantColors } from '../Helpers'
import { v4 } from 'node-uuid';

export const createAndAppendNext = (index, noteId) => ({
  type: 'CREATE_AND_APPEND_NEXT',
  ID: v4(),
  noteId,
  index
})

export const createAndAppendLast = (noteId) => ({
  type: 'CREATE_AND_APPEND_LAST',
  ID: v4(),
  noteId,
})

export const deleteLine = (id, noteId) => ({
  type: 'DELETE_LINE',
  ID: id,
  noteId,
})

export const notEmptyAndNotLast = (id) => ({
  type: 'NOT_EMPTY_AND_NOT_LAST',
  ID: id,
  noteId,
})

export const importantLine = (id, value, noteId) => ({
  type: 'IMPORTANT_LINE',
  color: importantColors[+value],
  ID: id,
  value,
  noteId,
})

export const highlightLine = (id, value, noteId) => ({
  type: 'HIGHLIGHT_LINE', 
  color: highlightColors[+value],
  ID: id,
  value,
  noteId,                    
})

export const updateLineValue = (id, value, noteId) => ({
  type: 'UPDATE_LINE_VALUE',
  ID: id,
  text: value,
  noteId,
})