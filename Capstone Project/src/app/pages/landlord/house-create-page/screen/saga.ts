import {
  hostHouseGetCityRequest,
  hostHouseGetCitySuccess,
  hostHouseGetCityFailure,
  hostHouseGetDistrictRequest,
  hostHouseGetDistrictSuccess,
  hostHouseGetDistrictFailure,
  hostHouseGetVillageRequest,
  hostHouseGetVillageSuccess,
  hostHouseGetVillageFailure,
  hostHouseCreateRequest,
  hostHouseCreateSuccess,
  hostHouseCreateFailure,
} from 'app/pages/landlord/house-create-page/screen/action';
import { hostHouseCreateEnum } from 'app/pages/landlord/house-create-page/screen/types';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { apiMethod, requestAPIWithToken } from 'utils/request';
import { API_URL } from 'utils/config';
import { API_CALL } from 'utils/api';

/**
 * get city
 *
 * @param {Object} action
 *
 */

export function* getAllCitySaga({
  payload,
}: ReturnType<typeof hostHouseGetCityRequest>) {
  try {
    const response = yield call(
      requestAPIWithToken,
      `${API_URL}${API_CALL?.API_GET_CITY}`,
      apiMethod.GET,
      payload
    );

    yield put(hostHouseGetCitySuccess(response?.data));
  } catch (error: any) {
    yield put(hostHouseGetCityFailure(error?.response, error.message));
  }
}

/**
 * get district
 *
 * @param {Object} action
 *
 */

export function* getDistrictSaga({
  payload,
}: ReturnType<typeof hostHouseGetDistrictRequest>) {
  try {
    const response = yield call(
      requestAPIWithToken,
      `${API_URL}${API_CALL?.API_GET_DISTRICT}/${payload}`,
      apiMethod.GET,
      ''
    );

    yield put(hostHouseGetDistrictSuccess(response?.data));
  } catch (error: any) {
    yield put(hostHouseGetDistrictFailure(error?.response, error.message));
  }
}

/**
 * get village
 *
 * @param {Object} action
 *
 */

export function* getVillageSaga({
  payload,
}: ReturnType<typeof hostHouseGetVillageRequest>) {
  try {
    const response = yield call(
      requestAPIWithToken,
      `${API_URL}${API_CALL?.API_GET_VILLAGE}/${payload}`,
      apiMethod.GET,
      ''
    );

    yield put(hostHouseGetVillageSuccess(response?.data));
  } catch (error: any) {
    yield put(hostHouseGetVillageFailure(error?.response, error.message));
  }
}

/**
 * create house
 *
 * @param {Object} action
 *
 */

export function* createHouseSaga({
  payload,
}: ReturnType<typeof hostHouseCreateRequest>) {
  try {
    const response = yield call(
      requestAPIWithToken,
      `${API_URL}${API_CALL?.API_CREATE_HOUSE}`,
      apiMethod.POST,
      payload
    );

    yield put(hostHouseCreateSuccess(response?.data));
  } catch (error: any) {
    yield put(hostHouseCreateFailure(error?.response, error.message));
  }
}

export default function* root() {
  yield all([
    takeLatest(hostHouseCreateEnum.GET_ALL_CITY_REQUEST, getAllCitySaga),
    takeLatest(hostHouseCreateEnum.GET_DISTRICT_REQUEST, getDistrictSaga),
    takeLatest(hostHouseCreateEnum.GET_VILLAGE_REQUEST, getVillageSaga),
    takeLatest(hostHouseCreateEnum.CREATE_HOUSE_REQUEST, createHouseSaga),
  ]);
}
