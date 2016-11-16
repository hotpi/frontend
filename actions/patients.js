import { v4 } from 'node-uuid';

export const ADD_PATIENT = 'ADD_PATIENT';
export const addPatient = (info) => ({
  type: ADD_PATIENT,
  PatientID: v4(),
  ...info
})

export const DELETE_PATIENT = 'DELETE_PATIENT';
export const deletePatient = (PatientID) => ({
  type: DELETE_PATIENT,
  PatientID
})