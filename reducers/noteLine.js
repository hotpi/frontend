import { v4 } from 'node-uuid';

const noteLine = (state = {
  ID: '',
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
      return {
        ...state,
        text: action.text
      }
    case 'HIGHLIGHT_LINE':
      return {
        ...state,
        highlight: {
          set: +action.value !== 0,
          color: action.color,
          value: action.value
        }
      }
    case 'IMPORTANT_LINE':
      return {
        ...state,
        important: {
          set: +action.value !== 0,
          color: action.color,
          value: action.value
        }
      }
    case 'CREATE_AND_APPEND_LAST':
    case 'CREATE_AND_APPEND_NEXT':
      return {
        ...state,
        ID: action.NoteLineID
      }
    default:
      return state
  }
}

export default noteLine;
