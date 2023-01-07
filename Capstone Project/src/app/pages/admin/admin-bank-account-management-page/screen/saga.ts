import {
  getDataBankAccountFailure,
  getDataBankAccountRequest,
  getDataBankAccountSuccess,
  updateDataBankAccountRequest,
  updateDataBankAccountSuccess,
  updateDataBankAccountFailure,
  createDataBankAccountRequest,
  createDataBankAccountSuccess,
  createDataBankAccountFailure,
  deleteDataBankAccountRequest,
  deleteDataBankAccountSuccess,
  deleteDataBankAccountFailure,
} from 'app/pages/admin/admin-bank-account-management-page/screen/action';
import { adminPageBankAccountEnum } from 'app/pages/admin/admin-bank-account-management-page/screen/types';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { requestAPIWithToken, apiMethod } from 'utils/request';
import { API_URL } from 'utils/config';
import { API_CALL } from 'utils/api';

/**
 * Get BankAccount
 *
 * @param {Object} action
 *
 */

export function* getBankAccountSaga({
  payload,
}: ReturnType<typeof getDataBankAccountRequest>) {
  try {
    const response = yield call(
      requestAPIWithToken,
      `${API_URL}${API_CALL?.API_BANK_ACCOUNT}`,
      apiMethod.GET,
      payload
    );
    yield put(getDataBankAccountSuccess(response?.data));
  } catch (error: any) {
    yield put(getDataBankAccountFailure(error?.response, error.message));
  }
}

/**
 * Update BankAccount
 *
 * @param {Object} action
 *
 */

export function* updateBankAccountSaga({
  payload,
}: ReturnType<typeof updateDataBankAccountRequest>) {
  try {
    const response = yield call(
      requestAPIWithToken,
      `${API_URL}${API_CALL?.API_BANK_ACCOUNT}`,
      apiMethod.PUT,
      payload
    );
    yield put(updateDataBankAccountSuccess(response?.data));
  } catch (error: any) {
    yield put(updateDataBankAccountFailure(error?.response, error.message));
  }
}

/**
 * Create BankAccount
 *
 * @param {Object} action
 *
 */

export function* createBankAccountSaga({
  payload,
}: ReturnType<typeof createDataBankAccountRequest>) {
  try {
    const response = yield call(
      requestAPIWithToken,
      `${API_URL}${API_CALL?.API_BANK_ACCOUNT}`,
      apiMethod.POST,
      payload
    );
    yield put(createDataBankAccountSuccess(response?.data));
  } catch (error: any) {
    yield put(createDataBankAccountFailure(error?.response, error.message));
  }
}

/**
 * Delete BankAccount
 *
 * @param {Object} action
 *
 */

export function* deleteBankAccountSaga({
  payload,
}: ReturnType<typeof deleteDataBankAccountRequest>) {
  try {
    const response = yield call(
      requestAPIWithToken,
      `${API_URL}${API_CALL?.API_BANK_ACCOUNT}`,
      apiMethod.DELETE,
      payload
    );
    yield put(deleteDataBankAccountSuccess(response?.data));
  } catch (error: any) {
    yield put(deleteDataBankAccountFailure(error?.response, error.message));
  }
}

/**
 * Sagas
 */
export default function* root() {
  yield all([
    takeLatest(
      adminPageBankAccountEnum.GET_DATA_BANK_ACCOUNT_REQUEST,
      getBankAccountSaga
    ),
    takeLatest(
      adminPageBankAccountEnum.UPDATE_DATA_BANK_ACCOUNT_REQUEST,
      updateBankAccountSaga
    ),
    takeLatest(
      adminPageBankAccountEnum.CREATE_DATA_BANK_ACCOUNT_REQUEST,
      createBankAccountSaga
    ),
    takeLatest(
      adminPageBankAccountEnum.DELETE_DATA_BANK_ACCOUNT_REQUEST,
      deleteBankAccountSaga
    ),
  ]);
}
