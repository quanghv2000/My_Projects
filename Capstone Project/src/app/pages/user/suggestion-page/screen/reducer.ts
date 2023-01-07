import { createReducer } from '@reduxjs/toolkit';
import { searchPageEnum } from 'app/pages/user/suggestion-page/screen/types';
// import { setCookie } from 'utils/request';
// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  message: '',
  data: {},
  status: '',
  dataResponse: [],
  dataResponseMap: [],
  dataResponseTop8: [],
  dataResponseMore: [],
  dataSuggestion: [],
  action: 'search',
};

export const searchPageReducer = createReducer(initialState, (builder) => {
  builder
    // get posting
    .addCase(searchPageEnum.GET_HOUSE_POSTING_REQUEST, (state, action) => {
      state.dataResponse = [];
      state.loading = true;
      return state;
    })
    .addCase(searchPageEnum.GET_HOUSE_POSTING_SUCCESS, (state, action: any) => {
      state.loading = false;
      state.dataResponse = action?.payload?.results?.results;
      state.data = action?.payload?.results;
      // setCookie('token', action?.payload?.results?.jwttoken, 3600);
      return state;
    })
    .addCase(searchPageEnum.GET_HOUSE_POSTING_FAILURE, (state, action: any) => {
      state.loading = false;
      return state;
    })
    // get posting more

    .addCase(
      searchPageEnum.GET_HOUSE_POSTING_LOAD_MORE_REQUEST,
      (state, action) => {
        state.loading = true;
        state.dataResponseMore = [];
        return state;
      }
    )
    .addCase(
      searchPageEnum.GET_HOUSE_POSTING_LOAD_MORE_SUCCESS,
      (state, action: any) => {
        state.loading = false;
        const newArray = state.dataResponse;
        state.data = action?.payload?.results;
        state.dataResponseMore = action?.payload?.results?.results;
        state.dataResponse = newArray?.concat(state.dataResponseMore);
        return state;
      }
    )
    .addCase(
      searchPageEnum.GET_HOUSE_POSTING_LOAD_MORE_FAILURE,
      (state, action: any) => {
        state.loading = false;
        return state;
      }
    )

    // filter posting
    .addCase(searchPageEnum.FILTER_HOUSE_POSTING_REQUEST, (state, action) => {
      state.dataResponse = [];
      state.loading = true;
      state.status = '';
      return state;
    })
    .addCase(
      searchPageEnum.FILTER_HOUSE_POSTING_SUCCESS,
      (state, action: any) => {
        state.loading = false;
        state.dataResponse = action?.payload?.results?.results;
        state.data = action?.payload?.results;
        state.status = '200';
        // setCookie('token', action?.payload?.results?.jwttoken, 3600);
        return state;
      }
    )
    .addCase(
      searchPageEnum.FILTER_HOUSE_POSTING_FAILURE,
      (state, action: any) => {
        state.status = '';
        state.loading = false;
        return state;
      }
    )

    // filter posting on map
    .addCase(
      searchPageEnum.FILTER_HOUSE_POSTING_MAP_REQUEST,
      (state, action) => {
        state.dataResponseMap = [];
        state.loading = true;
        state.status = '';
        return state;
      }
    )
    .addCase(
      searchPageEnum.FILTER_HOUSE_POSTING_MAP_SUCCESS,
      (state, action: any) => {
        state.loading = false;
        state.dataResponseMap = action?.payload?.results;
        state.data = action?.payload?.results;
        state.status = '200';
        // setCookie('token', action?.payload?.results?.jwttoken, 3600);
        return state;
      }
    )
    .addCase(
      searchPageEnum.FILTER_HOUSE_POSTING_MAP_FAILURE,
      (state, action: any) => {
        state.dataResponseMap = [];
        state.status = '';
        state.loading = false;
        return state;
      }
    )

    // get posting suggestion
    .addCase(
      searchPageEnum.GET_HOUSE_POSTING_SUGGESTION_REQUEST,
      (state, action) => {
        state.dataSuggestion = [];
        state.loading = true;
        return state;
      }
    )
    .addCase(
      searchPageEnum.GET_HOUSE_POSTING_SUGGESTION_SUCCESS,
      (state, action: any) => {
        state.loading = false;
        state.dataSuggestion = action?.payload?.results;
        // setCookie('token', action?.payload?.results?.jwttoken, 3600);
        return state;
      }
    )
    .addCase(
      searchPageEnum.GET_HOUSE_POSTING_SUGGESTION_FAILURE,
      (state, action: any) => {
        state.loading = false;
        return state;
      }
    )

    // get post top 8

    .addCase(searchPageEnum.GET_POST_TOP_8_REQUEST, (state, action) => {
      state.dataResponseTop8 = [];
      state.loading = true;
      return state;
    })
    .addCase(searchPageEnum.GET_POST_TOP_8_SUCCESS, (state, action: any) => {
      state.loading = true;
      state.dataResponseTop8 = action?.payload?.results;
      return state;
    })
    .addCase(searchPageEnum.GET_POST_TOP_8_FAILURE, (state, action: any) => {
      state.loading = false;
      return state;
    })

    // get posting for map
    .addCase(searchPageEnum.GET_HOUSE_POSTING_MAP_REQUEST, (state, action) => {
      state.dataResponseMap = [];
      state.loading = true;
      return state;
    })
    .addCase(
      searchPageEnum.GET_HOUSE_POSTING_MAP_SUCCESS,
      (state, action: any) => {
        state.loading = true;
        state.dataResponseMap = action?.payload?.results;
        // setCookie('token', action?.payload?.results?.jwttoken, 3600);
        return state;
      }
    )
    .addCase(
      searchPageEnum.GET_HOUSE_POSTING_MAP_FAILURE,
      (state, action: any) => {
        state.loading = false;
        return state;
      }
    )

    // clear state
    .addCase(searchPageEnum.CLEAR_SEARCH_PAGE_STATE, (state, action: any) => {
      state.loading = false;
      state.message = '';
      state.status = '';
      state.action = 'search';
      state.dataResponse = [];
      return state;
    });
});
