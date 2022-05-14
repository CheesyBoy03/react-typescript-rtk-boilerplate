import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Film } from 'api/filmsApi';
import { filmsApiService } from 'api/films';
import { ResponseApiError } from 'types/response';

import { ReduxState } from 'store';

import {
  MergeRequestState,
  getInitialRequestState,
  getFetchedRequestState,
  getFetchingRequestState,
} from 'store/app/appUtils';

import { PREFIX } from '../prefix';

export interface GetFilmState
  extends MergeRequestState<Film, ResponseApiError> {}

const selector = {
  state: (state: ReduxState) => state.swapi.getFilm,
  isFetching: (state: ReduxState) => state.swapi.getFilm.isFetching,
  data: (state: ReduxState) => state.swapi.getFilm.data,
  error: (state: ReduxState) => state.swapi.getFilm.error,
};

const initialState: GetFilmState = {
  ...getInitialRequestState(),
  error: null,
  data: null,
};

const SLICE_NAME = `${PREFIX}/getFilm`;

const requestThunk = createAsyncThunk(
  `${SLICE_NAME}/request`,
  (
    {
      params,
    }: {
      params: { id: number };
    },
    { rejectWithValue },
  ) => filmsApiService.getFilm(params).catch(rejectWithValue),
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

interface GetFilm {
  action: typeof actions;
  thunk: {
    request: typeof requestThunk;
  };
  reducer: typeof reducer;
  selector: typeof selector;
}

export const getFilm: GetFilm = {
  action: actions,
  thunk: {
    request: requestThunk,
  },
  reducer,
  selector,
};
