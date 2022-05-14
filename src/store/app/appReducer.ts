import { combineReducers } from '@reduxjs/toolkit';
import { test } from './slices';

export const appReducer = combineReducers({
  test: test.reducer,
});

export const app = {
  test,
};
