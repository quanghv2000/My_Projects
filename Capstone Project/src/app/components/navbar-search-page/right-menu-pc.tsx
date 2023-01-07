import React, { Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { translations } from 'locales/translations';
import { Avatar, Menu, Dropdown } from 'antd';
// import { eraseCookie, getCookie } from 'utils/request';
// import { LanguageSwitch } from 'app/components/language-switch';

export const RightMenuPC: React.FC<any> = () => {
  const history = useHistory();

  // const token = getCookie('token');
  const token = localStorage.getItem('token');
  const userInfoCookies = localStorage.getItem('user-info');
  // const userInfoCookies = getCookie('user-info');
  let userInfo: any;

  if (userInfoCookies) {
    userInfo = JSON.parse(userInfoCookies);
  }

  const logout = () => {
    // eraseCookie('token');
    // eraseCookie('user-info');
    localStorage.clear();
    window.location.href = '/';
  };

  const menu = (
    <Menu>
      <Menu.Item
        className="menu-signed"
        onClick={() => {
          return token && userInfo?.role?.id === 3
            ? history.push('/host/profile')
            : history.push('/user-profile');
        }}
      >
        {/* <i className="fa-solid fa-id-badge"></i> &nbsp; Thông tin cá nhân */}
        <i className="fa-solid fa-user mr-10"></i> Thông tin cá nhân
      </Menu.Item>
      {/* <Menu.Item
        className="menu-signed"
        onClick={() => history.push('/user/profile')}
      >
        <i className="fa-solid fa-user mr-10"></i>Cài đặt tài khoản
      </Menu.Item> */}
      <Menu.Item
        className="menu-signed"
        onClick={() => history.push('/user/wish-list')}
      >
        <i className="fa-solid fa-heart mr-10"></i>
        Danh sách yêu thích
      </Menu.Item>
      <Menu.Item className="menu-signed" onClick={logout}>
        <i className="fa-solid fa-arrow-right-from-bracket mr-10"></i>Đăng xuất
      </Menu.Item>
    </Menu>
  );

  //   <Link
  //   to={process.env.PUBLIC_URL + '/forum'}
  //   className="right__menu__pc__item"
  // >
  //   {/* {t(translations.navbarFeature.blog)} */}
  //   Diễn đàn
  //   <i className="fa-brands fa-blogger ml-5"></i>
  // </Link>

  const menuRight: any = () => {
    return (
      <div className="right__menu__pc">
        {token && userInfo?.role?.id === 3 ? (
          <Link
            to={process.env.PUBLIC_URL + '/host'}
            className="right__menu__pc__item"
          >
            {/* {t(translations.navbarFeature.host)} */}
            Chủ nhà
          </Link>
        ) : token && userInfo?.role?.id === 1 ? (
          <Link
            to={process.env.PUBLIC_URL + '/admin/dashboard'}
            className="right__menu__pc__item"
          >
            {/* {t(translations.navbarFeature.host)} */}
            Admin
          </Link>
        ) : (
          <Link
            to={process.env.PUBLIC_URL + '/host'}
            className="right__menu__pc__item"
          >
            {/* {t(translations.navbarFeature.host)} */}
            Chủ nhà
          </Link>
        )}
        {!token || !userInfo?.username ? (
          <Fragment>
            <Link
              to={process.env.PUBLIC_URL + '/sign-up'}
              className="right__menu__pc__item"
            >
              {/* {t(translations.navbarFeature.sign_up)} */}
              Đăng ký
            </Link>
            <Link
              to={process.env.PUBLIC_URL + '/sign-in'}
              className="right__menu__pc__item"
            >
              {/* {t(translations.navbarFeature.sign_in)} */}
              Đăng nhập
            </Link>
          </Fragment>
        ) : (
          <Dropdown
            overlay={menu}
            placement="bottom"
            className="cursor-pointer"
          >
            <div className="right__menu__pc__item">
              <span style={{ marginRight: 10, color: 'rgb(28, 164, 218)' }}>
                {userInfo?.fullName ? userInfo?.fullName : 'Người dùng'}
              </span>
              <Avatar
                src={
                  userInfo?.imageLink
                    ? userInfo?.imageLink
                    : 'https://joeschmoe.io/api/v1/random'
                }
              />
            </div>
          </Dropdown>
        )}

        {/* <div className="right__menu__pc__item-language">
          <LanguageSwitch />
        </div> */}
      </div>
    );
  };

  // const { t } = useTranslation();
  return <Fragment>{menuRight()}</Fragment>;
};
