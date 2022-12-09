import { LocalStorage } from 'utils/constants';
import { all, takeLatest, call, put, delay } from 'redux-saga/effects';
import { closeLoadingSpinnerAction, openLoadingSpinnerAction } from 'app/layouts/main-layout/actions';
import { signInActionType, signInFailureAction, signInRequestAction, signInSuccessAction } from '../actions';
import { signInService } from '../services';
import { ISignInResponse } from '../models';

/**
 * Before this function is executed, it is necessary to dispatch GET_USER_REQUEST
 * Import function to @Root_Saga_Sign_In
 */
export function* signInSaga(action: ReturnType<typeof signInRequestAction>): Generator {
  const { payload } = action;

  try {
    yield put(openLoadingSpinnerAction());
    yield delay(1000);

    const signInResponse: ISignInResponse | any = yield call(() => signInService(payload));
    const { accessToken } = signInResponse;

    localStorage.setItem(LocalStorage.ACCESS_TOKEN, accessToken);

    yield put(signInSuccessAction());
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
