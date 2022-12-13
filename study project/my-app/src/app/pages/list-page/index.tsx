import React from 'react';
import { useDispatch } from 'react-redux';
import { getProductInfoListSuccessAction, getUserInfoListSuccessAction } from './actions';
import { getProductInfosService, getUserInfosService } from './services';
import { UserList, ProductList } from './components';

export const ListPage: React.FC = () => {
  /** @Use_Ref */
  const isCmpMounted = React.useRef<boolean>(false);

  /** @Dispatch */
  const dispatch = useDispatch();

  /** @Effect */
  React.useEffect(() => {
    if (isCmpMounted.current) {
      const initialData = async () => {
        const userInfoList = await getUserInfosService();
        const productInfoList = await getProductInfosService();

        dispatch(getUserInfoListSuccessAction(userInfoList));
        dispatch(getProductInfoListSuccessAction(productInfoList));
      };

      initialData();
    }

    isCmpMounted.current = true;
  }, []);

  return (
    <div className="mt-5">
      <h1 className="text-center mb-4">List Page</h1>
      <div className="container">
        <UserList />
        <br />
        <hr />
        <br />
        <ProductList />
      </div>
    </div>
  );
};
