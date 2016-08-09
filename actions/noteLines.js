import { highlightColors, importantColors } from '../Helpers'
import { v4 } from 'node-uuid';

export const createAndAppendNext = (index) => ({
  type: 'CREATE_AND_APPEND_NEXT',
  ID: v4(),
  index
})

export const createAndAppendLast = () => ({
  type: 'CREATE_AND_APPEND_LAST',
  ID: v4()
})

export const deleteLine = (id, index) => ({
  type: 'DELETE_LINE',
  ID: id,
  index
})

export const notEmptyAndNotLast = (id) => ({
  type: 'NOT_EMPTY_AND_NOT_LAST',
  ID: id
})

export const importantLine = (id, value) => ({
  type: 'IMPORTANT_LINE',
  color: importantColors[+value],
  ID: id,
  value
})

export const highlightLine = (id, value) => ({
  type: 'HIGHLIGHT_LINE', 
  color: highlightColors[+value],
  ID: id,
  value                    
})

export const updateLineValue = (id, value) => ({
  type: 'UPDATE_LINE_VALUE',
  ID: id,
  text: value
})