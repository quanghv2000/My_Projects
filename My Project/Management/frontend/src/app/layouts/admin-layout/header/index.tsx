import React from 'react';
import { Header } from 'antd/lib/layout/layout';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import style from './style.module.scss';
import { Button } from 'antd';

type IProps = {
  collapsed: boolean;
  handleCollapsed: () => void;
};

export default function LayoutHeader(props: IProps) {
  /** @Declare */
  const { collapsed, handleCollapsed } = props;

  /** @Logic_Handler */
  const onLogout = () => {
    localStorage.clear();
    window.location.href = '/sign-in';
  };

  return (
    <Header
      className={style['layout-header']}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <div onClick={handleCollapsed} className={style['toggle-collapsed']}>
        {React.createElement(
          collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            className: 'trigger',
          },
        )}
      </div>
      <div style={{ paddingRight: 8 }}>
        <Button onClick={onLogout}>Logout</Button>
      </div>
    </Header>
  );
}
