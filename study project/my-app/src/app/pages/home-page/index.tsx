import React from 'react';
import { productsList, usersList } from './data';

export const HomePage: React.FC = () => (
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
    <h1>Home Page</h1>
    <div className="container">
      <div className="users-table">
        <h3>Users List</h3>
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
            {usersList.map((user, index) => (
              <tr key={index}>
                <th>{user}</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
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
            {productsList.map((product, index) => (
              <tr key={index}>
                <th>{product}</th>
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
