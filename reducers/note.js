export const note = (state = {
  canAllocateFocus: false,
  hasFocus: false,
  isInArea: false,
  type: "New"
}, action) => {
  console.log('dispatching in note: ', action.type, action, state)

  switch(action.type) {
    case 'CAN_ALLOCATE_FOCUS':
      return {
        ...state,
        canAllocateFocus: true
      }
    case 'CANNOT_ALLOCATE_FOCUS':
      return {
        ...state,
        canAllocateFocus: false
      }
    case 'GAINED_FOCUS':
      return {
        ...state,
        hasFocus: true
      }
    case 'LOST_FOCUS':
      return {
        ...state,
        hasFocus: false
      }
    case 'CHANGE_NOTE_TYPE':
      return {
        ...state,
        type: action.value
      }
    default: 
      return state
  }
}