import {
  getDataPostingCostFailure,
  getDataPostingCostRequest,
  getDataPostingCostSuccess,
  createDataPostingCostRequest,
  createDataPostingCostSuccess,
  createDataPostingCostFailure,
  updateDataPostingCostRequest,
  updateDataPostingCostSuccess,
  updateDataPostingCostFailure,
  deleteDataPostingCostRequest,
  deleteDataPostingCostSuccess,
  deleteDataPostingCostFailure,
} from 'app/pages/admin/admin-posting-cost-management-page/screen/action';
import { adminPagePostingCostEnum } from 'app/pages/admin/admin-posting-cost-management-page/screen/types';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { requestAPIWithToken, apiMethod } from 'utils/request';
import { API_URL } from 'utils/config';
import { API_CALL } from 'utils/api';

/**
 * Get Room Type
 *
 * @param {Object} action
 *
 */
export function* getPostingCostSaga({
  payload,
}: ReturnType<typeof getDataPostingCostRequest>) {
  try {
    const response = yield call(
      requestAPIWithToken,
      `${API_URL}${API_CALL?.API_POSTING_COST}`,
      apiMethod.GET,
      payload
    );
    yield put(getDataPostingCostSuccess(response?.data));
  } catch (error: any) {
    yield put(getDataPostingCostFailure(error?.response, error.message));
  }
}

/**
 * Create Room Type
 *
 * @param {Object} action
 *
 */

export function* createPostingCostSaga({
  payload,
}: ReturnType<typeof createDataPostingCostRequest>) {
  try {
    const response = yield call(
      requestAPIWithToken,
      `${API_URL}${API_CALL?.API_POSTING_COST}`,
      apiMethod.POST,
      payload
    );
    yield put(createDataPostingCostSuccess(response?.data));
  } catch (error: any) {
    yield put(createDataPostingCostFailure(error?.response, error.message));
  }
}

/**
 * Update Room Category
 *
 * @param {Object} action
 *
 */

export function* updatePostingCostSaga({
  payload,
}: ReturnType<typeof updateDataPostingCostRequest>) {
  try {
    const response = yield call(
      requestAPIWithToken,
      `${API_URL}${API_CALL?.API_POSTING_COST}`,
      apiMethod.PUT,
      payload
    );
    yield put(updateDataPostingCostSuccess(response?.data));
  } catch (error: any) {
    yield put(updateDataPostingCostFailure(error?.response, error.message));
  }
}

/**
 * Delete PostingCost
 *
 * @param {Object} action
 *
 */

export function* deletePostingCostSaga({
  payload,
}: ReturnType<typeof deleteDataPostingCostRequest>) {
  try {
    const response = yield call(
      requestAPIWithToken,
      `${API_URL}${API_CALL?.API_POSTING_COST}`,
      apiMethod.DELETE,
      payload
    );
    yield put(deleteDataPostingCostSuccess(response?.data));
  } catch (error: any) {
    yield put(deleteDataPostingCostFailure(error?.response, error.message));
  }
}

/**
 * GitHub Sagas
 */
export default function* root() {
  yield all([
    takeLatest(
      adminPagePostingCostEnum.GET_DATA_POSTING_COST_REQUEST,
      getPostingCostSaga
    ),
    takeLatest(
      adminPagePostingCostEnum.CREATE_DATA_POSTING_COST_REQUEST,
      createPostingCostSaga
    ),
    takeLatest(
      adminPagePostingCostEnum.UPDATE_DATA_POSTING_COST_REQUEST,
      updatePostingCostSaga
    ),
    takeLatest(
      adminPagePostingCostEnum.DELETE_DATA_POSTING_COST_REQUEST,
      deletePostingCostSaga
    ),
  ]);
}
