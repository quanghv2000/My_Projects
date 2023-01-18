import { all, call, delay, put, takeLatest } from 'redux-saga/effects';
import {
  signUpActionType,
  signUpFailureAction,
  signUpRequestAction,
  signUpSuccessAction,
  unsaveFormAction
} from 'reducers/sign-up/actions';
import { closeLoadingSpinnerAction, openLoadingSpinnerAction } from 'reducers/global/actions';
import { signUpService } from 'services';
import { ISignUpResponse } from 'models';
import { DELAY_TIME } from 'utils/constants';

/**
 * Before this function is executed, it is necessary to dispatch GET_USER_REQUEST
 * Import function to @Root_Saga_Sign_Up
 */
export function* signUpSaga(action: ReturnType<typeof signUpRequestAction>): Generator<any, any, any> {
  const { payload } = action;

  try {
    yield put(openLoadingSpinnerAction());
    yield delay(DELAY_TIME);

    const signUpResponse: ISignUpResponse = yield call(() => signUpService(payload));

    yield put(signUpSuccessAction(signUpResponse));
    yield put(unsaveFormAction());
  } catch (error: any) {
    yield put(signUpFailureAction({ statusCode: 400, message: error.message }));
  } finally {
    yield put(closeLoadingSpinnerAction());
  }
}

/** @Root_Saga_Sign_Up */
export default function* root() {
  yield all([takeLatest(signUpActionType.SIGN_UP_REQUEST, signUpSaga)]);
}
