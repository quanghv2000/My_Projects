import { all, takeLatest } from 'redux-saga/effects';
import { adminAddUserActionType, adminGetUsersActionType } from '../actions';
import { addUserSaga } from './add-user-saga';
import { getUsersSaga } from './get-users-saga';

/** @Root_Saga_User_MGMT */
export default function* root() {
  yield all([
    takeLatest(adminGetUsersActionType.GET_USER_REQUEST, getUsersSaga),
    takeLatest(adminAddUserActionType.ADD_USER_REQUEST, addUserSaga),
  ]);
}
