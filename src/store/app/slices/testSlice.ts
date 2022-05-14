import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReduxState } from 'store';

export interface TestState {
  isMenuOpen: boolean;
}

// EXAMPLE

const SLICE_NAME = '@app/test';

const selector = {
  state: (state: ReduxState) => state.app.test,
};

const initialState: TestState = {
  isMenuOpen: false,
};

const { actions, reducer } = createSlice({
  name: SLICE_NAME,
  initialState,

  reducers: {
    reset() {
      return initialState;
    },
    setMenu(state, action: PayloadAction<boolean>) {
      return { ...state, isMenuOpen: action.payload };
    },
  },
});

interface AppTest {
  action: typeof actions;
  thunk: {};
  reducer: typeof reducer;
  selector: typeof selector;
}

export const test: AppTest = {
  action: actions,
  thunk: {},
  reducer,
  selector,
};
