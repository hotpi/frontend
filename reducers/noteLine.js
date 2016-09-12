import { v4 } from 'node-uuid';

const noteLine = (state = {
  ID: '',
  createdAt: Date.now(),
  updatedAt: Date.now(),
  text: '',
  important: {
    set: false,
    color: "grey",
    value: 0
  },
  highlight: {
    set: false,
    color: "grey",
    value: 0
  }
}, action ) => {
  switch (action.type) {
    case 'UPDATE_LINE_VALUE':
      // delete more than character not possible atm
      var textIndex = null
      var operationType = '';
      var node = ''
      if (state.text.length === 0) {
        return {
          ...state,
          text: action.text
        }
      }

      for (var i = 0; i < state.text.length; i++) {
        if (state.text[i] !== action.text[i]) {
          textIndex = i
          console.log('-------difference at ---------')
          console.log(textIndex)
          break;
        }
      }
      if (textIndex === null && state.text.length > 0) {
        operationType = 'insert';
        textIndex = state.text.length 
        node = action.text[state.text.length]
      } else if (state.text.length < action.text.length) {
        operationType = 'insert'
        node = action.text[textIndex]
      } else if (state.text.length > action.text.length) {
        operationType = 'delete'
        console.log()
        node = ''
      }

      if (operationType === 'insert') {
        return {
          ...state,
          text: state.text.slice(0, textIndex) + node + state.text.slice(textIndex)
        }
      }

      return {
        ...state,
        text: state.text.slice(0, textIndex) + state.text.slice(textIndex+1)
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
}

export default noteLine;
