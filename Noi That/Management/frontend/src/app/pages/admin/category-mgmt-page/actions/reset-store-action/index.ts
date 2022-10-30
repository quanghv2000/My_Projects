import { createAction } from '@reduxjs/toolkit';

export const resetCategoryMGMTStoreActionType = {
  RESET_CATEGORY_MGMT_STORE: 'RESET_CATEGORY_MGMT_STORE',
};

export const resetCategoryMGMTStoreAction = createAction(
  resetCategoryMGMTStoreActionType.RESET_CATEGORY_MGMT_STORE,
);
