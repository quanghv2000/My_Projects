import { Layout, Menu, Avatar, Dropdown } from 'antd';
import React, { Fragment, useEffect, useState } from 'react';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { TitleLink } from 'app/components/navbar/styled';
import LogoWeb from 'assets/download.svg';
import { useLocation } from 'react-router-dom';
import { menuItem } from 'app/components/host-layout/template';
import { ScrollToTop } from 'hooks/scroll-to-top';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'types/RootState';
import './style.scss';
import { convertPrice } from 'helper/convert-price-to-vnd';
import { getUserInfoRequest } from 'app/pages/landlord/host-profile-page/screen/action';

const { Header, Sider, Content } = Layout;

export const LayoutHost: React.FC<any> = (props: any) => {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();

  // const token = localStorage.getItem('token');
  const userInfoCookies = localStorage.getItem('user-info');
  // const userInfoCookies = getCookie('user-info');
  let userInfo: any;

  if (userInfoCookies) {
    userInfo = JSON.parse(userInfoCookies);
  }

  //useEffect
  useEffect(() => {
    if (userInfo?.id) {
      dispatch(getUserInfoRequest({ id: userInfo?.id }));
    }
  }, [userInfo?.id]);

  const location = useLocation();

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  const state = useSelector((state: RootState) => state?.hostProfileReducer);

  const menu = (
    <Menu>
      <Menu.Item className="menu-signed" onClick={logout}>
        <i className="fa-solid fa-arrow-right-from-bracket mr-10"></i>Đăng xuất
      </Menu.Item>
    </Menu>
  );

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Fragment>
      <ScrollToTop />
      <Layout style={{ height: '100%', minHeight: '100vh' }}>
        <Sider
          style={{ backgroundColor: 'white !important' }}
          trigger={null}
          collapsible
          theme="light"
          collapsed={collapsed}
          width="230px"
        >
          <div className="logo--host">
            <TitleLink to={process.env.PUBLIC_URL + '/'}>
              <div
                className={
                  collapsed
                    ? 'logo--host__container--collapse'
                    : 'logo--host__container'
                }
              >
                <img
                  src={LogoWeb}
                  alt="logo"
                  className="logo--host__container--image"
                />
                {collapsed ? (
                  ''
                ) : (
                  <div className="logo--host__container--name">Hola</div>
                )}
              </div>
            </TitleLink>
          </div>
          <Menu key="host" mode="vertical" className="sider__menu">
            {menuItem(location)}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <div className="header__container">
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: 'trigger',
                  onClick: toggle,
                }
              )}
              <div
                style={{
                  display: 'flex',
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 'bold',
                    color: '#1ca4da',
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  (
                  {state?.userInfo?.balance
                    ? convertPrice(state?.userInfo?.balance)
                    : 0}
                  {'  '}
                  vnđ)
                </span>
                <Dropdown
                  overlay={menu}
                  placement="bottom"
                  className="cursor-pointer  mr-20"
                >
                  <div>
                    <span
                      style={{
                        marginRight: 10,
                        marginLeft: 10,
                        color: 'gray',
                        fontSize: 15,
                      }}
                    >
                      {userInfo?.fullName ? userInfo?.fullName : 'Người dùng'}
                    </span>
                    <Avatar
                      style={{ backgroundColor: 'white' }}
                      src={
                        state?.userInfo?.imageLink
                          ? state?.userInfo?.imageLink
                          : userInfo?.imageLink
                          ? userInfo?.imageLink
                          : 'https://joeschmoe.io/api/v1/random'
                      }
                    />
                  </div>
                </Dropdown>
              </div>
            </div>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              height: '100%',
            }}
          >
            {props?.content}
          </Content>
        </Layout>
      </Layout>
    </Fragment>
  );
};
