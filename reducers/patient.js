const patient = (state = {
  ID: '',
  lastName: '',
  firstName: '',
  bedNumber: 0,
  clinic: '',
  station: '',
  admissionDate: new Date(),
  dischargeDate: new Date(),
  birthday: new Date(),
}, action) => {
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
        lastName: action.lastName,
        firstName: action.firstName,
        bedNumber: action.bedNumber,
        clinic: action.clinic,
        station: action.station,
        admissionDate: action.admissionDate,
        dischargeDate: action.dischargeDate,
        birthday: action.birthday
      }
    default:
      return state;
  }
}

export default patient;