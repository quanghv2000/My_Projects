import {
  getDataRoomTypeFailure,
  getDataRoomTypeRequest,
  getDataRoomTypeSuccess,
  createDataRoomTypeRequest,
  createDataRoomTypeSuccess,
  createDataRoomTypeFailure,
  updateDataRoomTypeRequest,
  updateDataRoomTypeSuccess,
  updateDataRoomTypeFailure,
  deleteDataRoomTypeRequest,
  deleteDataRoomTypeSuccess,
  deleteDataRoomTypeFailure,
} from 'app/pages/admin/admin-room-type-management-page/screen/action';
import { adminPageRoomTypeEnum } from 'app/pages/admin/admin-room-type-management-page/screen/types';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { requestAPIWithToken, apiMethod } from 'utils/request';
import { API_URL } from 'utils/config';
import { API_CALL } from 'utils/api';

/**
 * Get Room Type
 *
 * @param {Object} action
 *
 */
export function* getRoomTypeSaga({
  payload,
}: ReturnType<typeof getDataRoomTypeRequest>) {
  try {
    const response = yield call(
      requestAPIWithToken,
      `${API_URL}${API_CALL?.API_ROOM_TYPE}`,
      apiMethod.GET,
      payload
    );
    yield put(getDataRoomTypeSuccess(response?.data));
  } catch (error: any) {
    yield put(getDataRoomTypeFailure(error?.response, error.message));
  }
}

/**
 * Create Room Type
 *
 * @param {Object} action
 *
 */

export function* createRoomTypeSaga({
  payload,
}: ReturnType<typeof createDataRoomTypeRequest>) {
  try {
    const response = yield call(
      requestAPIWithToken,
      `${API_URL}${API_CALL?.API_ROOM_TYPE}`,
      apiMethod.POST,
      payload
    );
    yield put(createDataRoomTypeSuccess(response?.data));
  } catch (error: any) {
    yield put(createDataRoomTypeFailure(error?.response, error.message));
  }
}

/**
 * Update Room Category
 *
 * @param {Object} action
 *
 */

export function* updateRoomTypeSaga({
  payload,
}: ReturnType<typeof updateDataRoomTypeRequest>) {
  try {
    const response = yield call(
      requestAPIWithToken,
      `${API_URL}${API_CALL?.API_ROOM_TYPE}`,
      apiMethod.PUT,
      payload
    );
    yield put(updateDataRoomTypeSuccess(response?.data));
  } catch (error: any) {
    yield put(updateDataRoomTypeFailure(error?.response, error.message));
  }
}

/**
 * Delete RoomType
 *
 * @param {Object} action
 *
 */

export function* deleteRoomTypeSaga({
  payload,
}: ReturnType<typeof deleteDataRoomTypeRequest>) {
  try {
    const response = yield call(
      requestAPIWithToken,
      `${API_URL}${API_CALL?.API_ROOM_TYPE}`,
      apiMethod.DELETE,
      payload
    );
    yield put(deleteDataRoomTypeSuccess(response?.data));
  } catch (error: any) {
    yield put(deleteDataRoomTypeFailure(error?.response, error.message));
  }
}

/**
 * GitHub Sagas
 */
export default function* root() {
  yield all([
    takeLatest(
      adminPageRoomTypeEnum.GET_DATA_ROOM_TYPE_REQUEST,
      getRoomTypeSaga
    ),
    takeLatest(
      adminPageRoomTypeEnum.CREATE_DATA_ROOM_TYPE_REQUEST,
      createRoomTypeSaga
    ),
    takeLatest(
      adminPageRoomTypeEnum.UPDATE_DATA_ROOM_TYPE_REQUEST,
      updateRoomTypeSaga
    ),
    takeLatest(
      adminPageRoomTypeEnum.DELETE_DATA_ROOM_TYPE_REQUEST,
      deleteRoomTypeSaga
    ),
  ]);
}
