import { createAction } from '@reduxjs/toolkit';
import { adminDashboardPageEnum } from 'app/pages/admin/admin-dashboard-page/screen/types';
import { actionPayload } from 'helper/index';

export interface GetReposSuccessMeta {
  cached: boolean;
  query: string;
  updatedAt: number;
}

// get dashboard

export const getDashboardAdminRequest = createAction<string>(
  adminDashboardPageEnum.ADMIN_DASHBOARD_REQUEST
);
export const getDashboardAdminSuccess = createAction(
  adminDashboardPageEnum.ADMIN_DASHBOARD_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const getDashboardAdminFailure = createAction(
  adminDashboardPageEnum.ADMIN_DASHBOARD_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);


// get dashboard data

export const getDashboardAdminDataRequest = createAction<any>(
  adminDashboardPageEnum.ADMIN_DASHBOARD_DATA_REQUEST
);
export const getDashboardAdminDataSuccess = createAction(
  adminDashboardPageEnum.ADMIN_DASHBOARD_DATA_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const getDashboardAdminDataFailure = createAction(
  adminDashboardPageEnum.ADMIN_DASHBOARD_DATA_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

