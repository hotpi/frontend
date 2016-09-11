import { getAllPatients } from '../reducers';

import * as syncTypes from '../actions/sync';
import * as noteTypes from '../actions/note';
import * as noteLineTypes from '../actions/noteLines';
import * as patientTypes from '../actions/patients';

const INSERT = 'insert';
const DELETE = 'delete';

export const translateActionToOperation = (action, store) => {
  switch (action.type) {
    case noteTypes.NEW_NOTE:
      console.log(getAllPatients(store.getState()))

      const patients = getAllPatients(store.getState()).sort((a, b) => sortAlphabetically(a,b))
      const patientIndex = patients.map(patient => patient.ID).indexOf(action.PatientID)
      const noteIndex = patients[patientIndex].notes.length
      var accessPath = [patientIndex, noteIndex]
      var node = {
        ID: action.NoteID,
        type: 'new',
        noteLines: [action.NoteLineID]
      }
      return [INSERT, accessPath, node, action]
  }

}

export const translateOperationToAction = (operation, store) => {
  const { type, accessPath, node, action } = operation

  const patients = getAllPatients(store.getState()).sort((a, b) => sortAlphabetically(a,b))
  const patient = patients[accessPath[0]]
  const actionToDispatch = {
    ...action,
    index: accessPath[accessPath.length-1]
  }

  return actionToDispatch
}

const sortAlphabetically = (a, b) => {
  if (a.ID < b.ID) {
    return -1;
  } else if (a.ID > b.ID) {
    return 1;
  } 

  return 0;
}
