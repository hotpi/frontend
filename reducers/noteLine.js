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

      if (action.startPos === action.endPos) {
        operationType = action.text.length > state.text.length ? 'insert' : 'delete'
        textIndex = operationType === 'insert' ? action.position - 1 : action.position
        
        if (operationType === 'insert') {
          node = action.text[textIndex]

          return {
            ...state,
            text: state.text.slice(0, textIndex) + node + state.text.slice(textIndex)
          };
        }

        return {
          ...state,
          text: state.text.slice(0, textIndex) + state.text.slice(textIndex+1)
        };
      }

      return {
        ...state,
        text: state.text.slice(0, action.startPos-1) + action.text[action.startPos-1] + state.text.slice(action.startPos)
      }
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
