/* eslint-disable */

/**
 * TODO: Heavy refactoring needed on this file
 */

import { getAllPatients, getNoteById, getAllNotes, getNoteLine } from '../reducers';

import * as noteTypes from '../actions/note';
import * as noteLineTypes from '../actions/noteLines';
import * as patientTypes from '../actions/patients';

const INSERT = 'insert';
const DELETE = 'delete';

const createOTOperation = () => {

}

export const getAccessPath = (objectAccessPath) => {
  if (objectAccessPath.length === 1) {
    return [objectAccessPath[0]['0']];
  } else if (objectAccessPath.length === 2) {
    return [objectAccessPath[0]['0'], objectAccessPath[1]['1']];
  } else if (objectAccessPath.length === 3) {
    return [objectAccessPath[0]['0'], objectAccessPath[1]['1'], objectAccessPath[2]['2']];
  }

  return [
    objectAccessPath[0]['0'],
    objectAccessPath[1]['1'],
    objectAccessPath[2]['2'],
    objectAccessPath[3]['3']
  ];
};

const sortAlphabetically = (a, b) => {
  if (a.ID < b.ID) {
    return -1;
  } else if (a.ID > b.ID) {
    return 1;
  }

  return 0;
};

export const translateActionToOperation = (action, store) => {
  let patients = [];
  let patient = {};
  let patientIndex = -1;

  let notes = [];
  let note = {};
  let noteIndex = -1;

  let noteLine = {};
  let noteLineIndex = -1;

  let textIndex = -1;

  let accessPath = [];
  let node = {};

  switch (action.type) {
  case patientTypes.DELETE_PATIENT:
    patients = getAllPatients(store.getState()).sort((a, b) => sortAlphabetically(a, b));

    patientIndex = patients.map(patient => patient.ID).indexOf(action.PatientID);
    accessPath = [{ '0': patientIndex }];k
    node = {};

    return [DELETE, accessPath, node, action];
  case patientTypes.ADD_PATIENT:
    patients = getAllPatients(store.getState()).sort((a, b) => sortAlphabetically(a,b))
    patientIndex = patients.length
    accessPath = [{'0': patientIndex}]
    node = {
      ID: action.PatientID,
      firstName: action.firstName,
      lastName: action.lastName,
      birthday: action.birthday,
      clinic: action.clinic,
      station: action.station,
      admissionDate: action.admissionDate,
      dischargeDate: action.dischargeDate
    };

    return [INSERT, accessPath, node, action];
  case noteTypes.NEW_NOTE:

    patients = getAllPatients(store.getState()).sort((a, b) => sortAlphabetically(a,b))
    patientIndex = patients.map(patient => patient.ID).indexOf(action.PatientID)
    console.log(patients[patientIndex], 'NEW_NOTE')
    noteIndex = patients[patientIndex].notes.length
    accessPath = [{'0': patientIndex},{'1': noteIndex}]
    node = {
      ID: action.NoteID,
      type: 'new',
      noteLines: []
    }
    return [INSERT, accessPath, node, action];
  case noteLineTypes.CREATE_AND_APPEND_LAST:
  case noteLineTypes.CREATE_AND_APPEND_NEXT:
    patients = getAllPatients(store.getState()).sort((a, b) => sortAlphabetically(a,b))
    console.log('sorted patients: ', patients)
    patient = patients.reduce((prev, curr, index) => {
      if (curr.notes.indexOf(action.NoteID) !== -1 ) {
        return curr;
      }

      return prev;

    }, {})
    patientIndex = patients.map(patient => patient.ID).indexOf(patient.ID)

    noteIndex = patient.notes.indexOf(action.NoteID)
    note = getNoteById(store.getState(), action.NoteID)
    noteLineIndex = typeof action.index !== 'undefined' ? 
      action.index : 
      note.noteLines.length
    accessPath = [{'0': patientIndex},{'1': noteIndex},{'2': noteLineIndex}]
    node = {
      ID: action.NoteLineID,
      text: '',
      important: {
        set: false,
        color: "grey",
        value: 0
      },
      highlight: {
        set: false,
        color: "grey",
        value: 0
      }
    }
    return [INSERT, accessPath, node, action];
  case noteLineTypes.UPDATE_LINE_VALUE:
    notes = getAllNotes(store.getState())
    note = notes.reduce((prev, curr, index) => {
      if (curr.noteLines.indexOf(action.NoteLineID) !== -1 ) {
        return curr;
      }

      return prev;

    }, {})
    patients = getAllPatients(store.getState()).sort((a, b) => sortAlphabetically(a,b))
    patient = patients.reduce((prev, curr, index) => {
      if (curr.notes.indexOf(note.ID) !== -1 ) {
        return curr;
      }

      return prev;

    }, {})
    patientIndex = patients.map(patient => patient.ID).indexOf(patient.ID)
    noteIndex = patient.notes.indexOf(note.ID)
    noteLineIndex = note.noteLines.indexOf(action.NoteLineID)
    noteLine = getNoteLine(store.getState(), action.NoteLineID)

    let operationType = action.opType
    textIndex = operationType === INSERT ? action.position - 1 : action.position

    node = action.text[textIndex]

    accessPath = [{'0': patientIndex}, {'1': noteIndex}, {'2': noteLineIndex}, {'3': textIndex}]

    return [operationType, accessPath, node, action]
  case noteLineTypes.DELETE_LINE:
    patients = getAllPatients(store.getState()).sort((a, b) => sortAlphabetically(a,b))
    patient = patients.reduce((prev, curr, index) => {
      if (curr.notes.indexOf(action.NoteID) !== -1 ) {
        return curr;
      }

      return prev;

    }, {})
    patientIndex = patients.map(patient => patient.ID).indexOf(patient.ID)

    noteIndex = patient.notes.indexOf(action.NoteID)
    note = getNoteById(store.getState(), action.NoteID)
    noteLineIndex = note.noteLines.indexOf(action.NoteLineID)
    accessPath = [{'0': patientIndex},{'1': noteIndex},{'2': noteLineIndex}]
    node = {}
    return [DELETE, accessPath, node, action];

  case noteLineTypes.IMPORTANT_LINE:
    notes = getAllNotes(store.getState())
    note = notes.reduce((prev, curr, index) => {
      if (curr.noteLines.indexOf(action.NoteLineID) !== -1 ) {
        return curr;
      }

      return prev;

    }, {})
    patients = getAllPatients(store.getState()).sort((a, b) => sortAlphabetically(a,b))
    patient = patients.reduce((prev, curr, index) => {
      if (curr.notes.indexOf(note.ID) !== -1 ) {
        return curr;
      }

      return prev;

    }, {})
    patientIndex = patients.map(patient => patient.ID).indexOf(patient.ID)
    noteIndex = patient.notes.indexOf(note.ID)
    noteLineIndex = note.noteLines.indexOf(action.NoteLineID)
    noteLine = getNoteLine(store.getState(), action.NoteLineID)
    accessPath/*Insert*/ = [{'0': patientIndex},{'1': noteIndex},{'2': noteLineIndex}]
    
    node = {
      ...noteLine,
      important: {
        set: +action.value !== 0,
        color: action.color,
        value: action.value
      }
    }
    return [ [DELETE, accessPath, {}, action]], [INSERT, accessPath, node, action] ;
  
  case noteLineTypes.HIGHLIGHT_LINE:
    notes = getAllNotes(store.getState())
    note = notes.reduce((prev, curr, index) => {
      if (curr.noteLines.indexOf(action.NoteLineID) !== -1 ) {
        return curr;
      }

      return prev;

    }, {})
    patients = getAllPatients(store.getState()).sort((a, b) => sortAlphabetically(a,b))
    patient = patients.reduce((prev, curr, index) => {
      if (curr.notes.indexOf(note.ID) !== -1 ) {
        return curr;
      }

      return prev;

    }, {})
    patientIndex = patients.map(patient => patient.ID).indexOf(patient.ID)
    noteIndex = patient.notes.indexOf(note.ID)
    noteLineIndex = note.noteLines.indexOf(action.NoteLineID)
    noteLine = getNoteLine(store.getState(), action.NoteLineID)
    accessPath/*Insert*/ = [{'0': patientIndex},{'1': noteIndex},{'2': noteLineIndex}]
    // accessPathDelete = [{'0': patientIndex},{'1': noteIndex},{'2': noteLineIndex}]

    node = {
      ...noteLine,
      highlight: {
        set: +action.value !== 0,
        color: action.color,
        value: action.value
      }
    }
    return [ [DELETE, accessPath, {}, action], [INSERT, accessPath, node, action] ]

  case noteTypes.CHANGE_NOTE_TYPE:
    patients = getAllPatients(store.getState()).sort((a, b) => sortAlphabetically(a,b))
    patient = patients.reduce((prev, curr, index) => {
      if (curr.notes.indexOf(action.NoteID) !== -1 ) {
        return curr;
      }

      return prev;

    }, {})
    patientIndex = patients.map(patient => patient.ID).indexOf(patient.ID)
    console.log(patients[patientIndex], 'CHANGE_NOTE_TYPE')
    note = getNoteById(store.getState(), action.NoteID)
    noteIndex = patients[patientIndex].notes.indexOf(action.NoteID)
    accessPath = [{'0': patientIndex}, {'1': noteIndex}]
    node = {
      ...note,
      type: action.newType,
    }
    
    return [[DELETE, accessPath, {}, action], [INSERT, accessPath, node, action]]
  case noteTypes.MERGE_NOTES:
    patients = getAllPatients(store.getState()).sort((a, b) => sortAlphabetically(a,b))
    patient = patients.reduce((prev, curr, index) => {
      if (curr.notes.indexOf(action.NoteID) !== -1 ) {
        return curr;
      }

      return prev;

    }, {})
    patientIndex = patients.map(patient => patient.ID).indexOf(patient.ID)
    console.log(patients[patientIndex], 'MERGE_NOTES')
    note = getNoteById(store.getState(), action.NoteID)
    noteIndex = patients[patientIndex].notes.indexOf(action.NoteID)
    accessPath = [{'0': patientIndex}, {'1': noteIndex}]
    node = {
      ...note,
      noteLines: action.noteLines
    }
    
    return [[DELETE, accessPath, {}, action], [INSERT, accessPath, node, action]];
  }
};

export const translateOperationToAction = (operation) => {
  const { accessPath, action } = operation;
  const newAccessPath = getAccessPath(accessPath);

  let actionToDispatch = { type: 'NO-OP' };

  if (operation.type !== 'no-op') {
    actionToDispatch = {
      ...action,
      index: newAccessPath[newAccessPath.length - 1],
      node: operation.node,
      fromServer: true
    };
  }

  return actionToDispatch;
};

