import { all } from 'redux-saga/effects';
import adminUserMGMTSagas from 'app/pages/admin/user-mgmt-page/sagas';

export default function* rootSaga() {
  yield all([adminUserMGMTSagas()]);
}
