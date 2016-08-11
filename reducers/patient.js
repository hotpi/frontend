import { allIds as noteLines } from './noteLines';

const patientInfo = (state = {
  ID: '',
  lastName: '',
  firstName: '',
  bedNumber: 0,
  clinic: '',
  station: ''
  admissionDate: new Date(),
  dischargeDate: new Date(),
  birthday: new Date(),
}, action) {
  switch (action.type) {
    case 'NEW_NOTE':
      return {
        ...state,
        notes: [...state.notes, action.NoteID]
      };
    case 'NEW_PATIENT':
      return {
        ...state,
        ID: action.PatientID,
        action.lastName,
        action.firstName,
        action.bedNumber,
        action.clinic,
        action.station,
        action.admissionDate,
        action.dischargeDate,
        action.birthday,
      }
    default:
      return state;
  }
}