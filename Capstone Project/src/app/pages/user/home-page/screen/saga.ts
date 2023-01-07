import {
  getDataFailure,
  getDataRequest,
  getDataSuccess,
} from 'app/pages/user/home-page/screen/action';
import { homePageEnum } from 'app/pages/user/home-page/screen/types';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';

/**
 * Get Repos
 *
 * @param {Object} action
 *
 */
export function* getDataSaga({ payload }: ReturnType<typeof getDataRequest>) {
  try {
    const data = yield call(
      request,
      `https://shopsale.herokuapp.com/api/product`
    );
    yield put(
      getDataSuccess(data, {
        cached: true,
        query: payload,
        updatedAt: 0,
      })
    );
  } catch (error: any) {
    yield put(getDataFailure(error.message, payload));
  }
}

/**
 * GitHub Sagas
 */
export default function* root() {
  yield all([takeLatest(homePageEnum.LOAD_DATA_REQUEST, getDataSaga)]);
}
