import { getIsFetching } from '../reducers'
import { middleware } from '../index'

export const SYNC_COMPLETED = 'SYNC_COMPLETED';
const receivedData = (response) => ({
  type: SYNC_COMPLETED,
  response
});

export const SYNC_REQUESTED = 'SYNC_REQUESTED';
const requestData = () => ({
  type: SYNC_REQUESTED
})

export const fetchData = () => (dispatch, getState) => {
  if (getIsFetching(getState())) {
    return Promise.resolve();
  }

  dispatch(requestData())

  middleware.fetchState().then(response => {
      dispatch(receivedData(response))
  })
};