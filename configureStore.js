
import reducer from './reducers'

import { createStore } from 'redux'

import { v4 } from 'node-uuid';
import throttle from 'lodash/throttle';

const configureStore = () => {
  const persistedState = {
    noteLines: [{
    ID: v4(),
    text: 'asdfasdf',
    important: {
      set: false,
      color: "grey",
      value: "0"
    },
    highlight: {
      set: false,
      color: "transparent",
      value: "0"
    },
    last: false,
    isEmpty: false
  }/*,
  {
    ID: v4(),
    text: '12312312',
    important: {
      set: false,
      color: "transparent",
      value: "0"
    },
    highlight: {
      set: false,
      color: "transparent",
      value: "0"
    },
    last: false,
    isEmpty: false
  },
  {
    ID: v4(),
    text: '',
    important: {
      set: false,
      color: "transparent",
      value: "0"
    },
    highlight: {
      set: false,
      color: "transparent",
      value: "0"
    },
    last: true,
    isEmpty: false
  }*/]
  };

  const store = createStore(
    reducer,
    persistedState
  );

  // store.subscribe(throttle(() => {
  //   saveState({
  //     noteLines: store.getState().noteLines,
  //   });
  // }, 1000));

  return store;
}

export default configureStore;