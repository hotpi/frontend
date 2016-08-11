import { typeValues } from '../Helpers'

export const changeNoteType = (index, NoteID) => ({
  type: 'CHANGE_NOTE_TYPE',
  value: typeValues[index],
  NoteID
})

export const newNote = (PatientID) => ({
  type: 'NEW_NOTE',
  PatientID
})