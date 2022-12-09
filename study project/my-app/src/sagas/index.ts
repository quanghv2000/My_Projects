import { all } from 'redux-saga/effects';
import signInSagas from 'app/modals/sign-in-modal/sagas';

export default function* rootSaga() {
  yield all([signInSagas()]);
}
