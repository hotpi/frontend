const note = (state = {
  ID: '',
  createdAt: Date.now(),
  updatedAt: Date.now(),
  type: 'new',
  noteLines: []
}, action) => {
  switch (action.type) {
  case 'MERGE_NOTES':
    return {
      ...state,
      noteLines: action.noteLines
    };
  case 'NEW_NOTE':
    return {
      ...state,
      ID: action.NoteID
    };
  case 'CHANGE_NOTE_TYPE':
    return {
      ...state,
      type: action.newType
    };
  case 'DELETE_LINE':
    return {
      ...state,
      noteLines: state.noteLines.filter(noteLineId => noteLineId !== action.NoteLineID)
    };
  case 'CREATE_AND_APPEND_NEXT':
    return {
      ...state,
      noteLines: [
        ...state.noteLines.slice(0, action.index),
        action.NoteLineID,
        ...state.noteLines.slice(action.index)
      ]
    };
  case 'CREATE_AND_APPEND_LAST':
    return {
      ...state,
      noteLines: [...state.noteLines, action.NoteLineID]
    };
  default:
    return state;
  }
};

export default note;
