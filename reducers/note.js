const note = (state = {
  type: "New"
}, action) => {
  console.log('dispatching in note: ', action.type, action, state)
  switch(action.type) {
    case 'CHANGE_NOTE_TYPE':
      return {
        ...state,
        type: action.value
      }
    default: 
      return state
  }
}

export default note;