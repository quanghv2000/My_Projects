import { delay, put } from 'redux-saga/effects';
import {
  addUserFailureAction,
  addUserRequestAction,
  addUserSuccessAction,
} from '../../actions';

/**
 * Before this function is executed, it is necessary to dispatch GET_USER_REQUEST
 * Import function to @Root_Saga_User_MGMT
 */
export function* addUserSaga({
  payload,
}: ReturnType<typeof addUserRequestAction>) {
  try {
    yield delay(250);
    yield put(addUserSuccessAction(payload));
  } catch (error: any) {
    yield put(addUserFailureAction(error));
  }
}
