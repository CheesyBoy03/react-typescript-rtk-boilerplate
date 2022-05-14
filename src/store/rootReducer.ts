import { combineReducers } from '@reduxjs/toolkit';

import { appReducer } from './app';
import { swapiReducer } from './swapi';

export const rootReducer = combineReducers({
  app: appReducer,
  swapi: swapiReducer,
});
