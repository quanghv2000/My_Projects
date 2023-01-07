import {
  hostHouseGetRequest,
  hostHouseGetSuccess,
  hostHouseGetFailure,
  deleteHostHouseRequest,
  deleteHostHouseSuccess,
  deleteHostHouseFailure
} from 'app/pages/landlord/landlord-house-page/screen/action';
import { landlordPageEnum } from 'app/pages/landlord/landlord-house-page/screen/types';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { apiMethod, requestAPIWithToken } from 'utils/request';
import { API_URL } from 'utils/config';
import { API_CALL } from 'utils/api';

/**
 * gethouse
 *
 * @param {Object} action
 *
 */

export function* getHouseSaga({
  payload,
}: ReturnType<typeof hostHouseGetRequest>) {
  try {
    const response = yield call(
      requestAPIWithToken,
      `${API_URL}${API_CALL?.API_GET_HOUSE}/user/${payload}`,
      apiMethod.GET,
      ''
    );

    yield put(hostHouseGetSuccess(response?.data));
  } catch (error: any) {
    yield put(hostHouseGetFailure(error?.response, error.message));
  }
}


/**
 * delet house
 *
 * @param {Object} action
 *
 */

export function* deleteHouseSaga({
  payload,
}: ReturnType<typeof deleteHostHouseRequest>) {
  try {
    const url = `${API_URL}${API_CALL?.API_HOST_DELETE_HOUSE}`;

    const response = yield call(requestAPIWithToken, url, apiMethod.DELETE, payload);
    yield put(deleteHostHouseSuccess(response?.data));
  } catch (error: any) {
    yield put(deleteHostHouseFailure(error?.response, error.message));
  }
}

/**
 * GitHub Sagas
 */
export default function* root() {
  yield all([takeLatest(landlordPageEnum.GET_HOUSE_REQUEST, getHouseSaga),
  takeLatest(landlordPageEnum.DELETE_HOUSE_REQUEST, deleteHouseSaga)
  ]);
}
