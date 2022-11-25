import React from 'react';
import { UserLayout } from 'app/layouts/user-layout';

type IProps = {};

const HomePage: React.FC<IProps> = () => {
  return (
    <>
      <div className="text-center">
        <img
          src="https://t2.ta88.com/imgtop//2022/11/13/hr-home%E2%80%AF_wc-pc.webp"
          alt="carousel-img"
          style={{ width: '100%' }}
        />
      </div>
    </>
  );
};

export default UserLayout(HomePage);
