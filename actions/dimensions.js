export const UPDATE_WIDTH = 'UPDATE_WIDTH';
export const updateWidth = (width) => ({
  type: 'UPDATE_WIDTH',
  width
});

export const UPDATE_HEIGHT = 'UPDATE_HEIGHT';
export const updateHeight = (height) => ({
  type: 'UPDATE_HEIGHT',
  height
});

export const UPDATE_BOTH = 'UPDATE_BOTH';
export const updateBoth = (height, width) => ({
  type: 'UPDATE_BOTH',
  height,
  width
});
