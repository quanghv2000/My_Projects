import { createAction } from '@reduxjs/toolkit';
import { authenticationVerifyAccountEnum } from 'app/pages/authentication/verify-account/types';

import { actionPayload } from 'helper/index';

export const verifyaAccountRequest = createAction<any>(
  authenticationVerifyAccountEnum.VERIFY_ACCOUNT_REQUEST
);
export const verifyaAccountSuccess = createAction(
  authenticationVerifyAccountEnum.VERIFY_ACCOUNT_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const verifyaAccountFailure = createAction(
  authenticationVerifyAccountEnum.VERIFY_ACCOUNT_FAILURE,
  (payload: any, query: string) => actionPayload(payload, { query })
);
