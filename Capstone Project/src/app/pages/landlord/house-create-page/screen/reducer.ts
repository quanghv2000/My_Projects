import { createReducer } from '@reduxjs/toolkit';
import { hostHouseCreateEnum } from 'app/pages/landlord/house-create-page/screen/types';

// The initial state of the App
export const initialState = {
  loading: false,
  dataResponseCity: {},
  dataResponseDistrict: {},
  dataResponseVillage: {},
  statusDelete: '',
  error: false,
  statusCreate: '',
  btnCreate: false,
  dataResponse: {},
};

export const hostHouseCreatePageReducer = createReducer(
  initialState,
  (builder) => {
    builder
      // get city
      .addCase(hostHouseCreateEnum.GET_ALL_CITY_REQUEST, (state, action) => {
        state.dataResponseCity = {};
        state.dataResponseDistrict = {};
        state.dataResponseVillage = {};
        state.statusCreate = '';
        return state;
      })
      .addCase(
        hostHouseCreateEnum.GET_ALL_CITY_SUCCESS,
        (state, action: any) => {
          state.loading = false;
          state.dataResponseCity = action?.payload?.results;
          return state;
        }
      )
      .addCase(hostHouseCreateEnum.GET_ALL_CITY_FAILURE, (state, action) => {
        state.loading = false;
        return state;
      })

      // get district
      .addCase(hostHouseCreateEnum.GET_DISTRICT_REQUEST, (state, action) => {
        state.dataResponseDistrict = {};
        state.dataResponseVillage = {};
        return state;
      })
      .addCase(
        hostHouseCreateEnum.GET_DISTRICT_SUCCESS,
        (state, action: any) => {
          state.loading = false;
          state.dataResponseDistrict = action?.payload?.results;
          return state;
        }
      )
      .addCase(hostHouseCreateEnum.GET_DISTRICT_FAILURE, (state, action) => {
        state.loading = false;
        return state;
      })

      // get village
      .addCase(hostHouseCreateEnum.GET_VILLAGE_REQUEST, (state, action) => {
        state.dataResponseVillage = {};
        return state;
      })
      .addCase(
        hostHouseCreateEnum.GET_VILLAGE_SUCCESS,
        (state, action: any) => {
          state.loading = false;
          state.dataResponseVillage = action?.payload?.results;
          return state;
        }
      )
      .addCase(hostHouseCreateEnum.GET_VILLAGE_FAILURE, (state, action) => {
        state.loading = false;
        return state;
      })

      // create house
      .addCase(hostHouseCreateEnum.CREATE_HOUSE_REQUEST, (state, action) => {
        state.statusCreate = '';
        state.btnCreate = true;
        return state;
      })
      .addCase(
        hostHouseCreateEnum.CREATE_HOUSE_SUCCESS,
        (state, action: any) => {
          state.btnCreate = false;
          state.statusCreate = 'created';
          return state;
        }
      )
      .addCase(hostHouseCreateEnum.CREATE_HOUSE_FAILURE, (state, action) => {
        state.btnCreate = false;
        return state;
      })

      .addCase(hostHouseCreateEnum.BTN_LOADING_STATE, (state, action) => {
        state.btnCreate = true;
        return state;
      })

      .addCase(hostHouseCreateEnum.HOST_HOUSE_CREATE_STATE, (state, action) => {
        state.loading = false
        state.dataResponseCity = {}
        state.dataResponseDistrict = {}
        state.dataResponseVillage = {}
        state.statusDelete = ''
        state.error = false
        state.statusCreate = ''
        state.btnCreate = false
        state.dataResponse = {}
        return state;
      });
  }
);
