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
        action.operation
      ]
    };
  default:
    return state;
};

export default opHistory;

export const filterOperations = (state, level, id) => {
  let idObjectName = '';

  if (level === 1) {
    idObjectName = 'PatientID'
  } else if (level === 2) {
    idObjectName = 'NoteID';
  } else if (level > 2) {
    idObjectName = 'NoteLineID';
  }

  state.history.filter((operation) => {
    return operation.action[idObjectName] === id
  })
}
