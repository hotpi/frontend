import { forOwn as _forOwn } from 'lodash';

import patient from './patient';

export const patients = (state = {}, action) => {
  switch(action.type) {
    case 'SYNC_COMPLETED':
      const nextState = { ...state };
      _forOwn(action.response.patients, (patient, id) => {
        nextState[patient.id] = patient
      })

      return nextState;
    case 'NEW_NOTE':
    case 'DELETE_NOTE':
      return {
        ...state,
        [action.PatientID]: patient(state[action.PatientID], action)
      };
    default: 
      return state;
  }
}

export default patients;
