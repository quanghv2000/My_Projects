import { createReducer } from '@reduxjs/toolkit';
import { adminFeedbackPageEnum } from 'app/pages/admin/admin-feedback-management-page/screen/type';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  status: '',
};

export const adminFeedbackReducer = createReducer(initialState, (builder) => {
  builder
    // get detail room
    .addCase(adminFeedbackPageEnum.DELETE_FEEDBACK_REQUEST, (state, action) => {
      state.loading = true;
      state.status = '';
      return state;
    })
    .addCase(
      adminFeedbackPageEnum.DELETE_FEEDBACK_SUCCESS,
      (state, action: any) => {
        state.loading = false;
        state.status = '200';
        return state;
      }
    )
    .addCase(
      adminFeedbackPageEnum.DELETE_FEEDBACK_FAILURE,
      (state, action: any) => {
        state.loading = false;
        state.status = '400';
        return state;
      }
    )

    // clear state
    .addCase(adminFeedbackPageEnum.CLEAR_FEEDBACK, (state, action: any) => {
      state.loading = false;
      state.status = '';
      return state;
    });
});
