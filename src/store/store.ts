import {
  configureStore,
  getDefaultMiddleware,
  Action,
  ThunkAction,
} from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { rootReducer } from './rootReducer';

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === 'development' ? true : false,
  middleware: [
    ...getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
      immutableCheck: false,
    }),
  ],
});

export type ReduxState = ReturnType<typeof rootReducer>;
export type AppThunk = ThunkAction<void, ReduxState, unknown, Action<string>>;

// Export a hook that can be reused to resolve types
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
