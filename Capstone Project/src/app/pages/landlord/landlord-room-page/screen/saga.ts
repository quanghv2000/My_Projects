import {
  hostRoomGetRequest,
  hostRoomGetSuccess,
  hostRoomGetFailure,
  deleteHostRoomRequest,
  deleteHostRoomSuccess,
  deleteHostRoomFailure
} from 'app/pages/landlord/landlord-room-page/screen/action';
import { hostRoomGetPageEnum } from 'app/pages/landlord/landlord-room-page/screen/types';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { apiMethod, requestAPIWithToken } from 'utils/request';
import { API_URL } from 'utils/config';
import { API_CALL } from 'utils/api';

/**
 * get room
 *
 * @param {Object} action
 *
 */

export function* getRoomSaga({
  payload,
}: ReturnType<typeof hostRoomGetRequest>) {
  try {
    const url = `${API_URL}${API_CALL?.API_ROOM}/page?pageSize=${payload?.pageSize}&pageIndex=${payload?.pageIndex}&name=${payload?.name}`;

    const response = yield call(requestAPIWithToken, url, apiMethod.POST, {
      id: payload?.id,
    });
    yield put(hostRoomGetSuccess(response?.data));
  } catch (error: any) {
    yield put(hostRoomGetFailure(error?.response, error.message));
  }
}


/**
 * delete room
 *
 * @param {Object} action
 *
 */

 export function* deleteRoomSaga({
  payload,
}: ReturnType<typeof deleteHostRoomRequest>) {
  try {
    const url = `${API_URL}${API_CALL?.API_HOST_DELETE_ROOM}`;

    const response = yield call(requestAPIWithToken, url, apiMethod.DELETE, payload);
    yield put(deleteHostRoomSuccess(response?.data));
  } catch (error: any) {
    yield put(deleteHostRoomFailure(error?.response, error.message));
  }
}


/**
 *  Sagas
 */
export default function* root() {
  yield all([takeLatest(hostRoomGetPageEnum.GET_ROOM_REQUEST, getRoomSaga),
    takeLatest(hostRoomGetPageEnum.DELETE_ROOM_REQUEST, deleteRoomSaga)
  ]);
}
