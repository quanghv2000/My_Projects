import {
  getDataAccountFailure,
  getDataAccountRequest,
  getDataAccountSuccess,
  lockAccountRequest,
  lockAccountSuccess,
  lockAccountFailure,
  unlockAccountRequest,
  unlockAccountSuccess,
  unlockAccountFailure,
  createNewAccountRequest,
  createNewAccountSuccess,
  createNewAccountFailure,
  verifyAccountRequest,
  verifyAccountSuccess,
  verifyAccountFailure
} from 'app/pages/admin/admin-account-management-page/screen/action';
import { adminPageAccountEnum } from 'app/pages/admin/admin-account-management-page/screen/types';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { requestAPIWithToken, apiMethod } from 'utils/request';
import { API_URL } from 'utils/config';
import { API_CALL } from 'utils/api';

/**
 * Get Account
 *
 * @param {Object} action
 *
 */

export function* getAccountSaga({
  payload,
}: ReturnType<typeof getDataAccountRequest>) {
  try {
    const response = yield call(
      requestAPIWithToken,
      `${API_URL}${API_CALL?.API_ACCOUNT}/search`,
      apiMethod.POST,
      payload
    );
    yield put(getDataAccountSuccess(response?.data));
  } catch (error: any) {
    yield put(getDataAccountFailure(error?.response, error.message));
  }
}

/**
 * Lock Account
 *
 * @param {Object} action
 *
 */

export function* lockAccountSaga({
  payload,
}: ReturnType<typeof lockAccountRequest>) {
  try {
    const response = yield call(
      requestAPIWithToken,
      `${API_URL}${API_CALL?.API_ACCOUNT}/lock`,
      apiMethod.PUT,
      payload
    );
    yield put(lockAccountSuccess(response?.data));
  } catch (error: any) {
    yield put(lockAccountFailure(error?.response, error.message));
  }
}

/**
 * UnLock Account
 *
 * @param {Object} action
 *
 */

export function* unlockAccountSaga({
  payload,
}: ReturnType<typeof unlockAccountRequest>) {
  try {
    const response = yield call(
      requestAPIWithToken,
      `${API_URL}${API_CALL?.API_ACCOUNT}/unlock?id=${payload.id}`,
      apiMethod.PUT,
      payload
    );
    yield put(unlockAccountSuccess(response?.data));
  } catch (error: any) {
    yield put(unlockAccountFailure(error?.response, error.message));
  }
}


/**
 * Create New Account
 *
 * @param {Object} action
 *
 */

export function* createNewAccountSaga({
  payload,
}: ReturnType<typeof createNewAccountRequest>) {
  try {
    const response = yield call(
      requestAPIWithToken,
      `${API_URL}${API_CALL?.API_ACCOUNT}`,
      apiMethod.POST,
      payload
    );
    yield put(createNewAccountSuccess(response?.data));
  } catch (error: any) {
    yield put(createNewAccountFailure(error?.response, error.message));
  }
}

/**
 * Verify  Account
 * 
 * @param {Object} action
 *
 */

export function* verifyAccountSaga({
  payload,
}: ReturnType<typeof verifyAccountRequest>) {
  try {
    const response = yield call(
      requestAPIWithToken,
      `${API_URL}${API_CALL?.API_VERIFY_USER}?id=${payload?.id}`,
      apiMethod.PUT,
      ''
    );
    yield put(verifyAccountSuccess(response?.data));
  } catch (error: any) {
    yield put(verifyAccountFailure(error?.response, error.message));
  }
}


/**
 * Sagas
 */
export default function* root() {
  yield all([
    takeLatest(adminPageAccountEnum.GET_DATA_ACCOUNT_REQUEST, getAccountSaga),
  ]);
  yield all([
    takeLatest(adminPageAccountEnum.LOCK_ACCOUNT_REQUEST, lockAccountSaga),
  ]);
  yield all([
    takeLatest(adminPageAccountEnum.UNLOCK_ACCOUNT_REQUEST, unlockAccountSaga),
  ]);
  yield all([
    takeLatest(adminPageAccountEnum.CREATE_NEW_ACCOUNT_REQUEST, createNewAccountSaga),
  ]);
  yield all([
    takeLatest(adminPageAccountEnum.VERIFY_ACCOUNT_REQUEST, verifyAccountSaga),
  ]);
}
