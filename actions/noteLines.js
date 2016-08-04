import { highlightColors, importantColors } from '../Helpers'

export const createAndAppendNext = (index) => ({
  type: 'CREATE_AND_APPEND_NEXT',
  index
})

export const createAndAppendLast = () => ({
  type: 'CREATE_AND_APPEND_LAST'
})

export const deleteLine = (index) => ({
  type: 'DELETE_LINE',
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
  value: value
})

export const highlightLine = (id, value) => ({
  type: 'HIGHLIGHT_LINE', 
  color: highlightColors[+value],
  ID: id,
  value: value                    
})

export const updateLineValue = (id, value) => ({
  type: 'UPDATE_LINE_VALUE',
  ID: id,
  text: value
})