import {
  adminGetTransactionRequest,
  adminGetTransactionSuccess,
  adminGetTransactionFailure,
  adminConfirmTransactionRequest,
  adminConfirmTransactionSuccess,
  adminRejectTransactionFailure,
  adminRejectTransactionRequest,
  adminRejectTransactionSuccess,
  adminConfirmTransactionFailure,
  adminSearchTransactionRequest,
  adminSearchTransactionSuccess,
  adminSearchTransactionFailure,
  adminCreateTransactionRequest,
  adminCreateTransactionSuccess,
  adminCreateTransactionFailure,
  adminSearchPostOrExtendTransactionRequest,
  adminSearchPostOrExtendTransactionSuccess,
  adminSearchPostOrExtendTransactionFailure,
} from 'app/pages/admin/admin-transaction-management-page/screen/action';
import { adminTransactionPageEnum } from 'app/pages/admin/admin-transaction-management-page/screen/types';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { apiMethod, requestAPIWithToken } from 'utils/request';
import { API_URL } from 'utils/config';
import { API_CALL } from 'utils/api';

/**
 * get transaction
 *
 * @param {Object} action
 *
 */

export function* getTransactionAdminSaga({
  payload,
}: ReturnType<typeof adminGetTransactionRequest>) {
  try {
    const url = `${API_URL}${API_CALL?.API_TRANSACTION}`;

    const response = yield call(requestAPIWithToken, url, apiMethod.GET, '');
    yield put(adminGetTransactionSuccess(response?.data));
  } catch (error: any) {
    yield put(adminGetTransactionFailure(error?.response, error.message));
  }
}


/**
 * confirm transaction
 *
 * @param {Object} action
 *
 */

export function* confirmTransactionAdminSaga({
  payload,
}: ReturnType<typeof adminConfirmTransactionRequest>) {
  try {
    const url = `${API_URL}${API_CALL?.API_TRANSACTION_CONFIRM}`;

    const response = yield call(requestAPIWithToken, url, apiMethod.PUT, payload);
    yield put(adminConfirmTransactionSuccess(response?.data));
  } catch (error: any) {
    yield put(adminConfirmTransactionFailure(error?.response, error.message));
  }
}


/**
 * reject transaction
 *
 * @param {Object} action
 *
 */

export function* rejectTransactionAdminSaga({
  payload,
}: ReturnType<typeof adminRejectTransactionRequest>) {
  try {
    const url = `${API_URL}${API_CALL?.API_TRANSACTION_REJECT}`;

    const response = yield call(requestAPIWithToken, url, apiMethod.PUT, payload);
    yield put(adminRejectTransactionSuccess(response?.data));
  } catch (error: any) {
    yield put(adminRejectTransactionFailure(error?.response, error.message));
  }
}

/**
 * search transaction
 *
 * @param {Object} action
 *
 */

export function* searchTransactionAdminSaga({
  payload,
}: ReturnType<typeof adminSearchTransactionRequest>) {
  try {
    const url = `${API_URL}${API_CALL?.API_TRANSACTION_SEARCH}`;


    const response = yield call(requestAPIWithToken, url, apiMethod.POST, payload);
    yield put(adminSearchTransactionSuccess(response?.data));
  } catch (error: any) {
    yield put(adminSearchTransactionFailure(error?.response, error.message));
  }
}


/**
 * create transaction
 *
 * @param {Object} action
 *
 */

export function* createTransactionAdminSaga({
  payload,
}: ReturnType<typeof adminCreateTransactionRequest>) {
  try {
    const url = `${API_URL}${API_CALL?.API_TRANSACTION_CREATE_BY_ADMIN}`;
    const response = yield call(requestAPIWithToken, url, apiMethod.POST, payload);
    yield put(adminCreateTransactionSuccess(response?.data));
  } catch (error: any) {
    yield put(adminCreateTransactionFailure(error?.response, error.message));
  }
}


/**
 * search transaction post or extend
 *
 * @param {Object} action
 *
 */

export function* searchTransactionPostOrExtendAdminSaga({
  payload,
}: ReturnType<typeof adminSearchPostOrExtendTransactionRequest>) {
  try {
    const url = `${API_URL}${API_CALL?.API_TRANSACTION_POST_OR_EXTEND_SEARCH}`;

    const response = yield call(requestAPIWithToken, url, apiMethod.POST, payload);
    yield put(adminSearchPostOrExtendTransactionSuccess(response?.data));
  } catch (error: any) {
    yield put(adminSearchPostOrExtendTransactionFailure(error?.response, error.message));
  }
}



/**
 *  Sagas
 */
export default function* root() {
  yield all([takeLatest(adminTransactionPageEnum.ADMIN_TRANSACTION_REQUEST, getTransactionAdminSaga),
  takeLatest(adminTransactionPageEnum.ADMIN_TRANSACTION_CONFIRM_REQUEST, confirmTransactionAdminSaga),
  takeLatest(adminTransactionPageEnum.ADMIN_TRANSACTION_REJECT_REQUEST, rejectTransactionAdminSaga),
  takeLatest(adminTransactionPageEnum.ADMIN_TRANSACTION_SEARCH_REQUEST, searchTransactionAdminSaga),
  takeLatest(adminTransactionPageEnum.ADMIN_TRANSACTION_CREATE_REQUEST, createTransactionAdminSaga),
  takeLatest(adminTransactionPageEnum.ADMIN_TRANSACTION_POST_OR_EXTEND_SEARCH_REQUEST, searchTransactionPostOrExtendAdminSaga),
  ]);
}
