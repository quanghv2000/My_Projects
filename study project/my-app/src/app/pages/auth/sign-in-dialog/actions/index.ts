export const signInActionType = {
  SIGN_IN_REQUEST: 'AUTH/SIGN_IN_REQUEST',
  SIGN_IN_SUCCESS: 'AUTH/SIGN_IN_SUCCESS',
  SIGN_IN_FAILURE: 'AUTH/SIGN_IN_FAILURE'
};

export const signInRequestAction = () => ({
  type: signInActionType.SIGN_IN_REQUEST
});

export const signInSuccessAction = (payload: any) => ({
  type: signInActionType.SIGN_IN_SUCCESS,
  payload
});

export const signInFailureAction = (payload: any) => ({
  type: signInActionType.SIGN_IN_FAILURE,
  payload
});
