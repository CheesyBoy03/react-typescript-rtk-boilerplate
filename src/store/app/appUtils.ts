export interface RequestState {
  isFetching: boolean;
  isFetched: boolean;
  fetchedTime: null | number;
}

export interface MergeRequestState<D, E> extends RequestState {
  data: null | D;
  error: null | E;
}

export const getFetchingRequestState = (): Pick<
  RequestState,
  'isFetching'
> => ({
  isFetching: true,
});

export const getInitialRequestState = (): RequestState => ({
  isFetching: false,
  isFetched: false,
  fetchedTime: null,
});

export const getFetchedRequestState = (): RequestState => ({
  isFetching: false,
  isFetched: true,
  fetchedTime: Date.now(),
});
