import { createAction } from '@reduxjs/toolkit';
import { roomTenantPageEnum } from 'app/pages/landlord/room-tenants-page/screen/types';
import { actionPayload } from 'helper/index';

export interface GetReposSuccessMeta {
  cached: boolean;
  query: string;
  updatedAt: number;
}

export const getDataCustomerRequest = createAction<string>(
  roomTenantPageEnum.LOAD_DATA_CUSTOMER_REQUEST
);
export const getDataCustomerSuccess = createAction(
  roomTenantPageEnum.LOAD_DATA_CUSTOMER_SUCCESS,
  (payload: Record<string, any>[], meta: GetReposSuccessMeta) =>
    actionPayload(payload, meta)
);
export const getDataCustomerFailure = createAction(
  roomTenantPageEnum.LOAD_DATA_CUSTOMER_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);
