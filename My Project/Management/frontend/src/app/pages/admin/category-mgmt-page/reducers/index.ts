import { createReducer } from '@reduxjs/toolkit';
import { CategoryMGMTPageReducerType } from './types';
import { getCategoriesReducer } from './get-categories-reducer';
import { resetStoreReducer } from './reset-store-reducer';

export const initialState: CategoryMGMTPageReducerType = {
  isLoadingPage: false,
  error: false,
  categoriesInfo: [],
};

export const CategoryMGMTPageReducer = createReducer(initialState, {
  ...getCategoriesReducer,
  ...resetStoreReducer,
});
