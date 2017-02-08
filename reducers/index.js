import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import entities, * as fromEntities from './entities';
import sync, * as fromSync from './sync';
import cursor, * as fromCursor from './cursor';

const rootReducer = combineReducers({
  entities,
  cursor,
  sync,
  routing
})

export default rootReducer;

export const isFocusChangeAllowed = (state) => fromCursor.isFocusChangeAllowed(state.cursor)
export const getCursorPosition = (state) => fromCursor.getCursorPosition(state.cursor)
export const getAllNoteLines = (state, noteId) => fromEntities.getAllNoteLines(state.entities, noteId);
export const getNoteLine = (state, noteLineId) => fromEntities.getNoteLine(state.entities, noteLineId);
export const getNoteById = (state, noteId) => fromEntities.getNoteById(state.entities, noteId);
export const getAllNotes = (state) => fromEntities.getAllNotes(state.entities);
export const getNotesByTypeFromPatient = (state, patientId, type) => fromEntities.getNotesByTypeFromPatient(state.entities, patientId, type);
export const getAllPatientNotes = (state, patientId) => fromEntities.getAllPatientNotes(state.entities, patientId);
export const getAllPatients = (state) => fromEntities.getAllPatients(state.entities);
export const getPatientById = (state, patientId) => fromEntities.getPatientById(state.entities, patientId);
export const getFirstPatientId = (state) => fromEntities.getFirstPatientId(state.entities);
export const getIsFetching = (state) => fromSync.getIsFetching(state.sync);
export const getIsSynced = (state) => fromSync.getIsSynced(state.sync);