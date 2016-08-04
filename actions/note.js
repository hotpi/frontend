import { typeValues } from '../Helpers'

export const canAllocateFocus = () => ({
  type: 'CAN_ALLOCATE_FOCUS'
})

export const cannotAllocateFocus = () => ({
  type: 'CANNOT_ALLOCATE_FOCUS'
})

export const lostFocus = () => ({
  type: 'LOST_FOCUS'
})

export const gainedFocus = () => ({
  type: 'GAINED_FOCUS'
})

export const changeNoteType = (index) => ({
  type: 'CHANGE_NOTE_TYPE',
  value: typeValues[index]
})