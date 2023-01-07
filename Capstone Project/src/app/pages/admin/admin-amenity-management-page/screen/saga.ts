import {
  getDataAmenityFailure,
  getDataAmenityRequest,
  getDataAmenitySuccess,
  createDataAmenityRequest,
  createDataAmenitySuccess,
  createDataAmenityFailure,
  updateDataAmenityRequest,
  updateDataAmenitySuccess,
  updateDataAmenityFailure,
  deleteDataAmenityRequest,
  deleteDataAmenitySuccess,
  deleteDataAmenityFailure,
} from 'app/pages/admin/admin-amenity-management-page/screen/action';
import { adminPageAmenityEnum } from 'app/pages/admin/admin-amenity-management-page/screen/types';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { requestAPIWithToken, apiMethod } from 'utils/request';
import { API_URL } from 'utils/config';
import { API_CALL } from 'utils/api';

/**
 * Get Room Categories
 *
 * @param {Object} action
 *
 */
export function* getAmenitySaga({
  payload,
}: ReturnType<typeof getDataAmenityRequest>) {
  try {
    const response = yield call(
      requestAPIWithToken,
      `${API_URL}${API_CALL?.API_AMENITY}`,
      apiMethod.GET,
      payload
    );
    yield put(getDataAmenitySuccess(response?.data));
  } catch (error: any) {
    yield put(getDataAmenityFailure(error?.response, error.message));
  }
}

/**
 * Create Room Category
 *
 * @param {Object} action
 *
 */

export function* createAmenitySaga({
  payload,
}: ReturnType<typeof createDataAmenityRequest>) {
  try {
    const response = yield call(
      requestAPIWithToken,
      `${API_URL}${API_CALL?.API_AMENITY}`,
      apiMethod.POST,
      payload
    );
    yield put(createDataAmenitySuccess(response?.data));
  } catch (error: any) {
    yield put(createDataAmenityFailure(error?.response, error.message));
  }
}

/**
 * Update Room Category
 *
 * @param {Object} action
 *
 */

export function* updateAmenitySaga({
  payload,
}: ReturnType<typeof updateDataAmenityRequest>) {
  try {
    const response = yield call(
      requestAPIWithToken,
      `${API_URL}${API_CALL?.API_AMENITY}`,
      apiMethod.PUT,
      payload
    );
    yield put(updateDataAmenitySuccess(response?.data));
  } catch (error: any) {
    yield put(updateDataAmenityFailure(error?.response, error.message));
  }
}

/**
 * Delete Amenity
 *
 * @param {Object} action
 *
 */

export function* deleteAmenitySaga({
  payload,
}: ReturnType<typeof deleteDataAmenityRequest>) {
  try {
    const response = yield call(
      requestAPIWithToken,
      `${API_URL}${API_CALL?.API_AMENITY}`,
      apiMethod.DELETE,
      payload
    );
    yield put(deleteDataAmenitySuccess(response?.data));
  } catch (error: any) {
    yield put(deleteDataAmenityFailure(error?.response, error.message));
  }
}

/**
 * GitHub Sagas
 */
export default function* root() {
  yield all([
    takeLatest(adminPageAmenityEnum.GET_DATA_AMENITY_REQUEST, getAmenitySaga),
    takeLatest(
      adminPageAmenityEnum.CREATE_DATA_AMENITY_REQUEST,
      createAmenitySaga
    ),
    takeLatest(
      adminPageAmenityEnum.UPDATE_DATA_AMENITY_REQUEST,
      updateAmenitySaga
    ),
    takeLatest(
      adminPageAmenityEnum.DELETE_DATA_AMENITY_REQUEST,
      deleteAmenitySaga
    ),
  ]);
}
