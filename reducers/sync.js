const sync = (state = {
  version: 1,
  stateStatus: 'synced',
  isLoading: false,
}, action) => {
  switch (action.type) {
    case 'SYNC_REQUESTED':
      return {
        ...state,
        isLoading: true,
      };
    case 'SYNC_COMPLETED':
      return {
        ...state,
        isLoading: false,
        version: +state.version + 1
      };
    default:
      return state;
  }
}

export default sync;

export const getIsFetching = (state) => state.isLoading;
export const getIsSynced = (state) => state.stateStatus