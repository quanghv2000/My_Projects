import { call, delay, put } from 'redux-saga/effects';
import { getUsersFailureAction, getUsersSuccessAction } from '../../actions';
import { getAllUsersServices } from '../../services';

/**
 * Before this function is executed, it is necessary to dispatch GET_USER_REQUEST
 * Import function to @Root_Saga_User_MGMT
 */
export function* getUsersSaga() {
  try {
    const usersInfo = yield call(getAllUsersServices);
    yield delay(250);
    yield put(getUsersSuccessAction(usersInfo));
  } catch (error: any) {
    yield put(getUsersFailureAction(error));
  }
}
