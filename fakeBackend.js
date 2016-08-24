import { v4 } from 'node-uuid';

export const noteIds = [v4(), v4(), v4(), v4(), v4(), v4()]
const noteLineIds = [v4(), v4(), v4(), v4(), v4(), v4(), v4(), v4(), v4(), v4(), v4()]
export const patientIds = [v4(), v4(), v4(), v4(), v4(), v4(), v4(), v4(), v4(), v4(), v4()]

export const fakeBackend = {
  entities: {
    patients: {
      [patientIds[0]]: {
        ID: patientIds[0],
        createdAt: Date.now(),
        updatedAt: Date.now(),
        lastName: 'Mustermann',
        firstName: 'Max',
        bedNumber: 10,
        clinic: 'Endo',
        station: '28',
        admissionDate: new Date(2016, 5, 12),
        dischargeDate: new Date(2016, 5, 12),
        birthday: new Date(1991, 11, 21),
        notes: noteIds.slice(0, 3)
      },
      [patientIds[1]]: {
        ID: patientIds[1],
        createdAt: Date.now(),
        updatedAt: Date.now(),
        lastName: 'Mustermann',
        firstName: 'Robert',
        bedNumber: 17,
        clinic: 'Endo',
        station: '28',
        admissionDate: new Date(2016, 5, 12),
        dischargeDate: new Date(2016, 5, 12),
        birthday: new Date(1991, 11, 21),
        notes: noteIds.slice(1, 2)
      },
      [patientIds[2]]: {
        ID: patientIds[2],
        createdAt: Date.now(),
        updatedAt: Date.now(),
        lastName: 'Mustermann',
        firstName: 'Samuel',
        bedNumber: 3,
        clinic: 'Pneu',
        station: '28',
        admissionDate: new Date(2016, 5, 12),
        dischargeDate: new Date(2016, 5, 12),
        birthday: new Date(1991, 11, 21),
        notes: noteIds.slice(2, 3)
      },
      [patientIds[3]]: {
        ID: patientIds[3],
        createdAt: Date.now(),
        updatedAt: Date.now(),
        lastName: 'Mustermann',
        firstName: 'Jürgen',
        bedNumber: 5,
        clinic: 'Endo',
        station: '29',
        admissionDate: new Date(2016, 5, 12),
        dischargeDate: new Date(2016, 5, 12),
        birthday: new Date(1991, 11, 21),
        notes: noteIds.slice(3, 4)
      },
      [patientIds[4]]: {
        ID: patientIds[4],
        createdAt: Date.now(),
        updatedAt: Date.now(),
        lastName: 'Mustermann',
        firstName: 'George',
        bedNumber: 21,
        clinic: 'All',
        station: '28',
        admissionDate: new Date(2016, 5, 12),
        dischargeDate: new Date(2016, 5, 12),
        birthday: new Date(1991, 11, 21),
        notes: noteIds.slice(5, 6)
      },
      [patientIds[5]]: {
        ID: patientIds[5],
        createdAt: Date.now(),
        updatedAt: Date.now(),
        lastName: 'Mustermann',
        firstName: 'Pablo',
        bedNumber: 12,
        clinic: 'Pneu',
        station: '29',
        admissionDate: new Date(2016, 5, 12),
        dischargeDate: new Date(2016, 5, 12),
        birthday: new Date(1991, 11, 21),
        notes: noteIds.slice(7, 8)
      },
      [patientIds[6]]: {
        ID: patientIds[6],
        createdAt: Date.now(),
        updatedAt: Date.now(),
        lastName: 'Mustermann',
        firstName: 'Ramón',
        bedNumber: 19,
        clinic: 'All',
        station: '29',
        admissionDate: new Date(2016, 5, 12),
        dischargeDate: new Date(2016, 5, 12),
        birthday: new Date(1991, 11, 21),
        notes: noteIds.slice(8, 9)
      }/*,
      [patientIds[7]]: {
        ID: patientIds[7],
        lastName: 'Mustermann',
        firstName: 'Johnny',
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
        firstName: 'Johannes',
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
        firstName: 'Julian',
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
        firstName: 'Johan',
        bedNumber: 24,
        clinic: 'Pneu',
        station: '28',
        admissionDate: new Date(2016, 5, 12),
        dischargeDate: new Date(2016, 5, 12),
        birthday: new Date(1991, 11, 21),
        notes: []
      }*/
    },
    notes: {
      [noteIds[0]]: {
        ID: noteIds[0],
        createdAt: new Date(2016, 7, 14).valueOf(),
        updatedAt: Date.now(),
        type: 'diagnosis',
        noteLines: noteLineIds.slice(0,1)
      },
      [noteIds[1]]: {
        ID: noteIds[1],
        createdAt: new Date(2016, 7, 10).valueOf(),
        updatedAt: Date.now(),
        type: 'history',
        noteLines: noteLineIds.slice(1,3)
      },
      [noteIds[2]]: {
        ID: noteIds[2],
        createdAt: Date.now(),
        updatedAt: Date.now(),
        type: 'todo',
        noteLines: noteLineIds.slice(3,6)
      },
      [noteIds[3]]: {
        ID: noteIds[3],
        createdAt: Date.now(),
        updatedAt: Date.now(),
        type: 'diagnosis',
        noteLines: noteLineIds.slice(6,7)
      },
      [noteIds[4]]: {
        ID: noteIds[4],
        createdAt: Date.now(),
        updatedAt: Date.now(),
        type: 'diagnosis',
        noteLines: noteLineIds.slice(7,8)
      },
      [noteIds[5]]: {
        ID: noteIds[5],
        createdAt: Date.now(),
        updatedAt: Date.now(),
        type: 'diagnosis',
        noteLines: noteLineIds.slice(8,9)
      }
    },
    noteLines: {
      [noteLineIds[0]]: {
        ID: noteLineIds[0],
        createdAt: Date.now(),
        updatedAt: Date.now(),
        text: 'something from note 1',
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
      [noteLineIds[1]]: {
        ID: noteLineIds[1],
        createdAt: Date.now(),
        updatedAt: Date.now(),
        text: 'vibe 1 something from note 2',
        important: {
          set: true,
          color: "grey",
          value: "0"
        },
        highlight: {
          set: false,
          color: "grey",
          value: "0"
        }
      },
      [noteLineIds[2]]: {
        ID: noteLineIds[2],
        createdAt: Date.now(),
        updatedAt: Date.now(),
        text: 'vibe 2 something from note 2',
        important: {
          set: true,
          color: "grey",
          value: "0"
        },
        highlight: {
          set: false,
          color: "grey",
          value: "0"
        }
      },
      [noteLineIds[3]]: {
        ID: noteLineIds[3],
        createdAt: Date.now(),
        updatedAt: Date.now(),
        text: 'vibe 3 something from note 3',
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
      [noteLineIds[4]]: {
        ID: noteLineIds[4],
        createdAt: Date.now(),
        updatedAt: Date.now(),
        text: 'vibe 3 something from note 3',
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
      [noteLineIds[5]]: {
        ID: noteLineIds[5],
        createdAt: Date.now(),
        updatedAt: Date.now(),
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
      [noteLineIds[6]]: {
        ID: noteLineIds[6],
        createdAt: Date.now(),
        updatedAt: Date.now(),
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
      [noteLineIds[7]]: {
        ID: noteLineIds[7],
        createdAt: Date.now(),
        updatedAt: Date.now(),
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
      [noteLineIds[8]]: {
        ID: noteLineIds[8],
        createdAt: Date.now(),
        updatedAt: Date.now(),
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
      [noteLineIds[9]]: {
        ID: noteLineIds[9],
        createdAt: Date.now(),
        updatedAt: Date.now(),
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
    }
  }
};

export const delay = (ms) => 
  new Promise(resolve => setTimeout(resolve, ms));

