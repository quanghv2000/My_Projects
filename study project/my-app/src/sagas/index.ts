import { all } from 'redux-saga/effects';
import signInSagas from 'app/modals/sign-in-modal/sagas';
import getUserLoggedInfoSaga from 'app/layouts/main-layout/sagas';

export default function* rootSaga() {
  yield all([signInSagas(), getUserLoggedInfoSaga()]);
}
