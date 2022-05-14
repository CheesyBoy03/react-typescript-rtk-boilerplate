import { TestState } from './slices';

export interface AppState {
  test: TestState;
}

export { appReducer, app } from './appReducer';
