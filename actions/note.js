import { v4 } from 'node-uuid';

import { typeValues } from '../components/helpers/Helpers';

import { createAndAppendLast } from './noteLines';

export const CHANGE_NOTE_TYPE = 'CHANGE_NOTE_TYPE';

export const changeNoteType = (NoteID, index) => ({
  type: CHANGE_NOTE_TYPE,
  newType: typeValues[index].type,
  level: 1,
  NoteID
});


export const NEW_NOTE = 'NEW_NOTE';
export const newNote = (PatientID, NoteID) => {
  return {
    type: NEW_NOTE,
    level: 1,
    NoteID,
    PatientID
  };
};

export const newNoteAndLine = (PatientID) => (dispatch) => {
  let noteId = v4();
  dispatch(newNote(PatientID, noteId));
  dispatch(createAndAppendLast(noteId));
};

export const DELETE_NOTE = 'DELETE_NOTE';
export const deleteNote = (PatientID, NoteID) => ({
  type: DELETE_NOTE,
  level: 1,
  PatientID,
  NoteID
});

export const MERGE_NOTES = 'MERGE_NOTES';
export const mergeNotes = (NoteID, noteLines) => ({
  type: MERGE_NOTES,
  level: 1,
  NoteID,
  noteLines
});
