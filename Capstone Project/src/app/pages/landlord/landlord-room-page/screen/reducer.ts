import { createReducer } from '@reduxjs/toolkit';
import { hostRoomGetPageEnum } from 'app/pages/landlord/landlord-room-page/screen/types';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  dataResponse: {},
  msg: "",
  btnDeleteLoading: false
};

export const hostRoomListReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(hostRoomGetPageEnum.GET_ROOM_REQUEST, (state, action) => {
      state.dataResponse = {};
      state.loading = true;
      return state;
    })
    .addCase(hostRoomGetPageEnum.GET_ROOM_SUCCESS, (state, action: any) => {
      const newData: any = []
      state.loading = false;
      action?.payload?.results?.results.map((item: any) => {
        if (item?.enable === true) {
          newData.push(item)
        }
      })
      state.dataResponse = {
        ...action?.payload?.results,
        results: newData
      }
      return state;
    })
    .addCase(hostRoomGetPageEnum.GET_ROOM_FAILURE, (state, action) => {
      state.loading = false;
      return state;
    })


    // delete room

    .addCase(hostRoomGetPageEnum.DELETE_ROOM_REQUEST, (state, action) => {
      state.msg = '';
      state.btnDeleteLoading = true;
      return state;
    })
    .addCase(hostRoomGetPageEnum.DELETE_ROOM_SUCCESS, (state, action: any) => {
      state.btnDeleteLoading = false;
      state.msg = 'deleted';
      return state;
    })
    .addCase(hostRoomGetPageEnum.DELETE_ROOM_FAILURE, (state, action) => {
      state.btnDeleteLoading = false;
      state.msg = '';
      return state;
    })

    // clear state

    .addCase(hostRoomGetPageEnum.CLEAR_HOST_ROOM_STATE, (state, action: any) => {
      state.msg = '';
      state.dataResponse = {};
      return state;
    });
});
