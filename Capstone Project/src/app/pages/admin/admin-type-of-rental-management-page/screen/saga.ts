import {
  getDataTypeOfRentalFailure,
  getDataTypeOfRentalRequest,
  getDataTypeOfRentalSuccess,
  updateDataTypeOfRentalRequest,
  updateDataTypeOfRentalSuccess,
  updateDataTypeOfRentalFailure,
  createDataTypeOfRentalRequest,
  createDataTypeOfRentalSuccess,
  createDataTypeOfRentalFailure,
  deleteDataTypeOfRentalRequest,
  deleteDataTypeOfRentalSuccess,
  deleteDataTypeOfRentalFailure,
} from 'app/pages/admin/admin-type-of-rental-management-page/screen/action';
import { adminPageTypeOfRentalEnum } from 'app/pages/admin/admin-type-of-rental-management-page/screen/types';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { requestAPIWithToken, apiMethod } from 'utils/request';
import { API_URL } from 'utils/config';
import { API_CALL } from 'utils/api';

/**
 * Get TypeOfRental
 *
 * @param {Object} action
 *
 */

export function* getTypeOfRentalSaga({
  payload,
}: ReturnType<typeof getDataTypeOfRentalRequest>) {
  try {
    const response = yield call(
      requestAPIWithToken,
      `${API_URL}${API_CALL?.API_TYPE_OF_RENTAL}`,
      apiMethod.GET,
      payload
    );
    yield put(getDataTypeOfRentalSuccess(response?.data));
  } catch (error: any) {
    yield put(getDataTypeOfRentalFailure(error?.response, error.message));
  }
}

/**
 * Update TypeOfRental
 *
 * @param {Object} action
 *
 */

export function* updateTypeOfRentalSaga({
  payload,
}: ReturnType<typeof updateDataTypeOfRentalRequest>) {
  try {
    const response = yield call(
      requestAPIWithToken,
      `${API_URL}${API_CALL?.API_TYPE_OF_RENTAL}`,
      apiMethod.PUT,
      payload
    );
    yield put(updateDataTypeOfRentalSuccess(response?.data));
  } catch (error: any) {
    yield put(updateDataTypeOfRentalFailure(error?.response, error.message));
  }
}

/**
 * Create TypeOfRental
 *
 * @param {Object} action
 *
 */

export function* createTypeOfRentalSaga({
  payload,
}: ReturnType<typeof createDataTypeOfRentalRequest>) {
  try {
    const response = yield call(
      requestAPIWithToken,
      `${API_URL}${API_CALL?.API_TYPE_OF_RENTAL}`,
      apiMethod.POST,
      payload
    );
    yield put(createDataTypeOfRentalSuccess(response?.data));
  } catch (error: any) {
    yield put(createDataTypeOfRentalFailure(error?.response, error.message));
  }
}

/**
 * Delete TypeOfRental
 *
 * @param {Object} action
 *
 */

export function* deleteTypeOfRentalSaga({
  payload,
}: ReturnType<typeof deleteDataTypeOfRentalRequest>) {
  try {
    const response = yield call(
      requestAPIWithToken,
      `${API_URL}${API_CALL?.API_TYPE_OF_RENTAL}`,
      apiMethod.DELETE,
      payload
    );
    yield put(deleteDataTypeOfRentalSuccess(response?.data));
  } catch (error: any) {
    yield put(deleteDataTypeOfRentalFailure(error?.response, error.message));
  }
}

/**
 * Sagas
 */
export default function* root() {
  yield all([
    takeLatest(
      adminPageTypeOfRentalEnum.GET_DATA_TYPE_OF_RENTAL_REQUEST,
      getTypeOfRentalSaga
    ),
    takeLatest(
      adminPageTypeOfRentalEnum.UPDATE_DATA_TYPE_OF_RENTAL_REQUEST,
      updateTypeOfRentalSaga
    ),
    takeLatest(
      adminPageTypeOfRentalEnum.CREATE_DATA_TYPE_OF_RENTAL_REQUEST,
      createTypeOfRentalSaga
    ),
    takeLatest(
      adminPageTypeOfRentalEnum.DELETE_DATA_TYPE_OF_RENTAL_REQUEST,
      deleteTypeOfRentalSaga
    ),
  ]);
}
