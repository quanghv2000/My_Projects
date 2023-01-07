import { createAction } from '@reduxjs/toolkit';
import { settingAccountPageEnum } from 'app/pages/user/settings-account-page/screen/types';
import { actionPayload } from 'helper/index';

export const changePasswordRequest = createAction<any>(
  settingAccountPageEnum.CHANGE_PASSWORD_REQUEST
);
export const changePasswordSuccess = createAction(
  settingAccountPageEnum.CHANGE_PASSWORD_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const changePasswordFailure = createAction(
  settingAccountPageEnum.CHANGE_PASSWORD_FAILURE,
  (payload: any, query: string) => actionPayload(payload, { query })
);


// update role host

export const updateRoleHostRequest = createAction<any>(
  settingAccountPageEnum.UPDATE_ROLE_REQUEST
);
export const updateRoleHostSuccess = createAction(
  settingAccountPageEnum.UPDATE_ROLE_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const updateRoleHostFailure = createAction(
  settingAccountPageEnum.UPDATE_ROLE_FAILURE,
  (payload: any, query: string) => actionPayload(payload, { query })
);

export const clearSettingAccountSignUp = createAction<any>(
  settingAccountPageEnum.CLEAR_SETTING_STATE
);
