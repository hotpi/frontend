import { v4 } from 'node-uuid';

import { typeValues } from '../components/helpers/Helpers';

export const CHANGE_NOTE_TYPE = 'CHANGE_NOTE_TYPE'
export const changeNoteType = (NoteID, index) => ({
  type: CHANGE_NOTE_TYPE,
  newType: typeValues[index].type,
  NoteID
});

export const NEW_NOTE = 'NEW_NOTE'
export const newNote = (PatientID) => ({
  type: NEW_NOTE,
  NoteID: v4(),
  PatientID
});

export const DELETE_NOTE = 'DELETE_NOTE'
export const deleteNote = (PatientID, NoteID) => ({
  type: DELETE_NOTE,
  PatientID,
  NoteID
});

export const MERGE_NOTES = 'MERGE_NOTES'
export const mergeNotes = (NoteID, noteLines) => ({
  type: MERGE_NOTES,
  NoteID,
  noteLines
});