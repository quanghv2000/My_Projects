import { initialState } from '..';
import { resetCategoryMGMTStoreActionType } from '../../actions/reset-store-action';
import { CategoryMGMTPageReducerType } from '../types';

export const resetStoreReducer = {
  [resetCategoryMGMTStoreActionType.RESET_CATEGORY_MGMT_STORE]: (
    state: CategoryMGMTPageReducerType,
  ) => {
    state = initialState;

    return state;
  },
};
