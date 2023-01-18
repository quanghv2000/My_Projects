import { all, call, put, takeLatest } from 'redux-saga/effects';
import { IProductInfoResponse, IUserInfoResponse } from 'models';
import { getProductListService, getUserListService } from 'services';
import {
  getDataListPageFailureAction,
  getDataListPageSuccessAction,
  listPageActionType
} from 'reducers/list-page/actions';
import { closeLoadingSpinnerAction } from 'reducers/global/actions';

export function* getDataListPageSaga(): Generator<any, any, any> {
  try {
    const userList: IUserInfoResponse[] = yield call(() => getUserListService());
    const productList: IProductInfoResponse[] = yield call(() => getProductListService());

    yield put(getDataListPageSuccessAction({ userList, productList }));
  } catch (error) {
    yield put(getDataListPageFailureAction());
  } finally {
    yield put(closeLoadingSpinnerAction());
  }
}

/** @Root_Saga_List_Page */
export default function* root() {
  yield all([takeLatest(listPageActionType.GET_DATA_LIST_PAGE_REQUEST, getDataListPageSaga)]);
}
