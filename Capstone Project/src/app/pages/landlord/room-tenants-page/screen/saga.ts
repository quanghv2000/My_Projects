import {
  getDataCustomerFailure,
  getDataCustomerRequest,
  getDataCustomerSuccess,
} from 'app/pages/landlord/room-tenants-page/screen/action';
import { roomTenantPageEnum } from 'app/pages/landlord/room-tenants-page/screen/types';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';
// import { API_URL } from 'utils/config';

/**
 * Get Repos
 *
 * @param {Object} action
 *
 */
export function* getDataSaga({
  payload,
}: ReturnType<typeof getDataCustomerRequest>) {
  try {
    const data = yield call(
      request,
      `https://5ebd45b2ec34e900161920da.mockapi.io/api/v1/enterprise-product-table`
    );
    yield put(
      getDataCustomerSuccess(data, {
        cached: true,
        query: payload,
        updatedAt: 0,
      })
    );
  } catch (error: any) {
    yield put(getDataCustomerFailure(error.message, payload));
  }
}

/**
 * GitHub Sagas
 */
export default function* root() {
  yield all([
    takeLatest(roomTenantPageEnum.LOAD_DATA_CUSTOMER_REQUEST, getDataSaga),
  ]);
}
