import {
  getHouseFailure,
  getHouseRequest,
  getHouseSuccess,
  getHouseMoreRequest,
  getHouseMoreSuccess,
  getHouseMoreFailure,
  getHouseSuggestionRequest,
  getHouseSuggestionSuccess,
  getHouseSuggestionFailure,
  getPostingTop8Request,
  getPostingTop8Success,
  getPostingTop8Failure,
  getHousePostingMapRequest,
  getHousePostingMapSuccess,
  getHousePostingMapFailure,
  filterPostingRequest,
  filterPostingSuccess,
  filterPostingFailure,
  filterPostingMapRequest,
  filterPostingMapSuccess,
  filterPostingMapFailure,
} from 'app/pages/user/suggestion-page/screen/action';
import { searchPageEnum } from 'app/pages/user/suggestion-page/screen/types';
import {
  all,
  call,
  put,
  takeLatest,
  debounce,
  delay,
} from 'redux-saga/effects';
import { apiMethod, requestAPIWithToken } from 'utils/request';
import { API_URL } from 'utils/config';
import { API_CALL } from 'utils/api';

/**
 * get posting
 *
 * @param {Object} action
 *
 */

export function* getPostingSaga({
  payload,
}: ReturnType<typeof getHouseRequest>) {
  try {
    const response = yield call(
      requestAPIWithToken,
      `${API_URL}${API_CALL?.API_GET_POSTING}`,
      apiMethod.POST,
      payload
    );
    yield put(getHouseSuccess(response?.data));
  } catch (error: any) {
    yield put(getHouseFailure(error?.response, error.message));
  }
}

/**
 * get posting more
 *
 * @param {Object} action
 *
 */

export function* getPostingMoreSaga({
  payload,
}: ReturnType<typeof getHouseMoreRequest>) {
  try {
    const response = yield call(
      requestAPIWithToken,
      `${API_URL}${API_CALL?.API_FILTER}`,
      apiMethod.POST,
      payload
    );
    yield put(getHouseMoreSuccess(response?.data));
  } catch (error: any) {
    yield put(getHouseMoreFailure(error?.response, error.message));
  }
}

/**
 * get posting suggesstion
 *
 * @param {Object} action
 *
 */

export function* getPostingSuggesstionSaga({
  payload,
}: ReturnType<typeof getHouseSuggestionRequest>) {
  try {
    yield delay(500);
    const response = yield call(
      requestAPIWithToken,
      `${API_URL}${API_CALL?.API_SEARCH_HOUSE_NAME}`,
      apiMethod.GET,
      payload
    );
    yield put(getHouseSuggestionSuccess(response?.data));
  } catch (error: any) {
    yield put(getHouseSuggestionFailure(error?.response, error.message));
  }
}

/**
 * get posting top 8
 *
 * @param {Object} action
 *
 */

export function* getPostingTop8Saga({
  payload,
}: ReturnType<typeof getPostingTop8Request>) {
  try {
    yield delay(500);
    const response = yield call(
      requestAPIWithToken,
      `${API_URL}${API_CALL?.API_GET_POST_TOP_8}`,
      apiMethod.GET,
      payload
    );
    yield put(getPostingTop8Success(response?.data));
  } catch (error: any) {
    yield put(getPostingTop8Failure(error?.response, error.message));
  }
}

/**
 * get posting for map
 *
 * @param {Object} action
 *
 */

export function* getPostingMapSaga({
  payload,
}: ReturnType<typeof getHousePostingMapRequest>) {
  try {
    const response = yield call(
      requestAPIWithToken,
      `${API_URL}${API_CALL?.API_POSTING_FOR_MAP}`,
      apiMethod.POST,
      payload
    );
    yield put(getHousePostingMapSuccess(response?.data));
  } catch (error: any) {
    yield put(getHousePostingMapFailure(error?.response, error.message));
  }
}

/**
 * filter posting
 *
 * @param {Object} action
 *
 */

export function* filterPostingSaga({
  payload,
}: ReturnType<typeof filterPostingRequest>) {
  try {
    const response = yield call(
      requestAPIWithToken,
      `${API_URL}${API_CALL?.API_FILTER}`,
      apiMethod.POST,
      payload
    );
    yield put(filterPostingSuccess(response?.data));
  } catch (error: any) {
    yield put(filterPostingFailure(error?.response, error.message));
  }
}

/**
 * filter posting on map
 *
 * @param {Object} action
 *
 */

export function* filterPostingMapSaga({
  payload,
}: ReturnType<typeof filterPostingMapRequest>) {
  try {
    const response = yield call(
      requestAPIWithToken,
      `${API_URL}${API_CALL?.API_FILTER_MAP}`,
      apiMethod.POST,
      payload
    );
    yield put(filterPostingMapSuccess(response?.data));
  } catch (error: any) {
    yield put(filterPostingMapFailure(error?.response, error.message));
  }
}

export default function* root() {
  yield all([
    takeLatest(searchPageEnum.GET_HOUSE_POSTING_REQUEST, getPostingSaga),
    takeLatest(
      searchPageEnum.GET_HOUSE_POSTING_LOAD_MORE_REQUEST,
      getPostingMoreSaga
    ),
    takeLatest(
      searchPageEnum.GET_HOUSE_POSTING_SUGGESTION_REQUEST,
      getPostingSuggesstionSaga
    ),
    takeLatest(searchPageEnum.GET_POST_TOP_8_REQUEST, getPostingTop8Saga),
    takeLatest(searchPageEnum.GET_HOUSE_POSTING_MAP_REQUEST, getPostingMapSaga),
    takeLatest(searchPageEnum.FILTER_HOUSE_POSTING_REQUEST, filterPostingSaga),
    takeLatest(
      searchPageEnum.FILTER_HOUSE_POSTING_MAP_REQUEST,
      filterPostingMapSaga
    ),
  ]);
}
