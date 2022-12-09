import { IUserLoggedInfo } from 'models/api-model/response/user-logged-info';

export type GlobalReducerType = {
  userLoggedInfo: IUserLoggedInfo;
  loadingSpinner: boolean;
  modalOpening: string;
};

export type OpenModalPayloadType = string;
export type GetUserLoggedInfoPayloadType = IUserLoggedInfo;
