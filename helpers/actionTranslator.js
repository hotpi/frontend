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
  switch (action.type) {
  case patientTypes.DELETE_PATIENT:
    let patients = getAllPatients(store.getState()).sort((a, b) => sortAlphabetically(a,b));

    let patientIndex = patients.map(patient => patient.ID).indexOf(action.PatientID);
    let accessPath = [{ '0': patientIndex }];
    let node = {};

    return [DELETE, accessPath, node, action];
  case patientTypes.ADD_PATIENT:
    let patients = getAllPatients(store.getState()).sort((a, b) => sortAlphabetically(a,b))
    let patientIndex = patients.length
    let accessPath = [{'0': patientIndex}]
    let node = {
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

    let patients = getAllPatients(store.getState()).sort((a, b) => sortAlphabetically(a,b))
    let patientIndex = patients.map(patient => patient.ID).indexOf(action.PatientID)
    console.log(patients[patientIndex], 'NEW_NOTE')
    let noteIndex = patients[patientIndex].notes.length
    let accessPath = [{'0': patientIndex},{'1': noteIndex}]
    let node = {
      ID: action.NoteID,
      type: 'new',
      noteLines: []
    }
    return [INSERT, accessPath, node, action];
  case noteLineTypes.CREATE_AND_APPEND_LAST:
  case noteLineTypes.CREATE_AND_APPEND_NEXT:
    let patients = getAllPatients(store.getState()).sort((a, b) => sortAlphabetically(a,b))
    console.log('sorted patients: ', patients)
    let patient = patients.reduce((prev, curr, index) => {
      if (curr.notes.indexOf(action.NoteID) !== -1 ) {
        return curr;
      }

      return prev;

    }, {})
    let patientIndex = patients.map(patient => patient.ID).indexOf(patient.ID)

    let noteIndex = patient.notes.indexOf(action.NoteID)
    let note = getNoteById(store.getState(), action.NoteID)
    let noteLineIndex = typeof action.index !== 'undefined' ? 
      action.index : 
      note.noteLines.length
    let accessPath = [{'0': patientIndex},{'1': noteIndex},{'2': noteLineIndex}]
    let node = {
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
    let notes = getAllNotes(store.getState())
    let note = notes.reduce((prev, curr, index) => {
      if (curr.noteLines.indexOf(action.NoteLineID) !== -1 ) {
        return curr;
      }

      return prev;

    }, {})
    let patients = getAllPatients(store.getState()).sort((a, b) => sortAlphabetically(a,b))
    let patient = patients.reduce((prev, curr, index) => {
      if (curr.notes.indexOf(note.ID) !== -1 ) {
        return curr;
      }

      return prev;

    }, {})
    let patientIndex = patients.map(patient => patient.ID).indexOf(patient.ID)
    let noteIndex = patient.notes.indexOf(note.ID)
    let noteLineIndex = note.noteLines.indexOf(action.NoteLineID)
    let noteLine = getNoteLine(store.getState(), action.NoteLineID)

    let operationType = action.opType
    let textIndex = operationType === INSERT ? action.position - 1 : action.position

    let node = action.text[textIndex]

    let accessPath = [{'0': patientIndex}, {'1': noteIndex}, {'2': noteLineIndex}, {'3': textIndex}]

    return [operationType, accessPath, node, action]
  case noteLineTypes.DELETE_LINE:
    let patients = getAllPatients(store.getState()).sort((a, b) => sortAlphabetically(a,b))
    let patient = patients.reduce((prev, curr, index) => {
      if (curr.notes.indexOf(action.NoteID) !== -1 ) {
        return curr;
      }

      return prev;

    }, {})
    let patientIndex = patients.map(patient => patient.ID).indexOf(patient.ID)

    let noteIndex = patient.notes.indexOf(action.NoteID)
    let note = getNoteById(store.getState(), action.NoteID)
    let noteLineIndex = note.noteLines.indexOf(action.NoteLineID)
    let accessPath = [{'0': patientIndex},{'1': noteIndex},{'2': noteLineIndex}]
    let node = {}
    return [DELETE, accessPath, node, action];

  case noteLineTypes.IMPORTANT_LINE:
    let notes = getAllNotes(store.getState())
    let note = notes.reduce((prev, curr, index) => {
      if (curr.noteLines.indexOf(action.NoteLineID) !== -1 ) {
        return curr;
      }

      return prev;

    }, {})
    let patients = getAllPatients(store.getState()).sort((a, b) => sortAlphabetically(a,b))
    let patient = patients.reduce((prev, curr, index) => {
      if (curr.notes.indexOf(note.ID) !== -1 ) {
        return curr;
      }

      return prev;

    }, {})
    let patientIndex = patients.map(patient => patient.ID).indexOf(patient.ID)
    let noteIndex = patient.notes.indexOf(note.ID)
    let noteLineIndex = note.noteLines.indexOf(action.NoteLineID)
    let noteLine = getNoteLine(store.getState(), action.NoteLineID)
    let accessPath/*Insert*/ = [{'0': patientIndex},{'1': noteIndex},{'2': noteLineIndex}]
    
    let node = {
      ...noteLine,
      important: {
        set: +action.value !== 0,
        color: action.color,
        value: action.value
      }
    }
    return [ [DELETE, accessPath, {}, action]], [INSERT, accessPath, node, action] ;
  
  case noteLineTypes.HIGHLIGHT_LINE:
    let notes = getAllNotes(store.getState())
    let note = notes.reduce((prev, curr, index) => {
      if (curr.noteLines.indexOf(action.NoteLineID) !== -1 ) {
        return curr;
      }

      return prev;

    }, {})
    let patients = getAllPatients(store.getState()).sort((a, b) => sortAlphabetically(a,b))
    let patient = patients.reduce((prev, curr, index) => {
      if (curr.notes.indexOf(note.ID) !== -1 ) {
        return curr;
      }

      return prev;

    }, {})
    let patientIndex = patients.map(patient => patient.ID).indexOf(patient.ID)
    let noteIndex = patient.notes.indexOf(note.ID)
    let noteLineIndex = note.noteLines.indexOf(action.NoteLineID)
    let noteLine = getNoteLine(store.getState(), action.NoteLineID)
    let accessPath/*Insert*/ = [{'0': patientIndex},{'1': noteIndex},{'2': noteLineIndex}]
    // let accessPathDelete = [{'0': patientIndex},{'1': noteIndex},{'2': noteLineIndex}]

    let node = {
      ...noteLine,
      highlight: {
        set: +action.value !== 0,
        color: action.color,
        value: action.value
      }
    }
    return [ [DELETE, accessPath, {}, action], [INSERT, accessPath, node, action] ]

  case noteTypes.CHANGE_NOTE_TYPE:
    let patients = getAllPatients(store.getState()).sort((a, b) => sortAlphabetically(a,b))
    let patient = patients.reduce((prev, curr, index) => {
      if (curr.notes.indexOf(action.NoteID) !== -1 ) {
        return curr;
      }

      return prev;

    }, {})
    let patientIndex = patients.map(patient => patient.ID).indexOf(patient.ID)
    console.log(patients[patientIndex], 'CHANGE_NOTE_TYPE')
    let note = getNoteById(store.getState(), action.NoteID)
    let noteIndex = patients[patientIndex].notes.indexOf(action.NoteID)
    let accessPath = [{'0': patientIndex}, {'1': noteIndex}]
    let node = {
      ...note,
      type: action.newType,
    }
    
    return [[DELETE, accessPath, {}, action], [INSERT, accessPath, node, action]]
  case noteTypes.MERGE_NOTES:
    let patients = getAllPatients(store.getState()).sort((a, b) => sortAlphabetically(a,b))
    let patient = patients.reduce((prev, curr, index) => {
      if (curr.notes.indexOf(action.NoteID) !== -1 ) {
        return curr;
      }

      return prev;

    }, {})
    let patientIndex = patients.map(patient => patient.ID).indexOf(patient.ID)
    console.log(patients[patientIndex], 'MERGE_NOTES')
    let note = getNoteById(store.getState(), action.NoteID)
    let noteIndex = patients[patientIndex].notes.indexOf(action.NoteID)
    let accessPath = [{'0': patientIndex}, {'1': noteIndex}]
    let node = {
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

