import { DELAY_TIME, LocalStorage } from 'utils/constants';
import { all, takeLatest, call, put, delay } from 'redux-saga/effects';
import {
  closeLoadingSpinnerAction,
  getUserInfoLoggedAction,
  openLoadingSpinnerAction
} from 'app/layouts/main-layout/actions';
import { IUserLoggedInfo } from 'models/api-model/response/user-infos/user-logged-info';
import { getAccountService } from 'app/layouts/main-layout/services';
import { signInActionType, signInFailureAction, signInRequestAction, signInSuccessAction } from '../actions';
import { signInService } from '../services';
import { ISignInResponse } from '../models';

/**
 * Before this function is executed, it is necessary to dispatch GET_USER_REQUEST
 * Import function to @Root_Saga_Sign_In
 */
export function* signInSaga(action: ReturnType<typeof signInRequestAction>): Generator<any, any, any> {
  const { payload } = action;

  try {
    yield put(openLoadingSpinnerAction());
    yield delay(DELAY_TIME);

    const signInResponse: ISignInResponse = yield call(() => signInService(payload));
    const { accessToken } = signInResponse;

    localStorage.setItem(LocalStorage.ACCESS_TOKEN, accessToken);

    const userLoggedInfo: IUserLoggedInfo = yield call(() => getAccountService());

    yield put(signInSuccessAction());
    yield put(getUserInfoLoggedAction(userLoggedInfo));
    yield put(closeLoadingSpinnerAction());
  } catch (error: any) {
    yield put(signInFailureAction());
    yield put(closeLoadingSpinnerAction());
  }
}

/** @Root_Saga_Sign_In */
export default function* root() {
  yield all([takeLatest(signInActionType.SIGN_IN_REQUEST, signInSaga)]);
}
