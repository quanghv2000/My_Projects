import { createReducer } from '@reduxjs/toolkit';
import { roomTenantPageEnum } from 'app/pages/landlord/room-tenants-page/screen/types';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  dataResponse: {},
};

export const roomTenantReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(roomTenantPageEnum.LOAD_DATA_CUSTOMER_REQUEST, (state, action) => {
      state.dataResponse = {};
      state.loading = true;
      return state;
    })
    .addCase(
      roomTenantPageEnum.LOAD_DATA_CUSTOMER_SUCCESS,
      (state, action: any) => {
        state.loading = false;
        state.dataResponse = action?.payload;
        return state;
      }
    )
    .addCase(roomTenantPageEnum.LOAD_DATA_CUSTOMER_FAILURE, (state, action) => {
      state.loading = false;
      return state;
    });
});
