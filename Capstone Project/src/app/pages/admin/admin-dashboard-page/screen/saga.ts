import {
    getDashboardAdminRequest,
    getDashboardAdminSuccess,
    getDashboardAdminFailure,
    getDashboardAdminDataRequest,
    getDashboardAdminDataSuccess,
    getDashboardAdminDataFailure
} from 'app/pages/admin/admin-dashboard-page/screen/action';
import { adminDashboardPageEnum } from 'app/pages/admin/admin-dashboard-page/screen/types';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { apiMethod, requestAPIWithToken } from 'utils/request';
import { API_URL } from 'utils/config';
import { API_CALL } from 'utils/api';

/**
 * Get admin dashboard
 *
 * @param {Object} action
 *
 */
export function* getAdminDashboardSaga({
    payload,
}: ReturnType<typeof getDashboardAdminRequest>) {
    try {
        const url = `${API_URL}${API_CALL?.API_ADMIN_DASHBOARD}`;

        const response = yield call(requestAPIWithToken, url, apiMethod.GET, '');
        yield put(getDashboardAdminSuccess(response?.data));
    } catch (error: any) {
        yield put(getDashboardAdminFailure(error?.response, error.message));
    }
}


/**
 * Get admin dashboard data
 *
 * @param {Object} action
 *
 */
export function* getAdminDashboardDataSaga({
    payload,
}: ReturnType<typeof getDashboardAdminDataRequest>) {
    try {
        const url = `${API_URL}${API_CALL?.API_ADMIN_DASHBOARD_DATA}?year=${payload?.year}`;

        const response = yield call(requestAPIWithToken, url, apiMethod.GET, '');
        yield put(getDashboardAdminDataSuccess(response?.data));
    } catch (error: any) {
        yield put(getDashboardAdminDataFailure(error?.response, error.message));
    }
}


/**
 *  Sagas
 */
export default function* root() {
    yield all([takeLatest(adminDashboardPageEnum.ADMIN_DASHBOARD_REQUEST, getAdminDashboardSaga),
        takeLatest(adminDashboardPageEnum.ADMIN_DASHBOARD_DATA_REQUEST, getAdminDashboardDataSaga)
    ]);
}
