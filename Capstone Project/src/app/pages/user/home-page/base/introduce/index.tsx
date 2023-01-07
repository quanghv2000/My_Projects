import * as React from 'react';
import { Link } from 'react-router-dom';
import 'app/pages/user/home-page/base/introduce/style.scss';
import { getCookie } from 'utils/request';

export const Introduce: React.FC<any> = () => {
  // const token = getCookie('token');
  // const userInfoCookies = getCookie('user-info');
  // let userInfo: any;
  // if (userInfoCookies) {
  //   userInfo = JSON.parse(userInfoCookies);
  // }
  return (
    <div className="mt-50 introduce__container">
      <h2
        className="bold"
        style={{ color: '#222222', fontSize: 28, padding: '0px 8px' }}
      >
        Chào mừng đến với Hola Houses!
      </h2>
      <p style={{ color: '#222222', fontSize: 16, padding: '0px 8px' }}>
        Tìm trọ, homestay, nhà nghỉ, KTX, dịch vụ, trải nghiệm và nhiều hơn nữa
        trên Hola Houses
      </p>
      {/* {!token && !userInfo ? (
        <p>
          <Link
            to={process.env.PUBLIC_URL + '/sign-in'}
            className="introduce__container--link"
            title="Login"
          >
            Đăng nhập
          </Link>
          hoặc{' '}
          <Link
            to={process.env.PUBLIC_URL + '/sign-up'}
            className="introduce__container--link"
            title="Register"
          >
            Đăng ký
          </Link>
          để khám phá !
        </p>
      ) : (
        ''
      )} */}
    </div>
  );
};
