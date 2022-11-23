import { all } from 'redux-saga/effects';
import adminUserMGMTSagas from 'app/pages/admin/user-mgmt-page/sagas';
import categoryMgmtSagas from 'app/pages/admin/category-mgmt-page/sagas';
import signInSagas from 'app/pages/auth/sign-in-page/sagas';

export default function* rootSaga() {
  yield all([adminUserMGMTSagas(), categoryMgmtSagas(), signInSagas()]);
}
