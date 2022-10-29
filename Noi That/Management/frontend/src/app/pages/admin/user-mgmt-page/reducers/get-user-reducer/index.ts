import { adminGetUsersActionType } from '../../actions';

export const getUsersReducer = {
  [adminGetUsersActionType.GET_USER_REQUEST]: (state, action) => {
    state.isLoading = true;

    return state;
  },
  [adminGetUsersActionType.GET_USER_SUCCESS]: (state, action) => {
    const { payload } = action;

    state.isLoading = false;
    state.usersInfo = payload;

    return state;
  },
  [adminGetUsersActionType.GET_USER_FAILURE]: (state, action) => {
    state.isLoading = false;

    return state;
  },
};
