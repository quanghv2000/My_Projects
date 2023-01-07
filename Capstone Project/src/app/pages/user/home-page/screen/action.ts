import { createAction } from '@reduxjs/toolkit';
import { homePageEnum } from 'app/pages/user/home-page/screen/types';
import { actionPayload } from 'helper/index';

export interface GetReposSuccessMeta {
  cached: boolean;
  query: string;
  updatedAt: number;
}

export const getDataRequest = createAction<string>(
  homePageEnum.LOAD_DATA_REQUEST
);
export const getDataSuccess = createAction(
  homePageEnum.LOAD_DATA_SUCCESS,
  (payload: Record<string, any>[], meta: GetReposSuccessMeta) =>
    actionPayload(payload, meta)
);
export const getDataFailure = createAction(
  homePageEnum.LOAD_DATA_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);
