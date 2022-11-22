import { adminGetUsersActionType } from '../../actions';
import { UserMGMTPageReducerType } from '../types';

export const getUsersReducer = {
  [adminGetUsersActionType.GET_USER_REQUEST]: (
    state: UserMGMTPageReducerType,
  ) => {
    state.isLoadingPage = true;

    return state;
  },
  [adminGetUsersActionType.GET_USER_SUCCESS]: (
    state: UserMGMTPageReducerType,
    action,
  ) => {
    const { payload } = action;

    state.isLoadingPage = false;
    state.usersInfo = payload;

    return state;
  },
  [adminGetUsersActionType.GET_USER_FAILURE]: (state, action) => {
    state.isLoadingPage = false;
    state.error = action;

    return state;
  },
};
