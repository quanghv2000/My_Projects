import { createAction } from '@reduxjs/toolkit';
import { hostDashboardPageEnum } from 'app/pages/landlord/host-dashboard/screen/types';
import { actionPayload } from 'helper/index';

export interface GetReposSuccessMeta {
  cached: boolean;
  query: string;
  updatedAt: number;
}

// get dashboard

export const getDashboardHostRequest = createAction<string>(
  hostDashboardPageEnum.HOST_DASHBOARD_REQUEST
);
export const getDashboardHostSuccess = createAction(
  hostDashboardPageEnum.HOST_DASHBOARD_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const getDashboardHostFailure = createAction(
  hostDashboardPageEnum.HOST_DASHBOARD_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);


// get dashboard data

export const getDashboardHostDataRequest = createAction<any>(
  hostDashboardPageEnum.HOST_DASHBOARD_DATA_REQUEST
);
export const getDashboardHostDataSuccess = createAction(
  hostDashboardPageEnum.HOST_DASHBOARD_DATA_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const getDashboardHostDataFailure = createAction(
  hostDashboardPageEnum.HOST_DASHBOARD_DATA_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

