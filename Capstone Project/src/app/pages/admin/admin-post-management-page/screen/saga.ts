import {
  getListPostRequest,
  getListPostSuccess,
  getListPostFailure,
  confirmPostRequest,
  confirmPostSuccess,
  confirmPostFailure,
  rejectPostRequest,
  rejectPostSuccess,
  rejectPostFailure,
  deletePostRequest,
  deletePostSuccess,
  deletePostFailure,
  verifyPostRequest,
  verifyPostSuccess,
  verifyPostFailure,
  cancelVerifyPostRequest,
  cancelVerifyPostSuccess,
  cancelVerifyPostFailure,
  restorePostRequest,
  restorePostSuccess,
  restorePostFailure,
  searchPostRequest,
  searchPostSuccess,
  searchPostFailure
} from 'app/pages/admin/admin-post-management-page/screen/action';
import { adminPostManagmentPageEnum } from 'app/pages/admin/admin-post-management-page/screen/types';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { apiMethod, requestAPIWithToken } from 'utils/request';
import { API_URL } from 'utils/config';
import { API_CALL } from 'utils/api';

/**
 * Get List Post
 *
 * @param {Object} action
 *
 */
export function* getListPostSaga({
  payload,
}: ReturnType<typeof getListPostRequest>) {
  try {
    const url = `${API_URL}${API_CALL?.API_POST}`;

    const response = yield call(requestAPIWithToken, url, apiMethod.GET, '');
    yield put(getListPostSuccess(response?.data));
  } catch (error: any) {
    yield put(getListPostFailure(error?.response, error.message));
  }
}


/**
 * search post
 *
 * @param {Object} action
 *
 */
export function* searchPostSaga({
  payload,
}: ReturnType<typeof searchPostRequest>) {
  try {
    const url = `${API_URL}${API_CALL?.API_ADMIN_POST_SEARCH}`;

    const response = yield call(requestAPIWithToken, url, apiMethod.POST, payload);
    yield put(searchPostSuccess(response?.data));
  } catch (error: any) {
    yield put(searchPostFailure(error?.response, error.message));
  }
}


/**
 * confirm Post
 *
 * @param {Object} action
 *
 */
export function* confirmPostSaga({
  payload,
}: ReturnType<typeof confirmPostRequest>) {
  try {
    const url = `${API_URL}${API_CALL?.API_POSTING_CONFIRM}?id=${payload}`;

    const response = yield call(requestAPIWithToken, url, apiMethod.PUT, '');
    yield put(confirmPostSuccess(response?.data));
  } catch (error: any) {
    yield put(confirmPostFailure(error?.response, error.message));
  }
}


/**
 * reject Post
 *
 * @param {Object} action
 *
 */
export function* rejectPostSaga({
  payload,
}: ReturnType<typeof rejectPostRequest>) {
  try {
    const url = `${API_URL}${API_CALL?.API_POSTING_REJECT}`;

    const response = yield call(requestAPIWithToken, url, apiMethod.PUT, payload);
    yield put(rejectPostSuccess(response?.data));
  } catch (error: any) {
    yield put(rejectPostFailure(error?.response, error.message));
  }
}


/**
 * delete Post
 *
 * @param {Object} action
 *
 */
export function* deletePostSaga({
  payload,
}: ReturnType<typeof deletePostRequest>) {
  try {
    const url = `${API_URL}${API_CALL?.API_POSTING_DELETE}`;

    const response = yield call(requestAPIWithToken, url, apiMethod.PUT, payload);
    yield put(deletePostSuccess(response?.data));
  } catch (error: any) {
    yield put(deletePostFailure(error?.response, error.message));
  }
}



/**
 * verify post
 *
 * @param {Object} action
 *
 */
export function* verifyPostSaga({
  payload,
}: ReturnType<typeof verifyPostRequest>) {
  try {
    const url = `${API_URL}${API_CALL?.API_POST_VERIFY}`;

    const response = yield call(requestAPIWithToken, url, apiMethod.PUT, payload);
    yield put(verifyPostSuccess(response?.data));
  } catch (error: any) {
    yield put(verifyPostFailure(error?.response, error.message));
  }
}


/**
 *  cancel verify post
 *
 * @param {Object} action
 *
 */
export function* cancelVerifyPostSaga({
  payload,
}: ReturnType<typeof cancelVerifyPostRequest>) {
  try {
    const url = `${API_URL}${API_CALL?.API_CANCEL_VERIFY_POST}`;

    const response = yield call(requestAPIWithToken, url, apiMethod.PUT, payload);
    yield put(cancelVerifyPostSuccess(response?.data));
  } catch (error: any) {
    yield put(cancelVerifyPostFailure(error?.response, error.message));
  }
}


/**
 * restore Post
 *
 * @param {Object} action
 *
 */
export function* restorePostSaga({
  payload,
}: ReturnType<typeof restorePostRequest>) {
  try {
    const url = `${API_URL}${API_CALL?.API_ADMIN_POST_RESTORE}`;

    const response = yield call(requestAPIWithToken, url, apiMethod.PUT, payload);
    yield put(restorePostSuccess(response?.data));
  } catch (error: any) {
    yield put(restorePostFailure(error?.response, error.message));
  }
}



/**
 *  Sagas
 */
export default function* root() {
  yield all([takeLatest(adminPostManagmentPageEnum.GET_POST_ADMIN_REQUEST, getListPostSaga),
  takeLatest(adminPostManagmentPageEnum.CONFIRM_POST_ADMIN_REQUEST, confirmPostSaga),
  takeLatest(adminPostManagmentPageEnum.REJECT_POST_ADMIN_REQUEST, rejectPostSaga),
  takeLatest(adminPostManagmentPageEnum.VERIFY_POST_ADMIN_REQUEST, verifyPostSaga),
  takeLatest(adminPostManagmentPageEnum.CANCEL_VERIFY_POST_ADMIN_REQUEST, cancelVerifyPostSaga),
  takeLatest(adminPostManagmentPageEnum.DELETE_POST_ADMIN_REQUEST, deletePostSaga),
  takeLatest(adminPostManagmentPageEnum.RESTORE_POST_ADMIN_REQUEST, restorePostSaga),
  takeLatest(adminPostManagmentPageEnum.SEARCH_POST_ADMIN_REQUEST, searchPostSaga),
  ]);
}
