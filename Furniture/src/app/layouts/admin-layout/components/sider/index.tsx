import React from 'react';
import { Layout } from 'antd';
import { Logo } from './components';

const { Sider } = Layout;

export const SiderLayout = props => {
  const { sidebarCollapsed, sidebarLogo = true } = props;
  return (
    <Sider
      collapsible
      collapsed={sidebarCollapsed}
      trigger={null}
      style={{ zIndex: '10', position: 'fixed', height: '100vh' }}
    >
      {sidebarLogo ? <Logo /> : null}
      {/* <Menu /> */}
    </Sider>
  );
};
