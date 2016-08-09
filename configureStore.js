
import rootReducer from './reducers'

import { createStore, applyMiddleware, compose } from 'redux'

import thunk from 'redux-thunk'

import createLogger from 'redux-logger'

import { v4 } from 'node-uuid';
import throttle from 'lodash/throttle';

export const noteIds = [v4()/*, v4(), v4()*/]

const configureStore = () => {
  const noteLineIds = [v4()/*, v4(), v4()*/]
  const persistedState = {
    notes: {
      byId: {
        [noteIds[0]]: {
          noteProperties: {
            type: 'New'
          },
          noteLines: {
            byId: {
              [noteLineIds[0]]: {
                text: '',
                important: {
                  set: false,
                  color: "grey",
                  value: "0"
                },
                highlight: {
                  set: false,
                  color: "grey",
                  value: "0"
                }
              },
            },
            allIds: noteLineIds
          }
        }
      },
      allIds: noteIds
    }
  };

  const store = createStore(
    rootReducer,
    persistedState,
    compose(
      applyMiddleware(thunk, /*api, */createLogger()),
      window.devToolsExtension && window.devToolsExtension()
      //DevTools.instrument()
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }


  // store.subscribe(throttle(() => {
  //   saveState({
  //     noteLines: store.getState().noteLines,
  //   });
  // }, 1000));

  return store;
}

export default configureStore;

/*,
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
  }*/