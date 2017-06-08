const dimensions = (state = {
  width: 0,
  height: 0
}, action) => {
  const { type } = action;

  switch (type) {
  case 'UPDATE_HEIGHT':
    return {
      ...state,
      height: action.height
    };
  case 'UPDATE_WIDTH':
    return {
      ...state,
      width: action.width
    };
  case 'UPDATE_BOTH':
    return {
      width: action.width,
      height: action.height
    };
  default:
    return state;
  }
};

export default dimensions;

export const getHeight = (state) => state.height;
export const getWidth = (state) => state.width;
export const getDimensions = (state) => ({ width: state.width, height: state.height });
