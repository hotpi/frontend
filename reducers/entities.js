import { combineReducers } from 'redux';

import notes, * as fromNotes from './notes';
import noteLines, * as fromNoteLines from './noteLines';
import patients from './patients';

import { v4 } from 'node-uuid';

const entities = combineReducers({
  notes,
  noteLines,
  patients
})

export default entities;

export const getAllNoteLines = (state, noteId) => {
  let ids = fromNotes.getNoteLineIds(state.notes, noteId);
  return fromNoteLines.getAllNoteLines(state.noteLines, ids);
}

export const getNoteLine = (state, noteLineId) => fromNoteLines.getNoteLine(state.noteLines, noteLineId)
