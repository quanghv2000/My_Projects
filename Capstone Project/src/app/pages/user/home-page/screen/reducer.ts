import { createReducer } from '@reduxjs/toolkit';
import { homePageEnum } from 'app/pages/user/home-page/screen/types';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  dataResponse: {},
};

export const homePageReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(homePageEnum.LOAD_DATA_REQUEST, (state, action) => {
      state.dataResponse = {};
      state.loading = true;
      return state;
    })
    .addCase(homePageEnum.LOAD_DATA_SUCCESS, (state, action: any) => {
      state.loading = false;
      state.dataResponse = action?.payload;
      return state;
    })
    .addCase(homePageEnum.LOAD_DATA_FAILURE, (state, action) => {
      state.loading = false;
      return state;
    });
});
