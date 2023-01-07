import {
  signUpFailure,
  signUpRequest,
  signUpSuccess,
  signUpWithGGRequest,
  signUpWithGGSuccess,
  signUpWithGGFailure,
} from 'app/pages/authentication/signup-page/screen/action';
import { authenticationSignUpEnum } from 'app/pages/authentication/signup-page/screen/types';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { requestAPI, apiMethod } from 'utils/request';
import { API_URL } from 'utils/config';
import { API_CALL } from 'utils/api';

/**
 * Sign up
 *
 * @param {Object} action
 *
 */

export function* signUpSaga({ payload }: ReturnType<typeof signUpRequest>) {
  try {
    const response = yield call(
      requestAPI,
      `${API_URL}${API_CALL?.API_SIGN_UP}`,
      apiMethod.POST,
      payload
    );
    yield put(signUpSuccess(response?.data));
  } catch (error: any) {
    yield put(signUpFailure(error?.response, error.message));
  }
}

/**
 * Sign up with google
 *
 * @param {Object} action
 *
 */

export function* signUpWithGoogleSaga({
  payload,
}: ReturnType<typeof signUpWithGGRequest>) {
  try {
    const response = yield call(
      requestAPI,
      `${API_URL}${API_CALL?.API_SIGN_UP_BY_GOOGLE}`,
      apiMethod.POST,
      payload
    );
    yield put(signUpWithGGSuccess(response?.data));
  } catch (error: any) {
    yield put(signUpWithGGFailure(error?.response, error.message));
  }
}

export default function* root() {
  yield all([
    takeLatest(authenticationSignUpEnum.SIGN_UP_REQUEST, signUpSaga),
    takeLatest(
      authenticationSignUpEnum.SIGN_UP_WITH_GG_REQUEST,
      signUpWithGoogleSaga
    ),
  ]);
}
