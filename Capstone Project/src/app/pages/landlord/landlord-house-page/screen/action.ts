import { createAction } from '@reduxjs/toolkit';
import { landlordPageEnum } from 'app/pages/landlord/landlord-house-page/screen/types';
import { actionPayload } from 'helper/index';

export interface GetReposSuccessMeta {
  cached: boolean;
  query: string;
  updatedAt: number;
}

// get house

export const hostHouseGetRequest = createAction<any>(
  landlordPageEnum.GET_HOUSE_REQUEST
);
export const hostHouseGetSuccess = createAction(
  landlordPageEnum.GET_HOUSE_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const hostHouseGetFailure = createAction(
  landlordPageEnum.GET_HOUSE_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

// delete house

export const deleteHostHouseRequest = createAction<any>(
  landlordPageEnum.DELETE_HOUSE_REQUEST
);
export const deleteHostHouseSuccess = createAction(
  landlordPageEnum.DELETE_HOUSE_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const deleteHostHouseFailure = createAction(
  landlordPageEnum.DELETE_HOUSE_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);


// clear state
export const clearStateHostHouse= createAction<any>(
  landlordPageEnum.CLEAR_HOST_HOUSE_STATE
);
