/* eslint-disable */
// /*import { v4 } from 'node-uuid';

// export const noteIds = [v4(), v4(), v4(), v4(), v4(), v4()]
// const noteLineIds = [v4(), v4(), v4(), v4(), v4(), v4(), v4(), v4(), v4(), v4(), v4()]
// export const patientIds = [v4(), v4(), v4(), v4(), v4(), v4(), v4(), v4(), v4(), v4(), v4()]

// export const fakeBackend = {
//   entities: {
//     patients: {
//       [patientIds[0]]: {
//         ID: patientIds[0],
//         createdAt: Date.now(),
//         updatedAt: Date.now(),
//         lastName: 'Mustermann',
//         firstName: 'Max',
//         bedNumber: 10,
//         clinic: 'Endo',
//         station: '28',
//         admissionDate: new Date(2016, 5, 12),
//         dischargeDate: new Date(2016, 5, 12),
//         birthday: new Date(1991, 11, 21),
//         notes: noteIds.slice(0, 3)
//       },
//       [patientIds[1]]: {
//         ID: patientIds[1],
//         createdAt: Date.now(),
//         updatedAt: Date.now(),
//         lastName: 'Mustermann',
//         firstName: 'Robert',
//         bedNumber: 17,
//         clinic: 'Endo',
//         station: '28',
//         admissionDate: new Date(2016, 5, 12),
//         dischargeDate: new Date(2016, 5, 12),
//         birthday: new Date(1991, 11, 21),
//         notes: noteIds.slice(1, 2)
//       },
//       [patientIds[2]]: {
//         ID: patientIds[2],
//         createdAt: Date.now(),
//         updatedAt: Date.now(),
//         lastName: 'Mustermann',
//         firstName: 'Samuel',
//         bedNumber: 3,
//         clinic: 'Pneu',
//         station: '28',
//         admissionDate: new Date(2016, 5, 12),
//         dischargeDate: new Date(2016, 5, 12),
//         birthday: new Date(1991, 11, 21),
//         notes: noteIds.slice(2, 3)
//       },
//       [patientIds[3]]: {
//         ID: patientIds[3],
//         createdAt: Date.now(),
//         updatedAt: Date.now(),
//         lastName: 'Mustermann',
//         firstName: 'Jürgen',
//         bedNumber: 5,
//         clinic: 'Endo',
//         station: '29',
//         admissionDate: new Date(2016, 5, 12),
//         dischargeDate: new Date(2016, 5, 12),
//         birthday: new Date(1991, 11, 21),
//         notes: noteIds.slice(3, 4)
//       },
//       [patientIds[4]]: {
//         ID: patientIds[4],
//         createdAt: Date.now(),
//         updatedAt: Date.now(),
//         lastName: 'Mustermann',
//         firstName: 'George',
//         bedNumber: 21,
//         clinic: 'All',
//         station: '28',
//         admissionDate: new Date(2016, 5, 12),
//         dischargeDate: new Date(2016, 5, 12),
//         birthday: new Date(1991, 11, 21),
//         notes: noteIds.slice(5, 6)
//       },
//       [patientIds[5]]: {
//         ID: patientIds[5],
//         createdAt: Date.now(),
//         updatedAt: Date.now(),
//         lastName: 'Mustermann',
//         firstName: 'Pablo',
//         bedNumber: 12,
//         clinic: 'Pneu',
//         station: '29',
//         admissionDate: new Date(2016, 5, 12),
//         dischargeDate: new Date(2016, 5, 12),
//         birthday: new Date(1991, 11, 21),
//         notes: noteIds.slice(7, 8)
//       },
//       [patientIds[6]]: {
//         ID: patientIds[6],
//         createdAt: Date.now(),
//         updatedAt: Date.now(),
//         lastName: 'Mustermann',
//         firstName: 'Ramón',
//         bedNumber: 19,
//         clinic: 'All',
//         station: '29',
//         admissionDate: new Date(2016, 5, 12),
//         dischargeDate: new Date(2016, 5, 12),
//         birthday: new Date(1991, 11, 21),
//         notes: noteIds.slice(8, 9)
//       }/*,
//       [patientIds[7]]: {
//         ID: patientIds[7],
//         lastName: 'Mustermann',
//         firstName: 'Johnny',
//         bedNumber: 9,
//         clinic: 'Pneu',
//         station: '28',
//         admissionDate: new Date(2016, 5, 12),
//         dischargeDate: new Date(2016, 5, 12),
//         birthday: new Date(1991, 11, 21),
//         notes: []
//       },
//       [patientIds[8]]: {
//         ID: patientIds[8],
//         lastName: 'Mustermann',
//         firstName: 'Johannes',
//         bedNumber: 1,
//         clinic: 'Endo',
//         station: '28',
//         admissionDate: new Date(2016, 5, 12),
//         dischargeDate: new Date(2016, 5, 12),
//         birthday: new Date(1991, 11, 21),
//         notes: []
//       },
//       [patientIds[9]]: {
//         ID: patientIds[9],
//         lastName: 'Mustermann',
//         firstName: 'Julian',
//         bedNumber: 3,
//         clinic: 'Pneu',
//         station: '28',
//         admissionDate: new Date(2016, 5, 12),
//         dischargeDate: new Date(2016, 5, 12),
//         birthday: new Date(1991, 11, 21),
//         notes: []
//       },
//       [patientIds[10]]: {
//         ID: patientIds[10],
//         lastName: 'Mustermann',
//         firstName: 'Johan',
//         bedNumber: 24,
//         clinic: 'Pneu',
//         station: '28',
//         admissionDate: new Date(2016, 5, 12),
//         dischargeDate: new Date(2016, 5, 12),
//         birthday: new Date(1991, 11, 21),
//         notes: []
//       }*/
//     },
//     notes: {
//       [noteIds[0]]: {
//         ID: noteIds[0],
//         createdAt: new Date(2016, 7, 14).valueOf(),
//         updatedAt: Date.now(),
//         type: 'diagnosis',
//         noteLines: noteLineIds.slice(0,1)
//       },
//       [noteIds[1]]: {
//         ID: noteIds[1],
//         createdAt: new Date(2016, 7, 10).valueOf(),
//         updatedAt: Date.now(),
//         type: 'history',
//         noteLines: noteLineIds.slice(1,3)
//       },
//       [noteIds[2]]: {
//         ID: noteIds[2],
//         createdAt: Date.now(),
//         updatedAt: Date.now(),
//         type: 'todo',
//         noteLines: noteLineIds.slice(3,6)
//       },
//       [noteIds[3]]: {
//         ID: noteIds[3],
//         createdAt: Date.now(),
//         updatedAt: Date.now(),
//         type: 'diagnosis',
//         noteLines: noteLineIds.slice(6,7)
//       },
//       [noteIds[4]]: {
//         ID: noteIds[4],
//         createdAt: Date.now(),
//         updatedAt: Date.now(),
//         type: 'diagnosis',
//         noteLines: noteLineIds.slice(7,8)
//       },
//       [noteIds[5]]: {
//         ID: noteIds[5],
//         createdAt: Date.now(),
//         updatedAt: Date.now(),
//         type: 'diagnosis',
//         noteLines: noteLineIds.slice(8,9)
//       }
//     },
//     noteLines: {
//       [noteLineIds[0]]: {
//         ID: noteLineIds[0],
//         createdAt: Date.now(),
//         updatedAt: Date.now(),
//         text: 'something from note 1',
//         important: {
//           set: false,
//           color: "grey",
//           value: "0"
//         },
//         highlight: {
//           set: false,
//           color: "grey",
//           value: "0"
//         }
//       },
//       [noteLineIds[1]]: {
//         ID: noteLineIds[1],
//         createdAt: Date.now(),
//         updatedAt: Date.now(),
//         text: 'vibe 1 something from note 2',
//         important: {
//           set: true,
//           color: "grey",
//           value: "0"
//         },
//         highlight: {
//           set: false,
//           color: "grey",
//           value: "0"
//         }
//       },
//       [noteLineIds[2]]: {
//         ID: noteLineIds[2],
//         createdAt: Date.now(),
//         updatedAt: Date.now(),
//         text: 'vibe 2 something from note 2',
//         important: {
//           set: true,
//           color: "grey",
//           value: "0"
//         },
//         highlight: {
//           set: false,
//           color: "grey",
//           value: "0"
//         }
//       },
//       [noteLineIds[3]]: {
//         ID: noteLineIds[3],
//         createdAt: Date.now(),
//         updatedAt: Date.now(),
//         text: 'vibe 3 something from note 3',
//         important: {
//           set: false,
//           color: "grey",
//           value: "0"
//         },
//         highlight: {
//           set: false,
//           color: "grey",
//           value: "0"
//         }
//       },
//       [noteLineIds[4]]: {
//         ID: noteLineIds[4],
//         createdAt: Date.now(),
//         updatedAt: Date.now(),
//         text: 'vibe 3 something from note 3',
//         important: {
//           set: false,
//           color: "grey",
//           value: "0"
//         },
//         highlight: {
//           set: false,
//           color: "grey",
//           value: "0"
//         }
//       },
//       [noteLineIds[5]]: {
//         ID: noteLineIds[5],
//         createdAt: Date.now(),
//         updatedAt: Date.now(),
//         text: '',
//         important: {
//           set: false,
//           color: "grey",
//           value: "0"
//         },
//         highlight: {
//           set: false,
//           color: "grey",
//           value: "0"
//         }
//       },
//       [noteLineIds[6]]: {
//         ID: noteLineIds[6],
//         createdAt: Date.now(),
//         updatedAt: Date.now(),
//         text: '',
//         important: {
//           set: false,
//           color: "grey",
//           value: "0"
//         },
//         highlight: {
//           set: false,
//           color: "grey",
//           value: "0"
//         }
//       },
//       [noteLineIds[7]]: {
//         ID: noteLineIds[7],
//         createdAt: Date.now(),
//         updatedAt: Date.now(),
//         text: '',
//         important: {
//           set: false,
//           color: "grey",
//           value: "0"
//         },
//         highlight: {
//           set: false,
//           color: "grey",
//           value: "0"
//         }
//       },
//       [noteLineIds[8]]: {
//         ID: noteLineIds[8],
//         createdAt: Date.now(),
//         updatedAt: Date.now(),
//         text: '',
//         important: {
//           set: false,
//           color: "grey",
//           value: "0"
//         },
//         highlight: {
//           set: false,
//           color: "grey",
//           value: "0"
//         }
//       },
//       [noteLineIds[9]]: {
//         ID: noteLineIds[9],
//         createdAt: Date.now(),
//         updatedAt: Date.now(),
//         text: '',
//         important: {
//           set: false,
//           color: "grey",
//           value: "0"
//         },
//         highlight: {
//           set: false,
//           color: "grey",
//           value: "0"
//         }
//       },
//     }
//   }
// };*/

export const fakeBackend = {
  entities: JSON.parse('{\
    \
  "notes": {\
    "5f41afb7-012b-4778-bdd2-7124ad7de18c": {\
      "ID": "5f41afb7-012b-4778-bdd2-7124ad7de18c",\
      "createdAt": 1471125600000,\
      "updatedAt": 1472134487120,\
      "type": "diagnosis",\
      "noteLines": ["ad7c6e70-4bca-4954-bccd-66569accd0b1"]\
    },\
    "76213fd0-f54d-49ba-92e8-ccbd241e607a": {\
      "ID": "76213fd0-f54d-49ba-92e8-ccbd241e607a",\
      "createdAt": 1470780000000,\
      "updatedAt": 1472134487120,\
      "type": "history",\
      "noteLines": ["9ecdc8cd-543d-4253-9832-08832b1e4156","9f67b510-3da9-4328-ae83-e72bc67d7f3c"]\
    },\
    "4691be5b-a4b8-4494-833d-796ca83a3af0": {\
      "ID": "4691be5b-a4b8-4494-833d-796ca83a3af0",\
      "createdAt": 1472134487120,\
      "updatedAt": 1472134487120,\
      "type": "todo",\
      "noteLines": ["d77cf6b0-57ca-40f9-9837-18974c4e1909","523b06a5-2f7e-4907-9a84-4d3efe8760e0","336d5e3d-4dd0-4375-b63e-d926e66263b3"]\
    },\
    "100eb324-2b87-4708-9fbb-a94ab5abeef7": {\
      "ID": "100eb324-2b87-4708-9fbb-a94ab5abeef7",\
      "createdAt": 1472134487120,\
      "updatedAt": 1472134487120,\
      "type": "diagnosis",\
      "noteLines": ["c3f95806-c1dd-493c-9093-39a29da3b992"]\
    },\
    "faa74b52-c057-418e-8bd9-6cca41866b74": {\
      "ID": "faa74b52-c057-418e-8bd9-6cca41866b74",\
      "createdAt": 1472134487120,\
      "updatedAt": 1472134487120,\
      "type": "diagnosis",\
      "noteLines": ["9e62cebf-110a-4eae-bf60-758cdbc9aa93"]\
    },\
    "7f0adace-e051-4230-9c13-69aab841e487": {\
      "ID": "7f0adace-e051-4230-9c13-69aab841e487",\
      "createdAt": 1472134487120,\
      "updatedAt": 1472134487120,\
      "type": "diagnosis",\
      "noteLines": ["2dc74e00-6cb0-49ca-a9f0-f5c069a0920c"]\
    }\
  },\
  "noteLines": {\
    "ad7c6e70-4bca-4954-bccd-66569accd0b1": {\
      "ID": "ad7c6e70-4bca-4954-bccd-66569accd0b1",\
      "createdAt": 1472134487120,\
      "updatedAt": 1472134487120,\
      "text": "something from note 1",\
      "important": {\
        "set": false,"color": "grey","value": "0"\
      },\
      "highlight": {\
        "set": false,"color": "grey","value": "0"\
      }\
    },\
    "9ecdc8cd-543d-4253-9832-08832b1e4156": {\
      "ID": "9ecdc8cd-543d-4253-9832-08832b1e4156",\
      "createdAt": 1472134487120,\
      "updatedAt": 1472134487120,\
      "text": "vibe 1 something from note 2",\
      "important": {\
        "set": true,"color": "grey","value": "0"\
      },\
      "highlight": {\
        "set": false,"color": "grey","value": "0"\
      }\
    },\
    "9f67b510-3da9-4328-ae83-e72bc67d7f3c": {\
      "ID": "9f67b510-3da9-4328-ae83-e72bc67d7f3c",\
      "createdAt": 1472134487120,\
      "updatedAt": 1472134487120,\
      "text": "vibe 2 something from note 2",\
      "important": {\
        "set": true,"color": "grey","value": "0"\
      },\
      "highlight": {\
        "set": false,"color": "grey","value": "0"\
      }\
    },\
    "d77cf6b0-57ca-40f9-9837-18974c4e1909": {\
      "ID": "d77cf6b0-57ca-40f9-9837-18974c4e1909",\
      "createdAt": 1472134487120,\
      "updatedAt": 1472134487120,\
      "text": "vibe 3 something from note 3",\
      "important": {\
        "set": false,"color": "grey","value": "0"\
      },\
      "highlight": {\
        "set": false,"color": "grey","value": "0"\
      }\
    },\
    "523b06a5-2f7e-4907-9a84-4d3efe8760e0": {\
      "ID": "523b06a5-2f7e-4907-9a84-4d3efe8760e0",\
      "createdAt": 1472134487120,\
      "updatedAt": 1472134487120,\
      "text": "vibe 3 something from note 3",\
      "important": {\
        "set": false,"color": "grey","value": "0"\
      },\
      "highlight": {\
        "set": false,"color": "grey","value": "0"\
      }\
    },\
    "336d5e3d-4dd0-4375-b63e-d926e66263b3": {\
      "ID": "336d5e3d-4dd0-4375-b63e-d926e66263b3",\
      "createdAt": 1472134487120,\
      "updatedAt": 1472134487120,\
      "text": "",\
      "important": {\
        "set": false,"color": "grey","value": "0"\
      },\
      "highlight": {\
        "set": false,"color": "grey","value": "0"\
      }\
    },\
    "c3f95806-c1dd-493c-9093-39a29da3b992": {\
      "ID": "c3f95806-c1dd-493c-9093-39a29da3b992",\
      "createdAt": 1472134487120,\
      "updatedAt": 1472134487120,\
      "text": "",\
      "important": {\
        "set": false,"color": "grey","value": "0"\
      },\
      "highlight": {\
        "set": false,"color": "grey","value": "0"\
      }\
    },\
    "9e62cebf-110a-4eae-bf60-758cdbc9aa93": {\
      "ID": "9e62cebf-110a-4eae-bf60-758cdbc9aa93",\
      "createdAt": 1472134487120,\
      "updatedAt": 1472134487120,\
      "text": "",\
      "important": {\
        "set": false,"color": "grey","value": "0"\
      },\
      "highlight": {\
        "set": false,"color": "grey","value": "0"\
      }\
    },\
    "2dc74e00-6cb0-49ca-a9f0-f5c069a0920c": {\
      "ID": "2dc74e00-6cb0-49ca-a9f0-f5c069a0920c",\
      "createdAt": 1472134487120,\
      "updatedAt": 1472134487120,\
      "text": "",\
      "important": {\
        "set": false,"color": "grey","value": "0"\
      },\
      "highlight": {\
        "set": false,"color": "grey","value": "0"\
      }\
    },\
    "0410b636-824c-49be-b0f7-f33c5f0df80a": {\
      "ID": "0410b636-824c-49be-b0f7-f33c5f0df80a",\
      "createdAt": 1472134487120,\
      "updatedAt": 1472134487120,\
      "text": "",\
      "important": {\
        "set": false,"color": "grey","value": "0"\
      },\
      "highlight": {\
        "set": false,"color": "grey","value": "0" \
      }\
    }\
  },\
  "patients": {\
    "2c3da314-4e36-4d61-9dd2-2fbe6a469083": {\
      "ID": "2c3da314-4e36-4d61-9dd2-2fbe6a469083",\
      "createdAt": 1472134487120,\
      "updatedAt": 1472134487120,\
      "lastName": "Mustermann",\
      "firstName": "Max",\
      "bedNumber": 10,\
      "clinic": "Endo",\
      "station": "28",\
      "admissionDate": 1465682400000,\
      "dischargeDate": 1465682400000,\
      "birthday": 693270000000,\
      "notes": ["5f41afb7-012b-4778-bdd2-7124ad7de18c","76213fd0-f54d-49ba-92e8-ccbd241e607a","4691be5b-a4b8-4494-833d-796ca83a3af0"]\
    },\
    "75996241-58ed-44c7-90a9-e633c7fe1126": {\
      "ID": "75996241-58ed-44c7-90a9-e633c7fe1126",\
      "createdAt": 1472134487120,\
      "updatedAt": 1472134487120,\
      "lastName": "Mustermann",\
      "firstName": "Robert",\
      "bedNumber": 17,\
      "clinic": "Endo",\
      "station": "28",\
      "admissionDate": 1465682400000,\
      "dischargeDate": 1465682400000,\
      "birthday": 693270000000,\
      "notes": ["76213fd0-f54d-49ba-92e8-ccbd241e607a"]\
    },\
    "75375d21-9600-4147-9812-db0651c663cb": {\
      "ID": "75375d21-9600-4147-9812-db0651c663cb",\
      "createdAt": 1472134487120,\
      "updatedAt": 1472134487120,\
      "lastName": "Mustermann",\
      "firstName": "Samuel",\
      "bedNumber": 3,\
      "clinic": "Pneu",\
      "station": "28",\
      "admissionDate": 1465682400000,\
      "dischargeDate": 1465682400000,\
      "birthday": 693270000000,\
      "notes": ["4691be5b-a4b8-4494-833d-796ca83a3af0"]\
    },\
    "0b74d605-efea-4038-a627-e85b63995e5c": {\
      "ID": "0b74d605-efea-4038-a627-e85b63995e5c",\
      "createdAt": 1472134487120,\
      "updatedAt": 1472134487120,\
      "lastName": "Mustermann",\
      "firstName": "Jürgen",\
      "bedNumber": 5,\
      "clinic": "Endo",\
      "station": "29",\
      "admissionDate": 1465682400000,\
      "dischargeDate": 1465682400000,\
      "birthday": 693270000000,\
      "notes": ["100eb324-2b87-4708-9fbb-a94ab5abeef7"]\
    },\
    "3a472f12-1ca2-4526-b249-7207517baef7": {\
      "ID": "3a472f12-1ca2-4526-b249-7207517baef7",\
      "createdAt": 1472134487120,\
      "updatedAt": 1472134487120,\
      "lastName": "Mustermann",\
      "firstName": "George",\
      "bedNumber": 21,\
      "clinic": "All",\
      "station": "28",\
      "admissionDate": 1465682400000,\
      "dischargeDate": 1465682400000,\
      "birthday": 693270000000,\
      "notes": ["7f0adace-e051-4230-9c13-69aab841e487"]\
    },\
    "8b2afae0-a67e-4854-bea8-d4189b354791": {\
      "ID": "8b2afae0-a67e-4854-bea8-d4189b354791",\
      "createdAt": 1472134487120,\
      "updatedAt": 1472134487120,\
      "lastName": "Mustermann",\
      "firstName": "Pablo",\
      "bedNumber": 12,\
      "clinic": "Pneu",\
      "station": "29",\
      "admissionDate": 1465682400000,\
      "dischargeDate": 1465682400000,\
      "birthday": 693270000000,\
      "notes": []\
    },\
    "842a4581-a6f7-4cdb-88a3-45799163f7af": {\
      "ID": "842a4581-a6f7-4cdb-88a3-45799163f7af",\
      "createdAt": 1472134487120,\
      "updatedAt": 1472134487120,\
      "lastName": "Mustermann",\
      "firstName": "Ramón",\
      "bedNumber": 19,\
      "clinic": "All",\
      "station": "29",\
      "admissionDate": 1465682400000,\
      "dischargeDate": 1465682400000,\
      "birthday": 693270000000,\
      "notes": []\
    }\
  }\
}')
};

export const delay = (ms) => 
  new Promise(resolve => setTimeout(resolve, ms));

