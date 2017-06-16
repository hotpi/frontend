const opHistory = (
  state = {
    history: []
  },
  action
) => {
  const { type } = action;

  switch (type) {
  case 'NEW_OPERATION':
    return {
      history: [
        ...state.history,
        {
          operation: action.operation,
          revisionNr: state.history.length
        }
      ]
    };
  default:
    return state;
  }
};

export default opHistory;

export const filterOperations = (state, level, id) => {
  let idObjectName = '';

  if (level === 0) {
    idObjectName = 'PatientID';
  } else if (level === 1 || level === 2) {
    idObjectName = 'NoteID';
  } else if (level > 2) {
    idObjectName = 'NoteLineID';
  }

  return state.history.filter((entry) => {
    return entry.operation.action[idObjectName] === id &&
    entry.operation.action.level === level;
  });
};
