import React from 'react';
import { useDispatch } from 'react-redux';
import { ProductList, UserList } from 'components';
import { getDataListPageRequestAction } from 'reducers/list-page/actions';
import { LocalValueManager } from 'helpers/local-value-manager';
import _ from 'lodash';

export const ListPage: React.FC = () => {
  /** @Dispatch */
  const dispatch = useDispatch();

  /** @Effect */
  React.useEffect(() => {
    dispatch(getDataListPageRequestAction());
  }, []);

  const lvmListPage = new LocalValueManager('ListPage');

  lvmListPage.setValue({ key: 'isValueChanged', value: true });
  console.log(lvmListPage.getValue({ key: 'isValueChanged' }));

  lvmListPage.remove({ key: 'isValueChanged' });
  console.log(lvmListPage.getValue({ key: 'isValueChanged' }));

  lvmListPage.reset();
  console.log(lvmListPage.getValue({ key: 'isValueChanged' }));

  console.log('_.isNil: ', _.isNil(''));

  return (
    <div className="mt-5">
      <div className="container">
        <UserList />
        <hr className="m-5 ms-0 me-0" />
        <ProductList />
      </div>
    </div>
  );
};
