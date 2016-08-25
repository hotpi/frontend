import { v4 } from 'node-uuid';

import { typeValues } from '../components/helpers/Helpers';

export const changeNoteType = (NoteID, index) => ({
  type: 'CHANGE_NOTE_TYPE',
  newType: typeValues[index].type,
  NoteID
});

export const newNote = (PatientID) => ({
  type: 'NEW_NOTE',
  NoteID: v4(),
  NoteLineID: v4(),
  PatientID
});

export const deleteNote = (PatientID, NoteID) => ({
  type: 'DELETE_NOTE',
  PatientID,
  NoteID
});

export const mergeNotes = (NoteID, noteLines) => ({
  type: 'MERGE_NOTES',
  NoteID,
  noteLines
});