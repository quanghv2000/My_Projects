import { createReducer } from '@reduxjs/toolkit';
import { hostRoomDetailGetPageEnum } from 'app/pages/landlord/host-room-detail-page/screen/types';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  dataResponse: {},
  statusUpdate: "",
  btnUpdateLoading: false,
};

export const hostRoomDetailReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(
      hostRoomDetailGetPageEnum.GET_ROOM_DETAIL_REQUEST,
      (state, action) => {
        state.dataResponse = {};
        state.loading = true;
        return state;
      }
    )
    .addCase(
      hostRoomDetailGetPageEnum.GET_ROOM_DETAIL_SUCCESS,
      (state, action: any) => {
        state.loading = false;
        state.dataResponse = action?.payload?.results;
        return state;
      }
    )
    .addCase(
      hostRoomDetailGetPageEnum.GET_ROOM_DETAIL_FAILURE,
      (state, action) => {
        state.loading = false;
        return state;
      }
    )

    // update room 


    .addCase(
      hostRoomDetailGetPageEnum.UPDATE_ROOM_DETAIL_REQUEST,
      (state, action) => {
        state.btnUpdateLoading = true;
        state.statusUpdate = ''
        return state;
      }
    )
    .addCase(
      hostRoomDetailGetPageEnum.UPDATE_ROOM_DETAIL_SUCCESS,
      (state, action: any) => {
        state.btnUpdateLoading = false;
        state.statusUpdate = 'updated';
        return state;
      }
    )
    .addCase(
      hostRoomDetailGetPageEnum.UPDATE_ROOM_DETAIL_FAILURE,
      (state, action) => {
        state.statusUpdate = ''
        state.btnUpdateLoading = false;
        return state;
      }
    )

    // set loading button update

    .addCase(hostRoomDetailGetPageEnum.SET_LOADING_BTN_UPDATE, (state, action: any) => {
      state.btnUpdateLoading = true;
      return state;
    })

    // clear state

    .addCase(hostRoomDetailGetPageEnum.CLEAR_STATE, (state, action: any) => {
      state.loading = false;
      state.statusUpdate = ''
      state.dataResponse = {};
      return state;
    });
});
