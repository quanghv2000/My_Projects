import React from 'react';
import { Header } from 'antd/lib/layout/layout';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import style from './style.module.scss';

type IProps = {
  collapsed: boolean;
  handleCollapsed: () => void;
};

export default function LayoutHeader(props: IProps) {
  /** @Declare */
  const { collapsed, handleCollapsed } = props;

  return (
    <Header className={style['layout-header']}>
      <div onClick={handleCollapsed} className={style['toggle-collapsed']}>
        {React.createElement(
          collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            className: 'trigger',
          },
        )}
      </div>
    </Header>
  );
}
