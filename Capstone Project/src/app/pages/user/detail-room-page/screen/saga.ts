import {
  getDetailRoomRequest,
  getDetailRoomSuccess,
  getDetailRoomFailure,
  reportPostRequest,
  reportPostSuccess,
  reportPostFailure,
  getDetailPostRequest,
  getDetailPostSuccess,
  getDetailPostFailure,
  addToFavouriteRequest,
  addToFavouriteSuccess,
  addToFavouriteFailure,
  getListFeedbackRequest,
  getListFeedbackSuccess,
  getListFeedbackFailure,
  createFeedbackRequest,
  createFeedbackSuccess,
  createFeedbackFailure,
  getListFavouriteRequest,
  getListFavouriteSuccess,
  getListFavouriteFailure,
  getDetailPostWithRoomRequest,
  getDetailPostWithRoomFailure,
  getDetailPostWithRoomSuccess,
  updateFeedbackRequest,
  updateFeedbackSuccess,
  updateFeedbackFailure,
} from 'app/pages/user/detail-room-page/screen/action';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { detailRoomPageEnum } from 'app/pages/user/detail-room-page/screen/types';
import { apiMethod, requestAPIWithToken, requestAPI } from 'utils/request';
import { API_URL } from 'utils/config';
import { API_CALL } from 'utils/api';

/**
 * get posting
 *
 * @param {Object} action
 *
 */

export function* getDetailRoomSaga({
  payload,
}: ReturnType<typeof getDetailRoomRequest>) {
  try {
    const response = yield call(
      requestAPI,
      `${API_URL}${API_CALL?.API_ROOM}?id=${payload?.id}`,
      apiMethod.GET,
      ''
    );
    yield put(getDetailRoomSuccess(response?.data));
  } catch (error: any) {
    yield put(getDetailRoomFailure(error?.response, error.message));
  }
}

/**
 * report post
 *
 * @param {Object} action
 *
 */

export function* reportPostSaga({
  payload,
}: ReturnType<typeof reportPostRequest>) {
  try {
    const response = yield call(
      requestAPIWithToken,
      `${API_URL}${API_CALL?.API_REPORT}`,
      apiMethod.POST,
      payload
    );
    yield put(reportPostSuccess(response?.data));
  } catch (error: any) {
    yield put(reportPostFailure(error?.response, error.message));
  }
}

/**
 * get posting detail
 *
 * @param {Object} action
 *
 */

export function* getDetailPostSaga({
  payload,
}: ReturnType<typeof getDetailPostRequest>) {
  try {
    const response = yield call(
      requestAPI,
      `${API_URL}${API_CALL?.API_POSTING}?id=${payload?.id}`,
      apiMethod.GET,
      ''
    );
    yield put(getDetailPostSuccess(response?.data));
  } catch (error: any) {
    yield put(getDetailPostFailure(error?.response, error.message));
  }
}

/**
 * get posting detail with room
 *
 * @param {Object} action
 *
 */

export function* getDetailPostWithRoomSaga({
  payload,
}: ReturnType<typeof getDetailPostWithRoomRequest>) {
  try {
    const response = yield call(
      requestAPI,
      `${API_URL}${API_CALL?.API_POSTING}?id=${payload?.id}&idRoom=${payload.idRoom}`,
      apiMethod.GET,
      ''
    );
    yield put(getDetailPostWithRoomSuccess(response?.data));
  } catch (error: any) {
    yield put(getDetailPostWithRoomFailure(error?.response, error.message));
  }
}

/**
 * add to favourite
 *
 * @param {Object} action
 *
 */

export function* addToFavouriteSaga({
  payload,
}: ReturnType<typeof addToFavouriteRequest>) {
  try {
    const response = yield call(
      requestAPIWithToken,
      `${API_URL}${API_CALL?.API_FAVOURITE}`,
      apiMethod.POST,
      payload
    );
    yield put(addToFavouriteSuccess(response?.data));
  } catch (error: any) {
    yield put(addToFavouriteFailure(error?.response, error.message));
  }
}

/**
 * get list feedback
 *
 * @param {Object} action
 *
 */

export function* getListFavouriteSaga({
  payload,
}: ReturnType<typeof getListFavouriteRequest>) {
  try {
    const response = yield call(
      requestAPIWithToken,
      `${API_URL}${API_CALL?.API_FAVOURITE}/user`,
      apiMethod.GET,
      ''
    );
    yield put(getListFavouriteSuccess(response?.data));
  } catch (error: any) {
    yield put(getListFavouriteFailure(error?.response, error.message));
  }
}

/**
 * get list feedback
 *
 * @param {Object} action
 *
 */

export function* getListFeedbackSaga({
  payload,
}: ReturnType<typeof getListFeedbackRequest>) {
  try {
    const response = yield call(
      requestAPI,
      `${API_URL}${API_CALL?.API_FEEDBACK}/post/${payload?.id}`,
      apiMethod.GET,
      ''
    );
    yield put(getListFeedbackSuccess(response?.data));
  } catch (error: any) {
    yield put(getListFeedbackFailure(error?.response, error.message));
  }
}

/**
 * create new feedback
 *
 * @param {Object} action
 *
 */

export function* createFeedbackSaga({
  payload,
}: ReturnType<typeof createFeedbackRequest>) {
  try {
    const response = yield call(
      requestAPIWithToken,
      `${API_URL}${API_CALL?.API_FEEDBACK}`,
      apiMethod.POST,
      payload
    );
    yield put(createFeedbackSuccess(response?.data));
  } catch (error: any) {
    yield put(createFeedbackFailure(error?.response, error.message));
  }
}

/**
 * update feedback
 *
 * @param {Object} action
 *
 */

export function* updateFeedbackSaga({
  payload,
}: ReturnType<typeof updateFeedbackRequest>) {
  try {
    const response = yield call(
      requestAPIWithToken,
      `${API_URL}${API_CALL?.API_FEEDBACK}`,
      apiMethod.PUT,
      payload
    );
    yield put(updateFeedbackSuccess(response?.data));
  } catch (error: any) {
    yield put(updateFeedbackFailure(error?.response, error.message));
  }
}

export default function* root() {
  yield all([
    takeLatest(detailRoomPageEnum.GET_DETAIL_ROOM_REQUEST, getDetailRoomSaga),
    takeLatest(detailRoomPageEnum.REPORT_POST_REQUEST, reportPostSaga),
    takeLatest(detailRoomPageEnum.GET_DETAIL_POST_REQUEST, getDetailPostSaga),
    takeLatest(detailRoomPageEnum.ADD_TO_FAVOURITE_REQUEST, addToFavouriteSaga),
    takeLatest(
      detailRoomPageEnum.GET_LIST_FEEDBACK_REQUEST,
      getListFeedbackSaga
    ),
    takeLatest(detailRoomPageEnum.CREATE_FEEDBACK_REQUEST, createFeedbackSaga),
    takeLatest(
      detailRoomPageEnum.GET_LIST_FAVOURITE_USER_REQUEST,
      getListFavouriteSaga
    ),
    takeLatest(
      detailRoomPageEnum.GET_DETAIL_POST_WITH_ROOM_REQUEST,
      getDetailPostWithRoomSaga
    ),
    takeLatest(
      detailRoomPageEnum.UPDATE_FEEDBACK_REQUEST,
      updateFeedbackSaga
    ),
    
  ]);
}
