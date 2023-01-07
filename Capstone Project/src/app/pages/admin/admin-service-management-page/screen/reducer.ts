import { createReducer } from '@reduxjs/toolkit';
import { hostRoomGetPageEnum } from 'app/pages/landlord/landlord-room-page/screen/types';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  dataResponse: {},
};

export const hostRoomListReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(hostRoomGetPageEnum.GET_ROOM_REQUEST, (state, action) => {
      state.dataResponse = {};
      state.loading = true;
      return state;
    })
    .addCase(hostRoomGetPageEnum.GET_ROOM_SUCCESS, (state, action: any) => {
      state.loading = false;
      state.dataResponse = action?.payload?.results;
      return state;
    })
    .addCase(hostRoomGetPageEnum.GET_ROOM_FAILURE, (state, action) => {
      state.loading = false;
      return state;
    });
});
