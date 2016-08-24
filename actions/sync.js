import { getIsFetching } from '../reducers'
import { middleware } from '../index'

const receivedData = (response) => ({
  type: 'SYNC_COMPLETED',
  response
});

const requestData = () => ({
  type: 'SYNC_REQUESTED'
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