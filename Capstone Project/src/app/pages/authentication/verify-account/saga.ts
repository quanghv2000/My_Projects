import {
  verifyaAccountRequest,
  verifyaAccountSuccess,
  verifyaAccountFailure,
} from 'app/pages/authentication/verify-account/action';
import { authenticationVerifyAccountEnum } from 'app/pages/authentication/verify-account/types';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { requestAPI, apiMethod } from 'utils/request';
import { API_URL } from 'utils/config';
import { API_CALL } from 'utils/api';

/**
 * verifyAccount
 *
 * @param {Object} action
 *
 */

export function* verifyAccountSaga({
  payload,
}: ReturnType<typeof verifyaAccountRequest>) {
  try {
    const response = yield call(
      requestAPI,
      `${API_URL}${API_CALL?.API_VERIFY_ACCOUNT}?code=${payload?.code}`,
      apiMethod.PUT,
      ''
    );
    yield put(verifyaAccountSuccess(response?.data));
  } catch (error: any) {
    yield put(verifyaAccountFailure(error?.response, error.message));
  }
}

export default function* root() {
  yield all([
    takeLatest(
      authenticationVerifyAccountEnum.VERIFY_ACCOUNT_REQUEST,
      verifyAccountSaga
    ),
  ]);
}
