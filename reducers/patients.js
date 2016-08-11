import { allIds as notes } from './notes'

export const patients = (state = {}, action) => {
  switch(action.type) {
    case 'NEW_NOTE':
      return {
        ...state,
        [action.PatientID]: patient(state[action.PatientID], action)
      };
    default: 
      return state;
  }
}

export default patients;
