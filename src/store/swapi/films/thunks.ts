import { swapi, AppThunk } from 'store';
import { toasts } from 'shared/components';
import { FilmCreateUpdate } from 'api/filmsApi';

export const getFilmsThunk = (): AppThunk => async (dispatch, getState) => {
  await dispatch(swapi.getFilms.thunk.request());

  const error = swapi.getFilms.selector.error(getState());

  if (error) {
    toasts.error(error.data?.message);
  }
};

export const getFilmThunk = (id: number): AppThunk => async (
  dispatch,
  getState,
) => {
  await dispatch(
    swapi.getFilm.thunk.request({
      params: { id },
    }),
  );

  const error = swapi.getFilm.selector.error(getState());

  if (error) {
    toasts.error(error.data?.message);
  }
};

export const createFilmThunk = (body: FilmCreateUpdate): AppThunk => async (
  dispatch,
  getState,
) => {
  await dispatch(
    swapi.createFilm.thunk.request({
      body,
    }),
  );

  const error = swapi.createFilm.selector.error(getState());

  if (error) {
    toasts.error(error.data?.message);
  } else {
    toasts.success('Film has been created');
  }
};

export const updateFilmThunk = (
  id: number,
  body: FilmCreateUpdate,
): AppThunk => async (dispatch, getState) => {
  await dispatch(
    swapi.updateFilm.thunk.request({
      params: { id },
      body,
    }),
  );

  const error = swapi.updateFilm.selector.error(getState());

  if (error) {
    toasts.error(error.data?.message);
  } else {
    toasts.success('Film has been updated');
  }
};

export const deleteFilmThunk = (id: number): AppThunk => async (
  dispatch,
  getState,
) => {
  await dispatch(
    swapi.deleteFilm.thunk.request({
      params: { id },
    }),
  );

  const error = swapi.deleteFilm.selector.error(getState());

  if (error) {
    toasts.error(error.data?.message);
  } else {
    toasts.success('Film has been deleted');
  }
};
