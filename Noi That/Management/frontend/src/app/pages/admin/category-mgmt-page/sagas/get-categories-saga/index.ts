import { call, put } from 'redux-saga/effects';
import {
  getCategoriesFailureAction,
  getCategoriesRequestAction,
  getCategoriesSuccessAction,
} from '../../actions';
import { getAllCategoriesServices } from '../../services';

/**
 * Before this function is executed, it is necessary to dispatch GET_USER_REQUEST
 * Import function to @Root_Saga_Category_MGMT
 */
export function* getCategoriesSaga({
  payload,
}: ReturnType<typeof getCategoriesRequestAction>) {
  try {
    const categoriesInfo = yield call(getAllCategoriesServices);
    yield put(getCategoriesSuccessAction(categoriesInfo));
  } catch (error: any) {
    yield put(getCategoriesFailureAction(error));
  }
}
