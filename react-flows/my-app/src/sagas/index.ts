import { all } from 'redux-saga/effects';
import signInSagas from './sign-in';
import signUpSagas from './sign-up';
import listPageSagas from './list-page';

export default function* rootSaga() {
  yield all([signInSagas(), signUpSagas(), listPageSagas()]);
}
