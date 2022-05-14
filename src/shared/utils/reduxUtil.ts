import { useSelector, shallowEqual } from 'react-redux';

export const useShallowEqualSelector = <State, Selected>(
  selector: (state: State) => Selected,
): Selected => useSelector(selector, shallowEqual);
