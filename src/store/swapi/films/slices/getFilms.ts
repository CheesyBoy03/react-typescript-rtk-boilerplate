import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Film } from 'api/filmsApi';
import { filmsApiService } from 'api/films';
import { ResponseDataWithPagination, ResponseApiError } from 'types/response';

import { ReduxState } from 'store';

import {
  MergeRequestState,
  getInitialRequestState,
  getFetchedRequestState,
  getFetchingRequestState,
} from 'store/app/appUtils';

import { PREFIX } from '../prefix';

export interface GetFilmsState
  extends MergeRequestState<
    ResponseDataWithPagination<Film[]>,
    ResponseApiError
  > {}

const selector = {
  state: (state: ReduxState) => state.swapi.getFilms,
  isFetching: (state: ReduxState) => state.swapi.getFilms.isFetching,
  data: (state: ReduxState) => state.swapi.getFilms.data,
  error: (state: ReduxState) => state.swapi.getFilms.error,
};

const initialState: GetFilmsState = {
  ...getInitialRequestState(),
  error: null,
  data: null,
};

const SLICE_NAME = `${PREFIX}/getFilms`;

const requestThunk = createAsyncThunk(
  `${SLICE_NAME}/request`,
  (_, { rejectWithValue }) => filmsApiService.getFilms().catch(rejectWithValue),
  {
    condition: (payload, { getState }) =>
      !selector.isFetching(getState() as ReduxState),
  },
);

const { actions, reducer } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    reset() {
      return initialState;
    },
  },

  extraReducers: builder => {
    builder.addCase(requestThunk.pending, state => {
      Object.assign(state, getFetchingRequestState());
    });
    builder.addCase(requestThunk.fulfilled, (state, action) => {
      Object.assign(state, getFetchedRequestState());
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(requestThunk.rejected, (state, action) => {
      Object.assign(state, initialState);
      state.error = action.payload as ResponseApiError;
    });
  },
});

interface GetFilms {
  action: typeof actions;
  thunk: {
    request: typeof requestThunk;
  };
  reducer: typeof reducer;
  selector: typeof selector;
}

export const getFilms: GetFilms = {
  action: actions,
  thunk: {
    request: requestThunk,
  },
  reducer,
  selector,
};
