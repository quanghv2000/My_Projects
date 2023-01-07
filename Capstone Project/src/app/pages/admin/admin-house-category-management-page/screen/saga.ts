import { adminPageAccountEnum } from 'app/pages/admin/admin-account-management-page/screen/types';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';
import { API_URL } from 'utils/config';

/**
 * Get Repos
 *
 * @param {Object} action
 *
 */
// export function* getDataSaga({
//   payload,
// }: ReturnType<typeof getDataUserRequest>) {
//   try {
//     const data = yield call(request, `${API_URL}/user`);
//     yield put(
//       getDataUserSuccess(data, {
//         cached: true,
//         query: payload,
//         updatedAt: 0,
//       })
//     );
//   } catch (error: any) {
//     yield put(getDataUserFailure(error.message, payload));
//   }
// }

// /**
//  * GitHub Sagas
//  */
// export default function* root() {
//   yield all([takeLatest(adminPageAccountEnum.LOAD_DATA_USER_REQUEST, getDataSaga)]);
// }
