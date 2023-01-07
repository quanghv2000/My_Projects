import { createAction } from '@reduxjs/toolkit';
import { adminFeedbackPageEnum } from 'app/pages/admin/admin-feedback-management-page/screen/type';
import { actionPayload } from 'helper/index';

// delete Feedback
export const deleteFeedbackRequest = createAction<any>(
  adminFeedbackPageEnum.DELETE_FEEDBACK_REQUEST
);
export const deleteFeedbackSuccess = createAction(
  adminFeedbackPageEnum.DELETE_FEEDBACK_SUCCESS,
  (payload: Record<string, any>[]) => actionPayload(payload)
);
export const deleteFeedbackFailure = createAction(
  adminFeedbackPageEnum.DELETE_FEEDBACK_FAILURE,
  (payload: string, query: string) => actionPayload(payload, { query })
);

// clear state
export const clearState = createAction<any>(
    adminFeedbackPageEnum.CLEAR_FEEDBACK
  );
  
