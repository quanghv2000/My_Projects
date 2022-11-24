import React from 'react';
import { UserLayout } from 'app/layouts/user-layout';

type IProps = {};

const HomePage: React.FC<IProps> = () => {
  return (
    <>
      <div className="text-center" style={{ height: '500px' }}>
        <h1>Home Page</h1>
      </div>
    </>
  );
};

export default UserLayout(HomePage);
