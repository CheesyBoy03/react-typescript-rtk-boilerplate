type PartialState = {
  [key: string]: any;
  isFetching: boolean;
  isFetched: boolean;
  error: any;
};

const getAggStatesFetching = (...states: PartialState[]): boolean => {
  return states.some(state => state.isFetching);
};

const getAggStatesFetched = (...states: PartialState[]): boolean => {
  return states.every(state => state.isFetched);
};

const getAggStatesError = (...states: PartialState[]): any => {
  return states.find(state => state.error)?.error;
};

/**
 * Aggregation function for parallel requests, for example: initial data for modal windows
 */
export const getAggState = (...states: PartialState[]) => {
  return {
    fetching: getAggStatesFetching(...states),
    fetched: getAggStatesFetched(...states),
    error: getAggStatesError(...states),
  };
};
