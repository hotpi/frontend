
import rootReducer from './reducers'

import { createStore, applyMiddleware, compose } from 'redux'

import thunk from 'redux-thunk'

import createLogger from 'redux-logger'

import { v4 } from 'node-uuid';
import throttle from 'lodash/throttle';

export const noteIds = [v4()/*, v4(), v4()*/]
const noteLineIds = [v4()]
export const patientIds = [v4(), v4(), v4(), v4(), v4(), v4(), v4(), v4(), v4(), v4(), v4()]
/*
  {
    byId: {
      [noteLineIds[0]]: {
        
      },
    },
    allIds: noteLineIds
  }
*/

const configureStore = () => {
  const persistedState = {
    entities: {
      patients: {
        [patientIds[0]]: {
          ID: patientIds[0],
          lastName: 'Mustermann',
          firstName: 'Max',
          bedNumber: 10,
          clinic: 'Endo',
          station: '28',
          admissionDate: new Date(2016, 5, 12),
          dischargeDate: new Date(2016, 5, 12),
          birthday: new Date(1991, 11, 21),
          notes: noteIds
        },
        [patientIds[1]]: {
          ID: patientIds[1],
          lastName: 'Mustermann',
          firstName: 'Max',
          bedNumber: 17,
          clinic: 'Endo',
          station: '28',
          admissionDate: new Date(2016, 5, 12),
          dischargeDate: new Date(2016, 5, 12),
          birthday: new Date(1991, 11, 21),
          notes: []
        },
        [patientIds[2]]: {
          ID: patientIds[2],
          lastName: 'Mustermann',
          firstName: 'Max',
          bedNumber: 3,
          clinic: 'Pneu',
          station: '28',
          admissionDate: new Date(2016, 5, 12),
          dischargeDate: new Date(2016, 5, 12),
          birthday: new Date(1991, 11, 21),
          notes: []
        },
        [patientIds[3]]: {
          ID: patientIds[3],
          lastName: 'Mustermann',
          firstName: 'Max',
          bedNumber: 5,
          clinic: 'Endo',
          station: '29',
          admissionDate: new Date(2016, 5, 12),
          dischargeDate: new Date(2016, 5, 12),
          birthday: new Date(1991, 11, 21),
          notes: []
        },
        [patientIds[4]]: {
          ID: patientIds[4],
          lastName: 'Mustermann',
          firstName: 'Max',
          bedNumber: 21,
          clinic: 'All',
          station: '28',
          admissionDate: new Date(2016, 5, 12),
          dischargeDate: new Date(2016, 5, 12),
          birthday: new Date(1991, 11, 21),
          notes: []
        },
        [patientIds[5]]: {
          ID: patientIds[5],
          lastName: 'Mustermann',
          firstName: 'Max',
          bedNumber: 12,
          clinic: 'Pneu',
          station: '29',
          admissionDate: new Date(2016, 5, 12),
          dischargeDate: new Date(2016, 5, 12),
          birthday: new Date(1991, 11, 21),
          notes: []
        },
        [patientIds[6]]: {
          ID: patientIds[6],
          lastName: 'Mustermann',
          firstName: 'Max',
          bedNumber: 19,
          clinic: 'All',
          station: '29',
          admissionDate: new Date(2016, 5, 12),
          dischargeDate: new Date(2016, 5, 12),
          birthday: new Date(1991, 11, 21),
          notes: []
        },
        [patientIds[7]]: {
          ID: patientIds[7],
          lastName: 'Mustermann',
          firstName: 'Max',
          bedNumber: 9,
          clinic: 'Pneu',
          station: '28',
          admissionDate: new Date(2016, 5, 12),
          dischargeDate: new Date(2016, 5, 12),
          birthday: new Date(1991, 11, 21),
          notes: []
        },
        [patientIds[8]]: {
          ID: patientIds[8],
          lastName: 'Mustermann',
          firstName: 'Max',
          bedNumber: 1,
          clinic: 'Endo',
          station: '28',
          admissionDate: new Date(2016, 5, 12),
          dischargeDate: new Date(2016, 5, 12),
          birthday: new Date(1991, 11, 21),
          notes: []
        },
        [patientIds[9]]: {
          ID: patientIds[9],
          lastName: 'Mustermann',
          firstName: 'Max',
          bedNumber: 3,
          clinic: 'Pneu',
          station: '28',
          admissionDate: new Date(2016, 5, 12),
          dischargeDate: new Date(2016, 5, 12),
          birthday: new Date(1991, 11, 21),
          notes: []
        },
        [patientIds[10]]: {
          ID: patientIds[10],
          lastName: 'Mustermann',
          firstName: 'Max',
          bedNumber: 24,
          clinic: 'Pneu',
          station: '28',
          admissionDate: new Date(2016, 5, 12),
          dischargeDate: new Date(2016, 5, 12),
          birthday: new Date(1991, 11, 21),
          notes: []
        }
      },
      notes: {
        [noteIds[0]]: {
          ID: noteIds[0],
          type: 'New',
          noteLines: noteLineIds
        }
      },
      noteLines: {
        [noteLineIds[0]]: {
          ID: noteLineIds[0],
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
        }
      }
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