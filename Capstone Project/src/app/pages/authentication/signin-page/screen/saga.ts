import {
  signInFailure,
  signInRequest,
  signInSuccess,
  signInUserInformationRequest,
  signInUserInformationSuccess,
  signInUserInformationFailure,
  signInWithGGRequest,
  signInWithGGSuccess,
  signInWithGGFailure,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  resendEmailVerifyRequest,
  resendEmailVerifySuccess,
  resendEmailVerifyFailure
} from 'app/pages/authentication/signin-page/screen/action';
import { authenticationEnum } from 'app/pages/authentication/signin-page/screen/types';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { requestAPI, apiMethod, requestAPIWithToken } from 'utils/request';
import { API_URL } from 'utils/config';
import { API_CALL } from 'utils/api';
// import { setCookie } from 'utils/request';

/**
 * Sign in
 *
 * @param {Object} action
 *
 */

export function* signInSaga({ payload }: ReturnType<typeof signInRequest>) {
  try {
    const response = yield call(
      requestAPI,
      `${API_URL}${API_CALL?.API_SIGN_IN}`,
      apiMethod.POST,
      payload
    );
    yield put(signInSuccess(response?.data));
  } catch (error: any) {
    yield put(signInFailure(error?.response, error.message));
  }
}

/**
 * Sign in with GG
 *
 * @param {Object} action
 *
 */

export function* signInWithGGSaga({
  payload,
}: ReturnType<typeof signInWithGGRequest>) {
  try {
    const response = yield call(
      requestAPI,
      `${API_URL}${API_CALL?.API_SIGN_IN_BY_GOOGLE}`,
      apiMethod.POST,
      payload
    );
    yield put(signInWithGGSuccess(response?.data));
  } catch (error: any) {
    yield put(signInWithGGFailure(error?.response, error.message));
  }
}

/**
 * Sign in get user information
 *
 * @param {Object} action
 *
 */

export function* signInGetUserInformationSaga({
  payload,
}: ReturnType<typeof signInUserInformationRequest>) {
  try {
    const response = yield call(
      requestAPIWithToken,
      `${API_URL}${API_CALL?.API_GET_USER_INFOR}`,
      apiMethod.GET,
      payload
    );
    // setCookie('user-info', JSON.stringify(response?.data?.results), 3600);
    yield put(signInUserInformationSuccess(response?.data));
  } catch (error: any) {
    yield put(signInUserInformationFailure(error?.response, error.message));
  }
}

// forgot password

export function* forgotPasswordSaga({
  payload,
}: ReturnType<typeof forgotPasswordRequest>) {
  try {
    const response = yield call(
      requestAPI,
      `${API_URL}${API_CALL?.API_FORGOT_PASSWORD}?email=${payload}`,
      apiMethod.POST,
      ''
    );
    yield put(forgotPasswordSuccess(response?.data));
  } catch (error: any) {
    yield put(forgotPasswordFailure(error?.response, error.message));
  }
}



// resend email verify

export function* resendEmailVerifySaga({
  payload,
}: ReturnType<typeof resendEmailVerifyRequest>) {
  try {
    const response = yield call(
      requestAPI,
      `${API_URL}${API_CALL?.API_RESEND_EMAIL_VERIFY}?email=${payload}`,
      apiMethod.POST,
      ''
    );
    yield put(resendEmailVerifySuccess(response?.data));
  } catch (error: any) {
    yield put(resendEmailVerifyFailure(error?.response, error.message));
  }
}

export default function* root() {
  yield all([
    takeLatest(authenticationEnum.SIGN_IN_REQUEST, signInSaga),
    takeLatest(authenticationEnum.SIGN_IN_WITH_GG_REQUEST, signInWithGGSaga),
    takeLatest(
      authenticationEnum.SIGN_IN_GET_USER_INFOR_REQUEST,
      signInGetUserInformationSaga
    ),
    takeLatest(authenticationEnum.FORGOT_PASSWORD_REQUEST, forgotPasswordSaga),
    takeLatest(authenticationEnum.RESEND_EMAIL_VERIFY_REQUEST, resendEmailVerifySaga),
  ]);
}
