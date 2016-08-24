import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import entities, * as fromEntities from './entities';
import sync, * as fromSync from './sync';

const rootReducer = combineReducers({
  entities,
  sync,
  routing
})

export default rootReducer;

export const getAllNoteLines = (state, noteId) => fromEntities.getAllNoteLines(state.entities, noteId);
export const getNoteLine = (state, noteLineId) => fromEntities.getNoteLine(state.entities, noteLineId);
export const getNotesByTypeFromPatient = (state, patientId, type) => fromEntities.getNotesByTypeFromPatient(state.entities, patientId, type);
export const getAllPatients = (state) => fromEntities.getAllPatients(state.entities);
export const getPatientById = (state, patientId) => fromEntities.getPatientById(state.entities, patientId);
export const getFirstPatientId = (state) => fromEntities.getFirstPatientId(state.entities);
export const getAllPatientNotes = (state, patientId) => fromEntities.getAllPatientNotes(state.entities, patientId);
export const getIsFetching = (state) => fromSync.getIsFetching(state.sync);