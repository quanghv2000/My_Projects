import { getCategoriesActionType } from '../../actions';

export const getCategoriesReducer = {
  [getCategoriesActionType.GET_CATEGORIES_REQUEST]: state => {
    state.isLoading = true;

    return state;
  },
  [getCategoriesActionType.GET_CATEGORIES_SUCCESS]: (state, action) => {
    const { payload } = action;

    state.isLoading = false;
    state.categoriesInfo = payload;

    return state;
  },
  [getCategoriesActionType.GET_CATEGORIES_FAILURE]: (state, action) => {
    const { payload } = action;
    state.isLoading = false;
    state.error = payload;

    return state;
  },
};
