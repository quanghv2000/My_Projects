import jwt from 'jwt-decode';
import { errorRespone } from 'helpers';
import { LocalStorage } from 'utils/constants';
import { all, takeLatest, call, put, delay } from 'redux-saga/effects';
import {
  signInActionType,
  signInFailureAction,
  signInRequestAction,
  signInSuccessAction,
} from '../actions';
import { signInServices } from '../services';

/**
 * Before this function is executed, it is necessary to dispatch GET_USER_REQUEST
 * Import function to @Root_Saga_Sign_In
 */
export function* signInSaga(action: ReturnType<typeof signInRequestAction>) {
  const { payload } = action;

  try {
    yield delay(300);

    const signInRes = yield call(() => signInServices(payload));
    const { accessToken } = signInRes;

    localStorage.setItem(LocalStorage.ACCESS_TOKEN, accessToken);

    const userInfo = jwt(accessToken);

    yield put(signInSuccessAction(userInfo));
  } catch (error: any) {
    yield put(signInFailureAction(errorRespone(error)));
  }
}

/** @Root_Saga_Sign_In */
export default function* root() {
  yield all([takeLatest(signInActionType.SIGN_IN_REQUEST, signInSaga)]);
}
