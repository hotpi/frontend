const patient = (state = {
  ID: '',
  createdAt: Date.now(),
  updatedAt: Date.now(),
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
    case 'DELETE_NOTE': 
      return {
        ...state,
        notes: state.notes.filter(noteID => noteID !== action.NoteID)
      }
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