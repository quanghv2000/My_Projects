import { all, takeLatest } from 'redux-saga/effects';
import { getCategoriesActionType } from '../actions';
import { getCategoriesSaga } from './get-categories-saga';

/** @Root_Saga_Category_MGMT */
export default function* root() {
  yield all([
    takeLatest(
      getCategoriesActionType.GET_CATEGORIES_REQUEST,
      getCategoriesSaga,
    ),
  ]);
}
