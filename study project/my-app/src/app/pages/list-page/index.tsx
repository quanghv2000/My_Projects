import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from 'types/RootState';
import { getProductInfoListSuccessAction, getUserInfoListSuccessAction } from './actions';
import { getProductInfosService, getUserInfosService } from './services';

export const ListPage: React.FC = () => {
  /** @Stored_Data */
  const storedData = useSelector((state: IRootState) => state);
  const { userInfoList, productInfoList } = storedData.ListPageReducer;

  console.log('storedData list page: ', storedData);

  /** @Dispatch */
  const dispatch = useDispatch();

  /** @Effect */
  React.useEffect(() => {
    const getInitialData = async () => {
      const userInfoList = await getUserInfosService();
      const productInfoList = await getProductInfosService();

      dispatch(getUserInfoListSuccessAction(userInfoList));
      dispatch(getProductInfoListSuccessAction(productInfoList));
    };

    getInitialData();
  }, []);

  return (
    <div
      className="mt-5"
      style={{
        position: 'relative',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    >
      <h1>List Page</h1>
      <div className="container">
        <div className="users-table">
          <h3>Users List</h3>
          <br />
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Username</th>
                <th scope="col">Email address</th>
                <th scope="col">Phone number</th>
                <th scope="col">Full name</th>
                <th scope="col">Created by</th>
                <th scope="col">Created Date</th>
                <th scope="col">Roles</th>
              </tr>
            </thead>
            <tbody>
              {userInfoList.map((user, index) => (
                <tr key={index}>
                  <th>{user.id}</th>
                  <td>{user.login}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.firstName}</td>
                  <td>{user.createdBy}</td>
                  <td>{new Date().toDateString()}</td>
                  <td>{user.authorities}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <br />
        <hr />
        <br />
        <div className="products-table">
          <h3>Products List</h3>
          <br />
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              {productInfoList.map((product, index) => (
                <tr key={index}>
                  <th>{product.id}</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
