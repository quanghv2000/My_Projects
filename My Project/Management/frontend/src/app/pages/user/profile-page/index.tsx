import React from 'react';
import jwt from 'jwt-decode';
import { UserLayout } from 'app/layouts/user-layout';
import { LocalStorage } from 'utils/constants';

type IProps = {};

const ProfilePage: React.FC<IProps> = () => {
  const accessToken = localStorage.getItem(LocalStorage.ACCESS_TOKEN);

  const userInfo: any = accessToken ? jwt(accessToken) : null;

  console.log('userInfo: ', userInfo);

  return (
    <>
      <div className="text-center" style={{ height: '500px' }}>
        <h1>Profile Page</h1>
        <h5>ID: {userInfo?.id}</h5>
        <h5>Username: {userInfo?.username}</h5>
        <h5>Roles: {userInfo?.authorities}</h5>
      </div>
    </>
  );
};

export default UserLayout(ProfilePage);
