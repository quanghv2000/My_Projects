import { createAction } from '@reduxjs/toolkit';
import { searchPageEnum } from 'app/pages/user/suggestion-page/screen/types';
import { actionPayload } from 'helper/index';

// get posting
export const getHouseRequest = createAction<any>(
  searchPageEnum.GET_HOUSE_POSTING_REQUEST
);
export const getHouseSuccess = createAction(
  searchPageEnum.GET_HOUSE_POSTING_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const getHouseFailure = createAction(
  searchPageEnum.GET_HOUSE_POSTING_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

// get posting more
export const getHouseMoreRequest = createAction<any>(
  searchPageEnum.GET_HOUSE_POSTING_LOAD_MORE_REQUEST
);
export const getHouseMoreSuccess = createAction(
  searchPageEnum.GET_HOUSE_POSTING_LOAD_MORE_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const getHouseMoreFailure = createAction(
  searchPageEnum.GET_HOUSE_POSTING_LOAD_MORE_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

// get posting search
export const getHouseSuggestionRequest = createAction<any>(
  searchPageEnum.GET_HOUSE_POSTING_SUGGESTION_REQUEST
);
export const getHouseSuggestionSuccess = createAction(
  searchPageEnum.GET_HOUSE_POSTING_SUGGESTION_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const getHouseSuggestionFailure = createAction(
  searchPageEnum.GET_HOUSE_POSTING_SUGGESTION_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

//add to favourite

export const addToFavouriteRequest = createAction<any>(
  searchPageEnum.ADD_TO_FAVOURITE_REQUEST
);
export const addToFavouriteSuccess = createAction(
  searchPageEnum.ADD_TO_FAVOURITE_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const addToFavouriteFailure = createAction(
  searchPageEnum.ADD_TO_FAVOURITE_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

// get posting top 8
export const getPostingTop8Request = createAction<any>(
  searchPageEnum.GET_POST_TOP_8_REQUEST
);
export const getPostingTop8Success = createAction(
  searchPageEnum.GET_POST_TOP_8_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const getPostingTop8Failure = createAction(
  searchPageEnum.GET_POST_TOP_8_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

// get posting map
export const getHousePostingMapRequest = createAction<any>(
  searchPageEnum.GET_HOUSE_POSTING_MAP_REQUEST
);
export const getHousePostingMapSuccess = createAction(
  searchPageEnum.GET_HOUSE_POSTING_MAP_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const getHousePostingMapFailure = createAction(
  searchPageEnum.GET_HOUSE_POSTING_MAP_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

// filter posting
export const filterPostingRequest = createAction<any>(
  searchPageEnum.FILTER_HOUSE_POSTING_REQUEST
);
export const filterPostingSuccess = createAction(
  searchPageEnum.FILTER_HOUSE_POSTING_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const filterPostingFailure = createAction(
  searchPageEnum.FILTER_HOUSE_POSTING_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

// filter posting on map
export const filterPostingMapRequest = createAction<any>(
  searchPageEnum.FILTER_HOUSE_POSTING_MAP_REQUEST
);
export const filterPostingMapSuccess = createAction(
  searchPageEnum.FILTER_HOUSE_POSTING_MAP_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const filterPostingMapFailure = createAction(
  searchPageEnum.FILTER_HOUSE_POSTING_MAP_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

// clear state
export const clearState = createAction<any>(
  searchPageEnum.CLEAR_SEARCH_PAGE_STATE
);
