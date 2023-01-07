import { createReducer } from '@reduxjs/toolkit';
import { hostHouseDetailPageEnum } from 'app/pages/landlord/host-house-detail-page/screen/types';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  statusUpdate: '',
  dataResponse: {},
  dataHistotyResponse: {},
};

export const houseDetailPageReducer = createReducer(initialState, (builder) => {
  builder

    // get detail
    .addCase(
      hostHouseDetailPageEnum.GET_HOUSE_DETAIL_REQUEST,
      (state, action) => {
        state.dataResponse = {};
        state.statusUpdate = '';
        state.loading = true;
        return state;
      }
    )
    .addCase(
      hostHouseDetailPageEnum.GET_HOUSE_DETAIL_SUCCESS,
      (state, action: any) => {
        state.loading = false;
        state.statusUpdate = '';
        state.dataResponse = action?.payload?.results;
        return state;
      }
    )
    .addCase(
      hostHouseDetailPageEnum.GET_HOUSE_DETAIL_FAILURE,
      (state, action) => {
        state.loading = false;
        return state;
      }
    )
    .addCase(
      hostHouseDetailPageEnum.UPDATE_HOUSE_DETAIL_REQUEST,
      (state, action) => {
        // state.dataResponse = {};
        state.statusUpdate = '';
        state.loading = true;
        return state;
      }
    )
    .addCase(
      hostHouseDetailPageEnum.UPDATE_HOUSE_DETAIL_SUCCESS,
      (state, action: any) => {
        state.loading = false;
        state.statusUpdate = 'update';
        return state;
      }
    )
    .addCase(
      hostHouseDetailPageEnum.UPDATE_HOUSE_DETAIL_FAILURE,
      (state, action) => {
        state.statusUpdate = '';
        state.loading = false;
        return state;
      }
    )

    // get history house
    .addCase(
      hostHouseDetailPageEnum.GET_HOUSE_HISTORY_REQUEST,
      (state, action) => {
        state.dataHistotyResponse = {};
        state.loading = true;
        return state;
      }
    )
    .addCase(
      hostHouseDetailPageEnum.GET_HOUSE_HISTORY_SUCCESS,
      (state, action: any) => {
        state.loading = false;
        let newArray: any = [];
        let count = 1;
        const newState: any = state.dataResponse;

        if (state.dataResponse) {
          newArray.push({
            description: 'Tạo nhà thành công',
            price: 0,
            startDate: newState?.createdDate,
            status: 'CREATED',
            index: count++,
          });
        }

        action?.payload?.results?.map((item: any) => {
          newArray.push({
            ...item,
            description: `Đăng tin gói ${item?.type}`,
            index: count++,
          });
        });
        state.dataHistotyResponse = newArray;
        return state;
      }
    )
    .addCase(
      hostHouseDetailPageEnum.GET_HOUSE_HISTORY_FAILURE,
      (state, action) => {
        state.loading = false;
        return state;
      }
    )

    .addCase(
      hostHouseDetailPageEnum.CLEAR_HOUSE_DETAIL_STATE,
      (state, action) => {
        state.statusUpdate = '';
        state.dataResponse = {};
        state.loading = false;
        return state;
      }
    );
});
