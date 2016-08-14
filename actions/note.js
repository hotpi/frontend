import { typeValues } from '../Helpers'
import { v4 } from 'node-uuid';

export const changeNoteType = (index, NoteID) => ({
  type: 'CHANGE_NOTE_TYPE',
  newType: typeValues[index].type,
  NoteID
})

export const newNote = (PatientID) => ({
  type: 'NEW_NOTE',
  NoteID: v4(),
  NoteLineID: v4(),
  PatientID
})