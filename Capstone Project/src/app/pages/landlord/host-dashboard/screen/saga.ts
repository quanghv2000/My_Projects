import {
    getDashboardHostRequest,
    getDashboardHostSuccess,
    getDashboardHostFailure,
    getDashboardHostDataRequest,
    getDashboardHostDataSuccess,
    getDashboardHostDataFailure
} from 'app/pages/landlord/host-dashboard/screen/action';
import { hostDashboardPageEnum } from 'app/pages/landlord/host-dashboard/screen/types';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { apiMethod, requestAPIWithToken } from 'utils/request';
import { API_URL } from 'utils/config';
import { API_CALL } from 'utils/api';

/**
 * Get host dashboard
 *
 * @param {Object} action
 *
 */
export function* getHostDashboardSaga({
    payload,
}: ReturnType<typeof getDashboardHostRequest>) {
    try {
        const url = `${API_URL}${API_CALL?.API_HOST_DASHBOARD}`;

        const response = yield call(requestAPIWithToken, url, apiMethod.GET, '');
        yield put(getDashboardHostSuccess(response?.data));
    } catch (error: any) {
        yield put(getDashboardHostFailure(error?.response, error.message));
    }
}


/**
 * Get host dashboard data
 *
 * @param {Object} action
 *
 */
export function* getHostDashboardDataSaga({
    payload,
}: ReturnType<typeof getDashboardHostDataRequest>) {
    try {
        const url = `${API_URL}${API_CALL?.API_HOST_DASHBOARD_DATA}?year=${payload?.year}`;

        const response = yield call(requestAPIWithToken, url, apiMethod.GET, '');
        yield put(getDashboardHostDataSuccess(response?.data));
    } catch (error: any) {
        yield put(getDashboardHostDataFailure(error?.response, error.message));
    }
}


/**
 *  Sagas
 */
export default function* root() {
    yield all([takeLatest(hostDashboardPageEnum.HOST_DASHBOARD_REQUEST, getHostDashboardSaga),
    takeLatest(hostDashboardPageEnum.HOST_DASHBOARD_DATA_REQUEST, getHostDashboardDataSaga)
    ]);
}
