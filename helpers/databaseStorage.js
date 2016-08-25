import { db } from '../index'

export const loadState = () => {
  return db.state.where('id').equals(1).first().then(
    (state) => state.state, 
    (message) => console.log('loadState failed: ', message)
  );
}

export const saveState = (state) => {
  console.log('state saved!')
  db.state.put({id: 1, state}).then(
    null, 
    (message) => console.log('saveState failed: ', message)
  )
  db.state.where('id').equals(1).first().then(
    (response) => console.log('saved ', response, ' at ', new Date())
  )
}

export const saveActionIntoQueue = (action) => {
  const currentTime = Date.now()
  db.actions.add({executionTime: currentTime, action}).then(null, (message) => console.log('saveActionIntoQueue failed: ', message))
}

export const loadActionsFromQueue = (timeInterval) => {
  return db.actions.where('executionTime').between(...timeInterval).toArray()
}