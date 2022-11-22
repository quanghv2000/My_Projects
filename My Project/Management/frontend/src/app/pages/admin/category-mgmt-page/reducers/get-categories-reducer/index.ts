import { getCategoriesActionType } from '../../actions';
import { CategoryMGMTPageReducerType } from '../types';

export const getCategoriesReducer = {
  [getCategoriesActionType.GET_CATEGORIES_REQUEST]: (
    state: CategoryMGMTPageReducerType,
  ) => {
    state.isLoadingPage = true;

    return state;
  },
  [getCategoriesActionType.GET_CATEGORIES_SUCCESS]: (
    state: CategoryMGMTPageReducerType,
    action,
  ) => {
    const { payload } = action;

    state.isLoadingPage = false;
    state.categoriesInfo = payload;

    return state;
  },
  [getCategoriesActionType.GET_CATEGORIES_FAILURE]: (
    state: CategoryMGMTPageReducerType,
    action,
  ) => {
    const { payload } = action;
    state.isLoadingPage = false;
    state.error = payload;

    return state;
  },
};
