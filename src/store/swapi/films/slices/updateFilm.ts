import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { FilmCreateUpdate } from 'api/filmsApi';
import { filmsApiService } from 'api/films';
import { ResponseId, ResponseApiError } from 'types/response';

import { ReduxState } from 'store';

import {
  MergeRequestState,
  getInitialRequestState,
  getFetchedRequestState,
  getFetchingRequestState,
} from 'store/app/appUtils';

import { PREFIX } from '../prefix';

export interface UpdateFilmState
  extends MergeRequestState<ResponseId, ResponseApiError> {}

const selector = {
  state: (state: ReduxState) => state.swapi.updateFilm,
  isFetching: (state: ReduxState) => state.swapi.updateFilm.isFetching,
  data: (state: ReduxState) => state.swapi.updateFilm.data,
  error: (state: ReduxState) => state.swapi.updateFilm.error,
};

const initialState: UpdateFilmState = {
  ...getInitialRequestState(),
  error: null,
  data: null,
};

const SLICE_NAME = `${PREFIX}/updateFilm`;

const requestThunk = createAsyncThunk(
  `${SLICE_NAME}/request`,
  (
    {
      params,
      body,
    }: {
      params: { id: number };
      body: FilmCreateUpdate;
    },
    { rejectWithValue },
  ) => filmsApiService.updateFilm(params, body).catch(rejectWithValue),
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

interface UpdateFilm {
  action: typeof actions;
  thunk: {
    request: typeof requestThunk;
  };
  reducer: typeof reducer;
  selector: typeof selector;
}

export const updateFilm: UpdateFilm = {
  action: actions,
  thunk: {
    request: requestThunk,
  },
  reducer,
  selector,
};
