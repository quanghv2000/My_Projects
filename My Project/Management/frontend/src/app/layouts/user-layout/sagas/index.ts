import { errorRespone } from 'helpers';
import { all, takeLatest, put, call } from 'redux-saga/effects';
import { getAccountServices } from 'services';
import {
  getAccountActionType,
  getAccountFailureAction,
  getAccountRequestAction,
  getAccountSuccessAction,
} from '../actions';

/**
 * Before this function is executed, it is necessary to dispatch GET_USER_REQUEST
 * Import function to @Root_Saga_User_Layout
 */
export function* getAccountSaga() {
  try {
    const userInfo = yield call(() => getAccountServices());

    yield put(getAccountSuccessAction(userInfo));
  } catch (error: any) {
    yield put(getAccountFailureAction(errorRespone(error)));
  }
}

/** @Root_Saga_Get_Account */
export default function* root() {
  yield all([
    takeLatest(getAccountActionType.GET_ACCOUNT_REQUEST, getAccountSaga),
  ]);
}
