import { HomePageReducerType } from './types';
import { categoriesInfo } from '../sample-data';
import { createReducer } from '@reduxjs/toolkit';

export const initialState: HomePageReducerType = {
  isLoading: false,
  error: false,
  categoriesInfo: categoriesInfo,
};

export const HomePageReducer = createReducer(initialState, {});
