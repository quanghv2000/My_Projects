import {
  hostRoomCreateRequest,
  hostRoomCreateSuccess,
  hostRoomCreateFailure,
  checkRoomUniqueRequest,
  checkRoomUniqueSuccess,
  checkRoomUniqueFailure
} from 'app/pages/landlord/room-create-page/screen/action';
import { hostRoomCreateEnum } from 'app/pages/landlord/room-create-page/screen/types';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { apiMethod, requestAPIWithToken } from 'utils/request';
import { API_URL } from 'utils/config';
import { API_CALL } from 'utils/api';

/**
 * create room
 *
 * @param {Object} action
 *
 */

export function* createRoomSaga({
  payload,
}: ReturnType<typeof hostRoomCreateRequest>) {
  try {
    const response = yield call(
      requestAPIWithToken,
      `${API_URL}${API_CALL?.API_ROOM}`,
      apiMethod.POST,
      payload
    );

    yield put(hostRoomCreateSuccess(response?.data));
  } catch (error: any) {
    yield put(hostRoomCreateFailure(error?.response, error.message));
  }
}


/**
 * check room unique
 *
 * @param {Object} action
 *
 */

export function* checkoomUniqueSaga({
  payload,
}: ReturnType<typeof checkRoomUniqueRequest>) {
  try {
    const response = yield call(
      requestAPIWithToken,
      `${API_URL}${API_CALL?.API_CHECK_ROOM_UNIQUE}?idHouse=${payload?.houseId}&roomName=${payload?.name}`,
      apiMethod.POST,
      payload
    );

    yield put(checkRoomUniqueSuccess(response?.data));
  } catch (error: any) {
    yield put(checkRoomUniqueFailure(error?.response, error.message));
  }
}

export default function* root() {
  yield all([
    takeLatest(hostRoomCreateEnum.CREATE_ROOM_REQUEST, createRoomSaga),
    takeLatest(hostRoomCreateEnum.CHECK_ROOM_UNIQUE_REQUEST, checkoomUniqueSaga),
  ]);
}
