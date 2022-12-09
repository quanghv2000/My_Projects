import { all, takeLatest, call, put } from 'redux-saga/effects';
import {
  getUserInfoLoggedFailureAction,
  getUserInfoLoggedRequestAction,
  getUserInfoLoggedSuccessAction,
  globalActionType
} from 'app/layouts/main-layout/actions';
import { IUserLoggedInfo } from 'models/api-model/response/user-logged-info';
import { getAccountService } from '../services';

/**
 * Before this function is executed, it is necessary to dispatch GET_USER_REQUEST
 * Import function to @Root_Saga_Sign_In
 */
export function* getUserLoggedInfoSaga(action: ReturnType<typeof getUserInfoLoggedRequestAction>): Generator {
  try {
    const userLoggedInfo: IUserLoggedInfo | any = yield call(() => getAccountService());

    yield put(getUserInfoLoggedSuccessAction(userLoggedInfo));
  } catch (error: any) {
    yield put(getUserInfoLoggedFailureAction());
  }
}

/** @Root_Saga_Sign_In */
export default function* root() {
  yield all([takeLatest(globalActionType.GET_USER_LOGGED_INFO_REQUEST, getUserLoggedInfoSaga)]);
}
