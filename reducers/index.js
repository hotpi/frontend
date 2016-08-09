import { combineReducers } from 'redux';

import { routerReducer as routing } from 'react-router-redux';
import notes, * as fromNotes /* delete me as soon as notes reduces is ready to go */ from './notes'
// import notes, * as fromNotes from './notes'

const rootReducer = combineReducers({
  notes,
  routing
})

export default rootReducer;

// export const getAllNoteLines = (state) => fromNote.getAllNoteLines(state.note)
// export const getNoteLineById = (state, id) => fromNote.getNoteLineById(state.note, id)

export const getAllNoteLines = (state, noteId) => fromNotes.getAllNoteLines(state.notes, noteId) // needs id
export const getNoteLineById = (state, noteId, noteLineId) => fromNotes.getNoteLineById(state.notes, noteId, noteLineId) // needs id