import {
    getListPostRequest, getListPostSuccess,
    getListPostFailure,
    createPostRequest, createPostSuccess, createPostFailure,
    getPostTypeRequest, getPostTypeSuccess, getPostTypeFailure,
    extendPostRequest, extendPostSuccess, extendPostFailure,
    verifyPostRequest,
    verifyPostSuccess,
    verifyPostFailure,
    verifyPostAgainRequest,
    verifyPostAgainSuccess,
    verifyPostAgainFailure,
    searchPostRequest,
    searchPostSuccess,
    searchPostFailure,
    deletePostRequest,
    deletePostSuccess,
    deletePostFailure
} from 'app/pages/landlord/host-post-management-page/screen/action';
import { hostPostpageEnum } from 'app/pages/landlord/host-post-management-page/screen/types';
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
        const url = `${API_URL}${API_CALL?.API_POST_BY_TOKEN}`;

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
 * Create new Post
 *
 * @param {Object} action
 *
 */
export function* createPostSaga({
    payload,
}: ReturnType<typeof createPostRequest>) {
    try {
        const url = `${API_URL}${API_CALL?.API_POST}`;

        const response = yield call(requestAPIWithToken, url, apiMethod.POST, payload);
        yield put(createPostSuccess(response?.data));
    } catch (error: any) {
        yield put(createPostFailure(error?.response, error.message));
    }
}


/**
 * Get List Post type
 *
 * @param {Object} action
 *
 */
export function* getListPostTypeSaga({
    payload,
}: ReturnType<typeof getPostTypeRequest>) {
    try {
        const url = `${API_URL}${API_CALL?.API_POST_TYPE}`;

        const response = yield call(requestAPIWithToken, url, apiMethod.GET, '');
        yield put(getPostTypeSuccess(response?.data));
    } catch (error: any) {
        yield put(getPostTypeFailure(error?.response, error.message));
    }
}

/**
 * Extend post
 *
 * @param {Object} action
 *
 */
export function* extendPosteSaga({
    payload,
}: ReturnType<typeof extendPostRequest>) {
    try {
        const url = `${API_URL}${API_CALL?.API_EXTEND_POST}`;

        const response = yield call(requestAPIWithToken, url, apiMethod.PUT, payload);
        yield put(extendPostSuccess(response?.data));
    } catch (error: any) {
        yield put(extendPostFailure(error?.response, error.message));
    }
}


/**
 * request verify post
 *
 * @param {Object} action
 *
 */
export function* requestVerifyPostSaga({
    payload,
}: ReturnType<typeof verifyPostRequest>) {
    try {
        const url = `${API_URL}${API_CALL?.API_POST_VERIFY}?id=${payload?.id}`;

        const response = yield call(requestAPIWithToken, url, apiMethod.POST, payload);
        yield put(verifyPostSuccess(response?.data));
    } catch (error: any) {
        yield put(verifyPostFailure(error?.response, error.message));
    }
}



/**
 * request verify post again
 *
 * @param {Object} action
 *
 */
export function* requestVerifyPostAgainSaga({
    payload,
}: ReturnType<typeof verifyPostAgainRequest>) {
    try {
        const url = `${API_URL}${API_CALL?.API_ADMIN_POST_VERIFY_AGAIN}?id=${payload?.id}`;

        const response = yield call(requestAPIWithToken, url, apiMethod.POST, payload);
        yield put(verifyPostAgainSuccess(response?.data));
    } catch (error: any) {
        yield put(verifyPostAgainFailure(error?.response, error.message));
    }
}



/**
 * delete host post
 *
 * @param {Object} action
 *
 */
export function* deleteHostPostSaga({
    payload,
}: ReturnType<typeof deletePostRequest>) {
    try {
        const url = `${API_URL}${API_CALL?.API_POST}?id=${payload?.id}`;

        const response = yield call(requestAPIWithToken, url, apiMethod.DELETE, '');
        yield put(deletePostSuccess(response?.data));
    } catch (error: any) {
        yield put(deletePostFailure(error?.response, error.message));
    }
}


/**
 *  Sagas
 */
export default function* root() {
    yield all([takeLatest(hostPostpageEnum.GET_POST_HOST_REQUEST, getListPostSaga),
    takeLatest(hostPostpageEnum.CREATE_POST_HOST_REQUEST, createPostSaga),
    takeLatest(hostPostpageEnum.GET_POST_HOST_REQUEST, getListPostTypeSaga),
    takeLatest(hostPostpageEnum.VERIFY_POST_HOST_REQUEST, requestVerifyPostSaga),
    takeLatest(hostPostpageEnum.EXTEND_POST_HOST_REQUEST, extendPosteSaga),
    takeLatest(hostPostpageEnum.VERIFY_POST_HOST_AGAIN_REQUEST, requestVerifyPostAgainSaga),
    takeLatest(hostPostpageEnum.SEARCH_POST_HOST_REQUEST, searchPostSaga),
    takeLatest(hostPostpageEnum.DELETE_POST_HOST_REQUEST, deleteHostPostSaga),
    ]);
}
