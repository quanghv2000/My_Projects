import {
  deleteFeedbackRequest,
  deleteFeedbackSuccess,
  deleteFeedbackFailure,
} from 'app/pages/admin/admin-feedback-management-page/screen/action';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { adminFeedbackPageEnum } from 'app/pages/admin/admin-feedback-management-page/screen/type';
import { apiMethod, requestAPIWithToken } from 'utils/request';
import { API_URL } from 'utils/config';
import { API_CALL } from 'utils/api';

/**
 * delete feedback
 *
 * @param {Object} action
 *
 */

export function* deleteFeedbackSaga({
  payload,
}: ReturnType<typeof deleteFeedbackRequest>) {
  try {
    const response = yield call(
      requestAPIWithToken,
      `${API_URL}${API_CALL?.API_FEEDBACK}/${payload?.id}`,
      apiMethod.DELETE,
      ''
    );
    yield put(deleteFeedbackSuccess(response?.data));
  } catch (error: any) {
    yield put(deleteFeedbackFailure(error?.response, error.message));
  }
}

export default function* root() {
  yield all([
    takeLatest(
        adminFeedbackPageEnum.DELETE_FEEDBACK_REQUEST,
      deleteFeedbackSaga
    ),
  ]);
}
