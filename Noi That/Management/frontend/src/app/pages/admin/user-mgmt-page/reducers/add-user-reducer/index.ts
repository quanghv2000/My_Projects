import { adminAddUserActionType } from '../../actions';

export const addUserReducer = {
  [adminAddUserActionType.ADD_USER_REQUEST]: (state, action) => {
    state.isLoading = true;

    return state;
  },
  [adminAddUserActionType.ADD_USER_SUCCESS]: (state, action) => {
    const {
      payload: { newUser },
    } = action;

    state.isLoading = false;
    state.usersInfo.push(newUser);

    return state;
  },
  [adminAddUserActionType.ADD_USER_FAILURE]: (state, action) => {
    state.isLoading = false;

    return state;
  },
};
