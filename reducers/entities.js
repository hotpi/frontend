import { combineReducers } from 'redux';
import { v4 } from 'node-uuid';

import { keys } from 'lodash';

import notes, * as fromNotes from './notes';
import noteLines, * as fromNoteLines from './noteLines';
import patients from './patients';


const entities = combineReducers({
  notes,
  noteLines,
  patients
})

export default entities;

export const getAllNoteLines = (state, noteId) => {
  let ids = fromNotes.getNoteLineIds(state.notes, noteId);
  return fromNoteLines.getAllNoteLines(state.noteLines, ids);
};

export const getNoteLine = (state, noteLineId) => state.noteLines[noteLineId];
export const getAllPatients = (state) => keys(state.patients).map(patientId => state.patients[patientId]);
export const getPatientById = (state, patientId) => state.patients[patientId];
export const getFirstPatientId = (state) => getPatientById(state, keys(state.patients)[0]).ID;
export const getNotesByTypeFromPatient = (state, patientId, type) => getAllPatientNotes(state, patientId).filter(note => note.type === type);
export const getAllPatientNotes = (state, patientId) => getPatientById(state, patientId).notes.map(noteId => state.notes[noteId]);
