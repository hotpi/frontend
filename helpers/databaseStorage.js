import { db } from '../index';

export const loadState = () => {
  return db.state.where('id').equals(1).first().then(
    (state) => state.state,
    (message) => {
      throw new Error('loadState failed: ', message);
    }
  );
};

export const saveState = (state) => {
  db.state.put({ id: 1, state }).then(
    null,
    (message) => {
      throw new Error('saveState failed: ', message);
    }
  );
};

export const saveOperationIntoQueue = (action) => {
  const currentTime = Date.now();
  db.actions.add({ executionTime: currentTime, action }).then(
    null,
    (message) => {
      throw new Error('saveOperationIntoQueue failed: ', message);
    }
  );
};

export const loadOperationsFromQueue = (timeInterval) => {
  return db.actions.where('executionTime').between(...timeInterval).toArray();
};
