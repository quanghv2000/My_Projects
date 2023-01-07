import { createReducer } from '@reduxjs/toolkit';
import { hostRoomCreateEnum } from 'app/pages/landlord/room-create-page/screen/types';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  statusCreate: '',
  msg: '',
  disableBtnSubmit: false
};

export const hostRoomCreatePageReducer = createReducer(
  initialState,
  (builder) => {
    builder
      // create room
      .addCase(hostRoomCreateEnum.CREATE_ROOM_REQUEST, (state, action) => {
        state.statusCreate = '';
        state.msg = ''
        state.loading = true;
        return state;
      })
      .addCase(hostRoomCreateEnum.CREATE_ROOM_SUCCESS, (state, action: any) => {
        state.loading = false;
        state.statusCreate = 'created';
        return state;
      })
      .addCase(hostRoomCreateEnum.CREATE_ROOM_FAILURE, (state, action) => {
        state.statusCreate = '';
        state.loading = false;
        return state;
      })


      // check room unique
      .addCase(hostRoomCreateEnum.CHECK_ROOM_UNIQUE_REQUEST, (state, action) => {
        state.disableBtnSubmit = true;
        state.msg = ''
        return state;
      })
      .addCase(hostRoomCreateEnum.CHECK_ROOM_UNIQUE_SUCCESS, (state, action: any) => {
        state.disableBtnSubmit = false;
        return state;
      })
      .addCase(hostRoomCreateEnum.CHECK_ROOM_UNIQUE_FAILURE, (state, action: any) => {
        state.disableBtnSubmit = true;
        if (action?.payload?.data?.messageCode === 'ROOM_NAME_EXISTED') {
          state.msg = 'Tên phòng đã được đăng ký với nhà này !'
        }
        return state;
      })


      // loading 
      .addCase(hostRoomCreateEnum.LOADING_REQUEST, (state, action) => {
        state.loading = true;
        return state;
      })
      .addCase(hostRoomCreateEnum.LOADING_SUCCESS, (state, action: any) => {
        state.loading = false;
        return state;
      })
      .addCase(hostRoomCreateEnum.LOADING_FAILURE, (state, action) => {
        state.loading = false;
        return state;
      })
      .addCase(hostRoomCreateEnum.CLEAR_HOST_ROOM_CREATE_STATE, (state, action: any) => {
        state.statusCreate = '';
        state.msg = ''
        return state;
      });
  }
);
