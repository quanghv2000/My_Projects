import { createAction } from '@reduxjs/toolkit';
import { adminPagePostingCostEnum } from 'app/pages/admin/admin-posting-cost-management-page/screen/types';
import { actionPayload } from 'helper/index';

export interface GetReposSuccessMeta {
  cached: boolean;
  query: string;
  updatedAt: number;
}

// Get action
export const getDataPostingCostRequest = createAction<string>(
  adminPagePostingCostEnum.GET_DATA_POSTING_COST_REQUEST
);
export const getDataPostingCostSuccess = createAction(
  adminPagePostingCostEnum.GET_DATA_POSTING_COST_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const getDataPostingCostFailure = createAction(
  adminPagePostingCostEnum.GET_DATA_POSTING_COST_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

// Create action
export const createDataPostingCostRequest = createAction<string>(
  adminPagePostingCostEnum.CREATE_DATA_POSTING_COST_REQUEST
);
export const createDataPostingCostSuccess = createAction(
  adminPagePostingCostEnum.CREATE_DATA_POSTING_COST_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const createDataPostingCostFailure = createAction(
  adminPagePostingCostEnum.CREATE_DATA_POSTING_COST_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

// Update action
export const updateDataPostingCostRequest = createAction<string>(
  adminPagePostingCostEnum.UPDATE_DATA_POSTING_COST_REQUEST
);
export const updateDataPostingCostSuccess = createAction(
  adminPagePostingCostEnum.UPDATE_DATA_POSTING_COST_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const updateDataPostingCostFailure = createAction(
  adminPagePostingCostEnum.UPDATE_DATA_POSTING_COST_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

// Delete action
export const deleteDataPostingCostRequest = createAction<any>(
  adminPagePostingCostEnum.DELETE_DATA_POSTING_COST_REQUEST
);
export const deleteDataPostingCostSuccess = createAction(
  adminPagePostingCostEnum.DELETE_DATA_POSTING_COST_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const deleteDataPostingCostFailure = createAction(
  adminPagePostingCostEnum.DELETE_DATA_POSTING_COST_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

export const clearStateRoomCategory = createAction<any>(
  adminPagePostingCostEnum.CLEAR_POSTING_COST_STATE
);
