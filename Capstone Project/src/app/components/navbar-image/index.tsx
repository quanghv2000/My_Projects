import { Fragment, useEffect, useState } from 'react';
import { Button, Drawer, Avatar, Menu, Dropdown } from 'antd';
import 'app/components/navbar-image/style.scss';
import { RightMenu } from 'app/components/navbar/right-menu';
import 'app/components/navbar/style.scss';
import LogoHola from 'assets/logo_hola.png';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'types/RootState';
import { Link, useHistory } from 'react-router-dom';
import { getUserInfoRequest } from 'app/pages/landlord/host-profile-page/screen/action';

export const NavBar: React.FC<any> = () => {
  // const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const history = useHistory();
  const state = useSelector((state: RootState) => state?.hostProfileReducer);
  // const token = getCookie('token');
  const token = localStorage.getItem('token');
  const userInfoCookies = localStorage.getItem('user-info');
  // const userInfoCookies = getCookie('user-info');
  let userInfo: any;

  if (userInfoCookies) {
    userInfo = JSON.parse(userInfoCookies);
  }

  const dispatch = useDispatch();
  //useEffect
  useEffect(() => {
    if (userInfo?.id) {
      dispatch(getUserInfoRequest({ id: userInfo?.id }));
    }
  }, [userInfo?.id]);

  const logout = () => {
    // eraseCookie('token');
    // eraseCookie('user-info');
    localStorage.clear();
    window.location.href = '/';
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const menu = (
    <Menu>
      <Menu.Item
        className="menu-signed"
        onClick={() => {
          return token && userInfo?.role?.id === 3
            ? history.push('/host/profile')
            : history.push('/user/profile');
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
      {/* {token && userInfo?.role?.id === 3 ? (
        ''
      ) : ( */}
      <Menu.Item
        className="menu-signed"
        onClick={() => history.push('/user/wish-list')}
      >
        <i className="fa-solid fa-heart mr-10"></i>
        Danh sách yêu thích
      </Menu.Item>
      {/* )} */}
      <Menu.Item className="menu-signed" onClick={logout}>
        <i className="fa-solid fa-arrow-right-from-bracket mr-10"></i>Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <Fragment>
      <nav className="menuBar-v2">
        <div className="logo-v2 ">
          <img
            src={LogoHola}
            style={{ height: 80 }}
            className="cursor-pointer logo-v2-image"
            alt="logo"
          />
          <span className="logo-title cursor-pointer">Hola</span>
        </div>
        <div className="leftMenu-v2">
          {token && userInfo?.role?.id === 3 ? (
            <Link
              to={process.env.PUBLIC_URL + '/host/dashboard'}
              className="leftMenu-v2-item"
            >
              {/* {t(translations.navbarFeature.host)} */}
              Chủ nhà
            </Link>
          ) : token && userInfo?.role?.id === 1 ? (
            <Link
              to={process.env.PUBLIC_URL + '/admin/dashboard'}
              className="leftMenu-v2-item"
            >
              {/* {t(translations.navbarFeature.host)} */}
              Admin
            </Link>
          ) : (
            ''
            // <Link
            //   to={process.env.PUBLIC_URL + '/host'}
            //   className="leftMenu-v2-item"
            // >
            //   {/* {t(translations.navbarFeature.host)} */}
            //   Chủ nhà
            // </Link>
          )}
        </div>
        {!token || !userInfo?.username ? (
          <div className="rightMenu-v2">
            <Link
              to={process.env.PUBLIC_URL + '/sign-up'}
              className="rightMenu-v2-item"
            >
              {/* {t(translations.navbarFeature.sign_up)} */}
              Đăng ký
            </Link>
            <Link
              to={process.env.PUBLIC_URL + '/sign-in'}
              className="rightMenu-v2-item rightMenu-v2-item-signIn"
            >
              {/* {t(translations.navbarFeature.sign_in)} */}
              Đăng nhập
            </Link>
          </div>
        ) : (
          <Dropdown
            overlay={menu}
            placement="bottom"
            className="cursor-pointer pt-20"
          >
            <div style={{ height: 50, paddingTop: 20 }}>
              <span style={{ marginRight: 10, color: 'white', fontSize: 17 }}>
                {userInfo?.fullName ? userInfo?.fullName : 'Người dùng'}
              </span>
              <Avatar
                src={
                  state?.userInfo?.imageLink
                    ? state?.userInfo?.imageLink
                    : 'https://joeschmoe.io/api/v1/random'
                }
              />
            </div>
          </Dropdown>
        )}

        {/* <div className="menuCon-v2"> */}
        <Button className="barsMenu" onClick={showDrawer}>
          <span className="barsBtn-v2"></span>
        </Button>
        <Drawer
          title={
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p>Hola Houses</p>
              <i
                className="fa-solid fa-x mt-10 cursor-pointer"
                onClick={onClose}
              ></i>
            </div>
          }
          placement="right"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <RightMenu />
        </Drawer>
      </nav>
    </Fragment>
  );
};
