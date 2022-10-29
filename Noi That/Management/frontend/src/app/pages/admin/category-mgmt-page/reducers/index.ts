import { createReducer } from '@reduxjs/toolkit';
import { CategoryMGMTPageReducerType } from './types';
import { getCategoriesReducer } from './get-categories';

export const initialState: CategoryMGMTPageReducerType = {
  isLoading: false,
  error: false,
  categoriesInfo: [],
};

export const CategoryMGMTPageReducer = createReducer(initialState, {
  ...getCategoriesReducer,
});
