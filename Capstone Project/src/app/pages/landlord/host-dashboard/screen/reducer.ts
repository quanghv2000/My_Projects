import { createReducer } from '@reduxjs/toolkit';
import { hostDashboardPageEnum } from 'app/pages/landlord/host-dashboard/screen/types';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  dataResponse: {},
  loadingData: false,
  dataResponseYear: {},

};

export const hostDashboardPageReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(hostDashboardPageEnum.HOST_DASHBOARD_REQUEST, (state, action) => {
      state.dataResponse = {};
      state.loading = true;
      return state;
    })
    .addCase(hostDashboardPageEnum.HOST_DASHBOARD_SUCCESS, (state, action: any) => {
      state.loading = false;
      state.dataResponse = action?.payload?.results;
      return state;
    })
    .addCase(hostDashboardPageEnum.HOST_DASHBOARD_FAILURE, (state, action) => {
      state.loading = false;
      return state;
    })
    // get year data 

    .addCase(hostDashboardPageEnum.HOST_DASHBOARD_DATA_REQUEST, (state, action) => {
      state.loadingData = true;
      state.dataResponseYear = {};
      return state;
    })
    .addCase(hostDashboardPageEnum.HOST_DASHBOARD_DATA_SUCCESS, (state, action: any) => {
      state.loadingData = false;
      state.dataResponseYear = action?.payload?.results;
      return state;
    })
    .addCase(hostDashboardPageEnum.HOST_DASHBOARD_DATA_FAILURE, (state, action) => {
      state.loadingData = false;
      return state;
    });
});
