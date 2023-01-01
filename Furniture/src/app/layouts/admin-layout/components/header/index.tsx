import React from 'react';
import { Layout, Dropdown, Avatar, Menu, Tooltip } from 'antd';
import { SettingOutlined, CaretDownOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import './header.css';

const { Header } = Layout;

const HeaderLayout = props => {
  const { sidebarCollapsed, showSettings, fixedHeader = true } = props;

  const menu = (
    <Menu onClick={() => {}}>
      <Menu.Item key="dashboard">
        <Link to="/admin/dashboard">Dashboard</Link>
      </Menu.Item>
      <Menu.Item key="project">
        <a target="_blank" href="https://github.com/NLRX-WJC/react-antd-admin-template" rel="noopener noreferrer">
          项目地址
        </a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">注销</Menu.Item>
    </Menu>
  );

  const computedStyle = () => {
    let styles;
    if (fixedHeader) {
      if (sidebarCollapsed) {
        styles = {
          width: 'calc(100% - 80px)',
        };
      } else {
        styles = {
          width: 'calc(100% - 200px)',
        };
      }
    } else {
      styles = {
        width: '100%',
      };
    }
    return styles;
  };

  return (
    <Header style={computedStyle()} className={fixedHeader ? 'fix-header' : ''}>
      <div className="right-menu">
        {/* <FullScreen /> */}
        {/* {showSettings ? <Settings /> : null} */}
        <div className="settings-container">
          <Tooltip placement="bottom" title="系统设置">
            <SettingOutlined />
          </Tooltip>
        </div>
        <div className="dropdown-wrap">
          <Dropdown overlay={menu} placement="bottomRight">
            <div>
              <Avatar shape="square" size="default" src={'https://s1.ax1x.com/2020/04/28/J5hUaT.jpg'} />
              <CaretDownOutlined />
            </div>
          </Dropdown>
        </div>
      </div>
    </Header>
  );
};

export default HeaderLayout;
