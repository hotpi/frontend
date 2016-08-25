import { v4 } from 'node-uuid';

export const ADD_PATIENT = 'ADD_PATIENT';
export const addPatient = (info) => ({
  type: ADD_PATIENT,
  PatientID: v4(),
  ...info
})