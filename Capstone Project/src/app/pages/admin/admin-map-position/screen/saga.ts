import {
  getMapPositonFailure,
  getMapPositonRequest,
  getMapPositonSuccess,
  createMapPositonRequest,
  createMapPositonSuccess,
  createMapPositonFailure,
  updateMapPositonRequest,
  updateMapPositonSuccess,
  updateMapPositonFailure,
  deleteMapPositonRequest,
  deleteMapPositonSuccess,
  deleteMapPositonFailure,
} from 'app/pages/admin/admin-map-position/screen/action'
import { adminMapPositonEnum } from 'app/pages/admin/admin-map-position/screen/types';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { requestAPIWithToken, apiMethod } from 'utils/request';
import { API_URL } from 'utils/config';
import { API_CALL } from 'utils/api';

/**
 * Get MapPositon
 *
 * @param {Object} action
 *
 */
export function* getMapPositonSaga({
  payload,
}: ReturnType<typeof getMapPositonRequest>) {
  try {
    const response = yield call(
      requestAPIWithToken,
      `${API_URL}${API_CALL?.API_MAP_POSITON}`,
      apiMethod.GET,
      payload
    );
    yield put(getMapPositonSuccess(response?.data));
  } catch (error: any) {
    yield put(getMapPositonFailure(error?.response, error.message));
  }
}

/**
 * Create RMapPositon
 *
 * @param {Object} action
 *
 */

export function* createMapPositonSaga({
  payload,
}: ReturnType<typeof createMapPositonRequest>) {
  try {
    const response = yield call(
      requestAPIWithToken,
      `${API_URL}${API_CALL?.API_MAP_POSITON}`,
      apiMethod.POST,
      payload
    );
    yield put(createMapPositonSuccess(response?.data));
  } catch (error: any) {
    yield put(createMapPositonFailure(error?.response, error.message));
  }
}

/**
 * Update MapPositon
 *
 * @param {Object} action
 *
 */

export function* updateMapPositonSaga({
  payload,
}: ReturnType<typeof updateMapPositonRequest>) {
  try {
    const response = yield call(
      requestAPIWithToken,
      `${API_URL}${API_CALL?.API_MAP_POSITON}`,
      apiMethod.PUT,
      payload
    );
    yield put(updateMapPositonSuccess(response?.data));
  } catch (error: any) {
    yield put(updateMapPositonFailure(error?.response, error.message));
  }
}

/**
 * Delete MapPositon
 *
 * @param {Object} action
 *
 */

export function* deleteMapPositonSaga({
  payload,
}: ReturnType<typeof deleteMapPositonRequest>) {
  try {
    const response = yield call(
      requestAPIWithToken,
      `${API_URL}${API_CALL?.API_MAP_POSITON}/delete-by-list-id`,
      apiMethod.DELETE,
      payload
    );
    yield put(deleteMapPositonSuccess(response?.data));
  } catch (error: any) {
    yield put(deleteMapPositonFailure(error?.response, error.message));
  }
}

/**
 * GitHub Sagas
 */
export default function* root() {
  yield all([
    takeLatest(
      adminMapPositonEnum.GET_MAP_POSITON_REQUEST,
      getMapPositonSaga
    ),
    takeLatest(
      adminMapPositonEnum.CREATE_MAP_POSITON_REQUEST,
      createMapPositonSaga
    ),
    takeLatest(
      adminMapPositonEnum.UPDATE_MAP_POSITON_REQUEST,
      updateMapPositonSaga
    ),
    takeLatest(
      adminMapPositonEnum.DELETE_MAP_POSITON_REQUEST,
      deleteMapPositonSaga
    ),
  ]);
}
