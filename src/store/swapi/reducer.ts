import { combineReducers } from '@reduxjs/toolkit';

import {
  createFilm,
  deleteFilm,
  getFilm,
  getFilms,
  updateFilm,
} from './films/slices';

export const swapiReducer = combineReducers({
  createFilm: createFilm.reducer,
  deleteFilm: deleteFilm.reducer,
  getFilm: getFilm.reducer,
  getFilms: getFilms.reducer,
  updateFilm: updateFilm.reducer,
});

export const swapi = {
  createFilm,
  deleteFilm,
  getFilm,
  getFilms,
  updateFilm,
};
