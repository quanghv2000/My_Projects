import { Layout, Menu, Avatar, Dropdown } from 'antd';
import React, { Fragment, useState } from 'react';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { TitleLink } from 'app/components/navbar/styled';
import LogoWeb from 'assets/download.svg';
import { ScrollToTop } from 'hooks/scroll-to-top';
import { useLocation } from 'react-router-dom';
import { menuItem } from 'app/components/admin-layout/template';
import './style.scss';

const { Header, Sider, Content } = Layout;

export const LayoutAdmin: React.FC<any> = (props: any) => {
  const [collapsed, setCollapsed] = useState(false);

  const location = useLocation();

  const userInfoCookies = localStorage.getItem('user-info');
  // const userInfoCookies = getCookie('user-info');
  let userInfo: any;

  if (userInfoCookies) {
    userInfo = JSON.parse(userInfoCookies);
  }

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

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
          width="240px"
        >
          <div className="logo--host">
            <TitleLink to={process.env.PUBLIC_URL + '/admin/dashboard'}>
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
                  <div className="logo--host__container--name">Admin</div>
                )}
              </div>
            </TitleLink>
          </div>
          <Menu key="admin" mode="vertical" className="sider__menu">
            {menuItem(location)}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header style={{ padding: 0 }} className="site-layout-background">
            <div className="header__container">
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: 'trigger',
                  onClick: toggle,
                }
              )}
              <Dropdown
                overlay={menu}
                placement="bottom"
                className="cursor-pointer pt-20 mr-10"
              >
                <div>
                  <span className="header__host--name">
                    [ADMIN] - {userInfo?.fullName ? userInfo?.fullName : ''}
                  </span>
                  <Avatar
                    className="mr-20"
                    src="https://joeschmoe.io/api/v1/random"
                  />
                </div>
              </Dropdown>
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
