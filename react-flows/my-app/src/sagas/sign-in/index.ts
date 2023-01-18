import { DELAY_TIME, AUTHED_STATUS } from 'utils/constants';
import { all, takeLatest, call, put, delay } from 'redux-saga/effects';
import { closeLoadingSpinnerAction, openLoadingSpinnerAction } from 'reducers/global/actions';
import { ISignInResponse } from 'models';
import { signInService } from 'services';
import {
  signInActionType,
  signInFailureAction,
  signInRequestAction,
  signInSuccessAction
} from 'reducers/sign-in/actions';
import { localStorageManager, sessionStorageManager } from 'helpers';

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
    localStorageManager.accessToken.setValue(accessToken);
    sessionStorageManager.authedStatus.setValue(AUTHED_STATUS.LOGGED);

    if (payload.rememberMe) {
      localStorageManager.rememberMe.setValue(JSON.stringify(payload.rememberMe));
    }

    yield put(signInSuccessAction());
  } catch (error: any) {
    yield put(signInFailureAction(error.message));
  } finally {
    yield put(closeLoadingSpinnerAction());
  }
}

/** @Root_Saga_Sign_In */
export default function* root() {
  yield all([takeLatest(signInActionType.SIGN_IN_REQUEST, signInSaga)]);
}
