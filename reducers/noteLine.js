import { v4 } from 'node-uuid';

const noteLine = (state = {
  ID: v4(),
  text: '',
  important: {
    set: false,
    color: "grey",
    value: 0
  },
  highlight: {
    set: false,
    color: "transparent",
    value: 0
  },
  isEmpty: true,
  last: false
}, action ) => {
  console.log('dispatching in noteLine: ', action.type, action, state)
  switch (action.type) {
    case 'NOT_EMPTY_AND_NOT_LAST': 
      if (state.ID !== action.ID) {
        return state;
      }

      return {
          ...state,
         isEmpty: false,
         last: false
        }
    case 'CREATE_AND_APPEND_NEXT':
      return {
        ...state,
        last: false
      }
    case 'CREATE_AND_APPEND_LAST':
      return {
        ...state,
        last: true
      }
    case 'UPDATE_LINE_VALUE':
      if (state.ID !== action.ID) {
        return state;
      }

      if (action.text === '') {
        return {
          ...state,
          text: action.text,
          isEmpty: true
        }
      }

      return {
        ...state,
        text: action.text
      }
    case 'HIGHLIGHT_LINE':
      if (state.ID !== action.ID) {
        return state;
      }

      return {
        ...state,
        highlight: {
          set: +action.value !== 0,
          color: action.color,
          value: action.value
        }
      }
    case 'IMPORTANT_LINE':
      if (state.ID !== action.ID) {
        return state;
      }

      return {
        ...state,
        important: {
          set: +action.value !== 0,
          color: action.color,
          value: action.value
        }
      }
    default:
      return state
  }
}

export default noteLine;
