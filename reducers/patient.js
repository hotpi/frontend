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
  notes: []
}, action) => {
  switch (action.type) {
    case 'NEW_NOTE':
      if (typeof action.index === 'undefined') {
        return {
          ...state,
          notes: [...state.notes, action.NoteID] 
        };
      }
      
      return {
        ...state,
        notes: [
          ...state.notes.slice(0, index+1),
          action.NoteID,
          ...state.notes.slice(index+1)  
        ]
      };

    case 'DELETE_NOTE': 
      return {
        ...state,
        notes: state.notes.filter(noteID => noteID !== action.NoteID)
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
      };
    default:
      return state;
  }
}

export default patient;