import { forOwn as _forOwn, omit as _omit } from 'lodash';

import patient from './patient';

export const patients = (state = {}, action) => {
  switch (action.type) {
  case 'SYNC_COMPLETED':
    const nextState = Object.assign({}, state);

    _forOwn(action.response.patients, (currentPatient) => {
      nextState[currentPatient.id] = currentPatient;
    });

    if (nextState.undefined) {
      delete nextState.undefined;
    }

    return nextState;
  case 'NEW_NOTE':
  case 'DELETE_NOTE':
  case 'ADD_PATIENT':
    return {
      ...state,
      [action.PatientID]: patient(state[action.PatientID], action)
    };
  case 'DELETE_PATIENT':
    return _omit(state, action.PatientID);
  default:
    return state;
  }
};

export default patients;
