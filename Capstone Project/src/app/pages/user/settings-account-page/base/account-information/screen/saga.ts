import { call, put } from 'redux-saga/effects';
import { API_CALL } from 'utils/api';
import { API_URL } from 'utils/config';
import { apiMethod, requestAPIWithToken } from 'utils/request';
import {
  updateUserInformationFailure,
  updateUserInformationSuccess,
} from './action';
import { userInformationEnum } from './types';

/**
 * update user information
 *
 * @param {Object} action
 *
 */

export function* updateUserInformationSaga({
  payload,
}: ReturnType<typeof updateUserInformationSuccess>) {
  try {
    const response = yield call(
      requestAPIWithToken,
      `${API_URL}${API_CALL?.API_UPDATE_USER_INFORMATION}`,
      apiMethod.PUT,
      payload
    );

    yield put(updateUserInformationSuccess(response?.data));
  } catch (error: any) {
    yield put(updateUserInformationFailure(error?.response, error.message));
  }
}
