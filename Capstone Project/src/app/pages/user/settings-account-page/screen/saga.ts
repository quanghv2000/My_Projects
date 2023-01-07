import {
  changePasswordRequest,
  changePasswordSuccess,
  changePasswordFailure,
  updateRoleHostRequest,
  updateRoleHostSuccess,
  updateRoleHostFailure
} from 'app/pages/user/settings-account-page/screen/action';
import { settingAccountPageEnum } from 'app/pages/user/settings-account-page/screen/types';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { requestAPIWithToken, apiMethod } from 'utils/request';
import { API_URL } from 'utils/config';
import { API_CALL } from 'utils/api';

/**
 * Change password
 *
 * @param {Object} action
 *
 */

export function* changePasswordSaga({
  payload,
}: ReturnType<typeof changePasswordRequest>) {
  try {
    const response = yield call(
      requestAPIWithToken,
      `${API_URL}${API_CALL?.API_CHANGE_PASSWORD}`,
      apiMethod.POST,
      payload
    );
    yield put(changePasswordSuccess(response?.data));
  } catch (error: any) {
    yield put(changePasswordFailure(error?.response, error.message));
  }
}


/**
 * Update role host
 *
 * @param {Object} action
 *
 */

 export function* updateRoleHostSaga({
  payload,
}: ReturnType<typeof updateRoleHostRequest>) {
  try {
    const response = yield call(
      requestAPIWithToken,
      `${API_URL}${API_CALL?.API_UPDATE_ROLE_TO_HOST}`,
      apiMethod.PUT,
      payload
    );
    yield put(updateRoleHostSuccess(response?.data));
  } catch (error: any) {
    yield put(updateRoleHostFailure(error?.response, error.message));
  }
}

export default function* root() {
  yield all([
    takeLatest(
      settingAccountPageEnum.CHANGE_PASSWORD_REQUEST,
      changePasswordSaga
    ),
    takeLatest(
      settingAccountPageEnum.UPDATE_ROLE_REQUEST,
      updateRoleHostSaga
    ),
  ]);
}
