import { typeValues } from '../Helpers'
import { v4 } from 'node-uuid';

export const changeNoteType = (index, NoteID) => ({
  type: 'CHANGE_NOTE_TYPE',
  value: typeValues[index],
  NoteID
})

export const newNote = (PatientID) => ({
  type: 'NEW_NOTE',
  NoteID: v4(),
  NoteLineID: v4(),
  PatientID
})