import React from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from 'types/root-state';
import { ExportFile } from 'components/export-file';

export const UserList: React.FC = () => {
  /** @Stored_Data */
  const userList = useSelector((state: IRootState) => state.ListPageReducer.userList);

  return (
    <div className="users-table">
      <div className="d-flex justify-content-between align-items-center">
        <h3>User List</h3>
        <ExportFile data={userList} filename="users" tableId="users-table" fontSize={8} />
      </div>
      <br />
      <table className="table table-striped table-bordered" id="users-table">
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
          {userList.map((user, index) => (
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
  );
};
