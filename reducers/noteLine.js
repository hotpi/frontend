const noteLine = (state = {
  ID: '',
  createdAt: Date.now(),
  updatedAt: Date.now(),
  text: '',
  important: {
    set: false,
    color: 'grey',
    value: 0
  },
  highlight: {
    set: false,
    color: 'grey',
    value: 0
  }
}, action) => {
  switch (action.type) {
  case 'UPDATE_LINE_VALUE':
    // delete more than character not possible atm
    let textIndex = null;
    let operationType = '';
    let node = '';

    operationType = action.opType;
    textIndex = operationType === 'insert' ? action.position - 1 : action.position;

    if (action.fromServer) {
      textIndex = action.index;
    }

    if (operationType === 'insert') {
      node = action.fromServer ? action.node : action.text[textIndex];

      return {
        ...state,
        text: state.text.slice(0, textIndex) + node + state.text.slice(textIndex)
      };
    }

    return {
      ...state,
      text: state.text.slice(0, textIndex) + state.text.slice(textIndex + 1)
    };
  case 'HIGHLIGHT_LINE':
    return {
      ...state,
      highlight: {
        set: +action.value !== 0,
        color: action.color,
        value: action.value
      }
    };
  case 'IMPORTANT_LINE':
    return {
      ...state,
      important: {
        set: +action.value !== 0,
        color: action.color,
        value: action.value
      }
    };
  case 'CREATE_AND_APPEND_LAST':
  case 'CREATE_AND_APPEND_NEXT':
    return {
      ...state,
      ID: action.NoteLineID
    };
  default:
    return state;
  }
};

export default noteLine;
