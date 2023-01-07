import {
  getDataRoomCategoriesFailure,
  getDataRoomCategoriesRequest,
  getDataRoomCategoriesSuccess,
  createDataRoomCategoriesRequest,
  createDataRoomCategoriesSuccess,
  createDataRoomCategoriesFailure,
  updateDataRoomCategoriesRequest,
  updateDataRoomCategoriesSuccess,
  updateDataRoomCategoriesFailure,
  deleteDataRoomCategoriesRequest,
  deleteDataRoomCategoriesSuccess,
  deleteDataRoomCategoriesFailure,
} from 'app/pages/admin/admin-room-category-management-page/screen/action';
import { adminPageRoomCategoryEnum } from 'app/pages/admin/admin-room-category-management-page/screen/types';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { requestAPIWithToken, apiMethod } from 'utils/request';
import { API_URL } from 'utils/config';
import { API_CALL } from 'utils/api';

/**
 * Get Room Categories
 *
 * @param {Object} action
 *
 */
export function* getRoomCategoriesSaga({
  payload,
}: ReturnType<typeof getDataRoomCategoriesRequest>) {
  try {
    const response = yield call(
      requestAPIWithToken,
      `${API_URL}${API_CALL?.API_ROOM_CATEGORY}`,
      apiMethod.GET,
      payload
    );
    yield put(getDataRoomCategoriesSuccess(response?.data));
  } catch (error: any) {
    yield put(getDataRoomCategoriesFailure(error?.response, error.message));
  }
}

/**
 * Create Room Category
 *
 * @param {Object} action
 *
 */

export function* createRoomCategorySaga({
  payload,
}: ReturnType<typeof createDataRoomCategoriesRequest>) {
  try {
    const response = yield call(
      requestAPIWithToken,
      `${API_URL}${API_CALL?.API_ROOM_CATEGORY}`,
      apiMethod.POST,
      payload
    );
    yield put(createDataRoomCategoriesSuccess(response?.data));
  } catch (error: any) {
    yield put(createDataRoomCategoriesFailure(error?.response, error.message));
  }
}

/**
 * Update Room Category
 *
 * @param {Object} action
 *
 */

export function* updateRoomCategoriesSaga({
  payload,
}: ReturnType<typeof updateDataRoomCategoriesRequest>) {
  try {
    const response = yield call(
      requestAPIWithToken,
      `${API_URL}${API_CALL?.API_ROOM_CATEGORY}`,
      apiMethod.PUT,
      payload
    );
    yield put(updateDataRoomCategoriesSuccess(response?.data));
  } catch (error: any) {
    yield put(updateDataRoomCategoriesFailure(error?.response, error.message));
  }
}

/**
 * Delete RoomCategory
 *
 * @param {Object} action
 *
 */

export function* deleteRoomCategorySaga({
  payload,
}: ReturnType<typeof deleteDataRoomCategoriesRequest>) {
  try {
    const response = yield call(
      requestAPIWithToken,
      `${API_URL}${API_CALL?.API_ROOM_CATEGORY}`,
      apiMethod.DELETE,
      payload
    );
    yield put(deleteDataRoomCategoriesSuccess(response?.data));
  } catch (error: any) {
    yield put(deleteDataRoomCategoriesFailure(error?.response, error.message));
  }
}

/**
 * GitHub Sagas
 */
export default function* root() {
  yield all([
    takeLatest(
      adminPageRoomCategoryEnum.GET_DATA_ROOM_CATEGORIES_REQUEST,
      getRoomCategoriesSaga
    ),
    takeLatest(
      adminPageRoomCategoryEnum.CREATE_DATA_ROOM_CATEGORIES_REQUEST,
      createRoomCategorySaga
    ),
    takeLatest(
      adminPageRoomCategoryEnum.UPDATE_DATA_ROOM_CATEGORIES_REQUEST,
      updateRoomCategoriesSaga
    ),
    takeLatest(
      adminPageRoomCategoryEnum.DELETE_DATA_ROOM_CATEGORIES_REQUEST,
      deleteRoomCategorySaga
    ),
  ]);
}
