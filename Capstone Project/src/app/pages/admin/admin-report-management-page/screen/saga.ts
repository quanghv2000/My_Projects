import {
    getReportPostRequest,
    getReportPostSuccess, getReportPostFailure
} from 'app/pages/admin/admin-report-management-page/screen/action';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { adminReportPageEnum } from 'app/pages/admin/admin-report-management-page/screen/type';
import { apiMethod, requestAPIWithToken } from 'utils/request';
import { API_URL } from 'utils/config';
import { API_CALL } from 'utils/api';



/**
 * get report post
 *
 * @param {Object} action
 *
 */

export function* getReportPostSaga({ payload }: ReturnType<typeof getReportPostRequest>) {
    try {
        const response = yield call(
            requestAPIWithToken,
            `${API_URL}${API_CALL?.API_REPORT}`,
            apiMethod.GET,
            payload
        );
        yield put(getReportPostSuccess(response?.data));
    } catch (error: any) {
        yield put(getReportPostFailure(error?.response, error.message));
    }
}

export default function* root() {
    yield all([
        takeLatest(adminReportPageEnum.GET_REPORT_POST_REQUEST, getReportPostSaga),
    ]);
}
