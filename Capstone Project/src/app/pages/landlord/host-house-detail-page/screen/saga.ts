import {
  hostHouseGetDetailRequest,
  hostHouseGetDetailSuccess,
  hostHouseGetDetailFailure,
  hostHouseUpdateRequest,
  hostHouseUpdateSuccess,
  hostHouseUpdateFailure,
  hostHouseHistoryRequest,
  hostHouseHistorySuccess,
  hostHouseHistoryFailure
} from 'app/pages/landlord/host-house-detail-page/screen/action';
import { hostHouseDetailPageEnum } from 'app/pages/landlord/host-house-detail-page/screen/types';
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

export function* getHouseDetailSaga({
  payload,
}: ReturnType<typeof hostHouseGetDetailRequest>) {
  try {
    const response = yield call(
      requestAPIWithToken,
      `${API_URL}${API_CALL?.API_GET_HOUSE}/${payload}`,
      apiMethod.GET,
      ''
    );
    yield put(hostHouseGetDetailSuccess(response?.data));
  } catch (error: any) {
    yield put(hostHouseGetDetailFailure(error?.response, error.message));
  }
}

/**
 * update house
 *
 * @param {Object} action
 *
 */

export function* updateHouseDetailSaga({
  payload,
}: ReturnType<typeof hostHouseUpdateRequest>) {
  try {
    const response = yield call(
      requestAPIWithToken,
      `${API_URL}${API_CALL?.API_GET_HOUSE}`,
      apiMethod.PUT,
      payload
    );
    yield put(hostHouseUpdateSuccess(response?.data));
  } catch (error: any) {
    yield put(hostHouseUpdateFailure(error?.response, error.message));
  }
}


/**
 * gethouse history
 *
 * @param {Object} action
 *
 */

export function* getHouseHistorySaga({
  payload,
}: ReturnType<typeof hostHouseHistoryRequest>) {
  try {
    const response = yield call(
      requestAPIWithToken,
      `${API_URL}${API_CALL?.API_GET_HISTORY_HOUSE}`,
      apiMethod.POST,
      payload
    );
    yield put(hostHouseHistorySuccess(response?.data));
  } catch (error: any) {
    yield put(hostHouseHistoryFailure(error?.response, error.message));
  }
}

/**
 * house detail saga
 */
export default function* root() {
  yield all([
    takeLatest(
      hostHouseDetailPageEnum.GET_HOUSE_DETAIL_REQUEST,
      getHouseDetailSaga
    ),
    takeLatest(
      hostHouseDetailPageEnum.UPDATE_HOUSE_DETAIL_REQUEST,
      updateHouseDetailSaga
    ),
    takeLatest(
      hostHouseDetailPageEnum.GET_HOUSE_HISTORY_REQUEST,
      getHouseHistorySaga
    ),
  ]);
}
