import jwt from 'jwt-decode';
import { errorRespone } from 'helpers';
import { LocalStorage } from 'utils/constants';
import { all, takeLatest, call, put, delay } from 'redux-saga/effects';
import { closeLoadingSpinnerAction, openLoadingSpinnerAction } from 'app/layouts/main-layout/actions';
import { signInActionType, signInFailureAction, signInRequestAction, signInSuccessAction } from '../actions';
import { signInService } from '../services/sign-in';

/**
 * Before this function is executed, it is necessary to dispatch GET_USER_REQUEST
 * Import function to @Root_Saga_Sign_In
 */
export function* signInSaga(action: ReturnType<typeof signInRequestAction>): Generator {
  const { payload } = action;

  console.log('action: ', action);

  try {
    yield put(openLoadingSpinnerAction());
    yield delay(650);

    const signInRes: any = yield call(() => signInService(payload));
    const { accessToken } = signInRes;

    localStorage.setItem(LocalStorage.ACCESS_TOKEN, accessToken);

    const userInfo = jwt(accessToken);

    yield put(signInSuccessAction(userInfo));
    yield put(closeLoadingSpinnerAction());
  } catch (error: any) {
    yield put(signInFailureAction(errorRespone(error)));
    yield put(closeLoadingSpinnerAction());
  }
}

/** @Root_Saga_Sign_In */
export default function* root() {
  yield all([takeLatest(signInActionType.SIGN_IN_REQUEST, signInSaga)]);
}
