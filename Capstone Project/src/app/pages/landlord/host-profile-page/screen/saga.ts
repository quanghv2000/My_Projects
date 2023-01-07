import {
    createDepositRequest,
    createDepositSuccess,
    createDepositFailure,
    getTransactionRequest,
    getTransactionSuccess,
    getTransactionFailure,
    getUserInfoSuccess,
    getUserInfoRequest,
    getUserInfoFailure,
    updateUserInfoRequest,
    updateUserInfoSuccess,
    updateUserInfoFailure,
    getUserInfoByIdRequest,
    getUserInfoByIdSuccess,
    getUserInfoByIdFailure,
    updateUserImageRequest,
    updateUserImageSuccess,
    updateUserImageFailure,
    searchTransactionRequest,
    searchTransactionSuccess,
    searchTransactionFailure
} from 'app/pages/landlord/host-profile-page/screen/action';
import { hostProfileEnum } from 'app/pages/landlord/host-profile-page/screen/types';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { requestAPIWithToken, apiMethod } from 'utils/request';
import { API_URL } from 'utils/config';
import { API_CALL } from 'utils/api';




/**
 * Create new deposit
 *
 * @param {Object} action
 *
 */

export function* createDepositSaga({
    payload,
}: ReturnType<typeof createDepositRequest>) {
    try {
        const response = yield call(
            requestAPIWithToken,
            `${API_URL}${API_CALL?.API_DEPOSIT}`,
            apiMethod.POST,
            payload
        );
        yield put(createDepositSuccess(response?.data));
    } catch (error: any) {
        yield put(createDepositFailure(error?.response, error.message));
    }
}


/**
 * get transaction
 *
 * @param {Object} action
 *
 */

export function* getTransactionSaga({
    payload,
}: ReturnType<typeof getTransactionRequest>) {
    try {
        const url = `${API_URL}${API_CALL?.API_TRANSACTION_USER}`;

        const response = yield call(requestAPIWithToken, url, apiMethod.GET, '');
        yield put(getTransactionSuccess(response?.data));
    } catch (error: any) {
        yield put(getTransactionFailure(error?.response, error.message));
    }
}


/**
 * search transaction
 *
 * @param {Object} action
 *
 */

export function* searchTransactionSaga({
    payload,
}: ReturnType<typeof searchTransactionRequest>) {
    try {
        const url = `${API_URL}${API_CALL?.API_HOST_SEARCH_TRANSACTION}`;

        const response = yield call(requestAPIWithToken, url, apiMethod.POST, payload);
        yield put(searchTransactionSuccess(response?.data));
    } catch (error: any) {
        yield put(searchTransactionFailure(error?.response, error.message));
    }
}


/**
 * get user information
 *
 * @param {Object} action
 *
 */

export function* getUserInformationSaga({
    payload,
}: ReturnType<typeof getUserInfoRequest>) {
    try {
        const response = yield call(
            requestAPIWithToken,
            `${API_URL}${API_CALL?.API_GET_USER_INFOR}`,
            apiMethod.GET,
            ''
        );
        // setCookie('user-info', JSON.stringify(response?.data?.results), 3600);
        yield put(getUserInfoSuccess(response?.data));
    } catch (error: any) {
        yield put(getUserInfoFailure(error?.response, error.message));
    }
}

/**
 * get user information by id
 *
 * @param {Object} action
 *
 */

export function* getUserInformationByIDSaga({
    payload,
}: ReturnType<typeof getUserInfoByIdRequest>) {
    const id = payload?.id
    const url = `${API_URL}${API_CALL?.API_GET_USER_INFOR}/${id}`
    try {
        const response = yield call(
            requestAPIWithToken,
            url
            ,
            apiMethod.GET,
            ''
        );
        // setCookie('user-info', JSON.stringify(response?.data?.results), 3600);
        yield put(getUserInfoByIdSuccess(response?.data));
    } catch (error: any) {
        yield put(getUserInfoByIdFailure(error?.response, error.message));
    }
}



/**
 * update user information
 *
 * @param {Object} action
 *
 */

export function* updateUserInformationSaga({
    payload,
}: ReturnType<typeof updateUserInfoRequest>) {
    try {
        const response = yield call(
            requestAPIWithToken,
            `${API_URL}${API_CALL?.API_ACCOUNT}`,
            apiMethod.PUT,
            payload
        );
        yield put(updateUserInfoSuccess(response?.data));
    } catch (error: any) {
        yield put(updateUserInfoFailure(error?.response, error.message));
    }
}


/**
 * update user image
 *
 * @param {Object} action
 *
 */

export function* updateUserImageSaga({
    payload,
}: ReturnType<typeof updateUserImageRequest>) {
    try {
        const response = yield call(
            requestAPIWithToken,
            `${API_URL}${API_CALL?.API_UPLOAD_IMAGE_ACCOUNT}`,
            apiMethod.PUT,
            payload
        );
        yield put(updateUserImageSuccess(response?.data));
    } catch (error: any) {
        yield put(updateUserImageFailure(error?.response, error.message));
    }
}

export default function* root() {
    yield all([
        takeLatest(
            hostProfileEnum.CREATE_DEPOSIT_REQUEST,
            createDepositSaga
        ),
        takeLatest(
            hostProfileEnum.GET_TRANSACTION_REQUEST,
            getTransactionSaga
        ),
        takeLatest(
            hostProfileEnum.GET_USER_INFO_REQUEST,
            getUserInformationSaga
        ),
        takeLatest(
            hostProfileEnum.UPDATE_USER_INFO_REQUEST,
            updateUserInformationSaga
        ),
        takeLatest(
            hostProfileEnum.UPDATE_USER_IMAGE_REQUEST,
            updateUserImageSaga
        ),
        takeLatest(
            hostProfileEnum.GET_USER_INFO_BY_ID_REQUEST,
            getUserInformationByIDSaga
        ),
        takeLatest(
            hostProfileEnum.SEARCH_TRANSACTION_REQUEST,
            searchTransactionSaga
        ),
    ]);
}

