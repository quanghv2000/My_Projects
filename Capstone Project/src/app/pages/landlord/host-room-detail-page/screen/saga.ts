import {
  hostRoomDetailGetRequest,
  hostRoomDetailGetSuccess,
  hostRoomDetailGetFailure,
  hostRoomDetailUpdateRequest,
  hostRoomDetailUpdateSuccess,
  hostRoomDetailUpdateFailure
} from 'app/pages/landlord/host-room-detail-page/screen/action';
import { hostRoomDetailGetPageEnum } from 'app/pages/landlord/host-room-detail-page/screen/types';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { apiMethod, requestAPIWithToken } from 'utils/request';
import { API_URL } from 'utils/config';
import { API_CALL } from 'utils/api';

/**
 * get detail room
 *
 * @param {Object} action
 *
 */

export function* getRoomDetailSaga({
  payload,
}: ReturnType<typeof hostRoomDetailGetRequest>) {
  try {
    const url = `${API_URL}${API_CALL?.API_ROOM}/${payload}`;

    const response = yield call(requestAPIWithToken, url, apiMethod.GET, '');
    yield put(hostRoomDetailGetSuccess(response?.data));
  } catch (error: any) {
    yield put(hostRoomDetailGetFailure(error?.response, error.message));
  }
}


/**
 * update room
 *
 * @param {Object} action
 *
 */

export function* updateRoomSaga({
  payload,
}: ReturnType<typeof hostRoomDetailUpdateRequest>) {
  try {
    const response = yield call(
      requestAPIWithToken,
      `${API_URL}${API_CALL?.API_ROOM}`,
      apiMethod.PUT,
      payload
    );

    yield put(hostRoomDetailUpdateSuccess(response?.data));
  } catch (error: any) {
    yield put(hostRoomDetailUpdateFailure(error?.response, error.message));
  }
}

/**
 *  Sagas
 */
export default function* root() {
  yield all([
    takeLatest(
      hostRoomDetailGetPageEnum.GET_ROOM_DETAIL_REQUEST,
      getRoomDetailSaga
    ),
    takeLatest(
      hostRoomDetailGetPageEnum.UPDATE_ROOM_DETAIL_REQUEST,
      updateRoomSaga
    ),
  ]);
}
