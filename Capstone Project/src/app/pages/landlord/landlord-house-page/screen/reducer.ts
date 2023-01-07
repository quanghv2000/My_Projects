import { createReducer } from '@reduxjs/toolkit';
import { landlordPageEnum } from 'app/pages/landlord/landlord-house-page/screen/types';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  dataResponse: {},
  msg: "",
  btnDeleteLoading: false
};

export const houseListPageReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(landlordPageEnum.GET_HOUSE_REQUEST, (state, action) => {
      state.dataResponse = {};
      state.loading = true;
      return state;
    })
    .addCase(landlordPageEnum.GET_HOUSE_SUCCESS, (state, action: any) => {
      const newData: any = []
      state.loading = false;
      action?.payload?.results?.map((item: any) => {
        if (item?.enable === true) {
          newData.push(item)
        }
      })
      state.dataResponse = newData
      return state;
    })
    .addCase(landlordPageEnum.GET_HOUSE_FAILURE, (state, action) => {
      state.loading = false;
      return state;
    })


    // delete room

    .addCase(landlordPageEnum.DELETE_HOUSE_REQUEST, (state, action) => {
      state.msg = '';
      state.btnDeleteLoading = true;
      return state;
    })
    .addCase(landlordPageEnum.DELETE_HOUSE_SUCCESS, (state, action: any) => {
      state.btnDeleteLoading = false;
      state.msg = 'deleted';
      return state;
    })
    .addCase(landlordPageEnum.DELETE_HOUSE_FAILURE, (state, action) => {
      state.btnDeleteLoading = false;
      state.msg = '';
      return state;
    })

    // clear state

    .addCase(landlordPageEnum.CLEAR_HOST_HOUSE_STATE, (state, action: any) => {
      state.msg = '';
      state.dataResponse = {};
      return state;
    });
});
