import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { allActions, RootState } from '../store';
import { bindActionCreators } from 'redux';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(allActions, dispatch);
};
