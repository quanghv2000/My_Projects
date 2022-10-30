import React from 'react';
import { Breadcrumb, Layout } from 'antd';
import LayoutHeader from './header';
import LayoutSider from './sider';

import style from './style.module.scss';

const { Content } = Layout;

interface IProps {
  content?: JSX.Element;
  breadcrumbs?: string[];
}

export default function AdminLayout(props: IProps) {
  /** @Declare */
  const [collapsed, setCollapsed] = React.useState(false);
  const { content, breadcrumbs } = props;

  /** @Logic_Handler */
  const handleCollapsed = React.useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed]);

  return (
    <Layout className={style['admin-layout']}>
      <LayoutSider collapsed={collapsed} />
      <Layout
        className="site-layout"
        style={{ marginLeft: collapsed ? 80 : 220, transition: '0.35s' }}
      >
        <LayoutHeader collapsed={collapsed} handleCollapsed={handleCollapsed} />
        <Content
          style={{ margin: '20px 16px', overflow: 'initial' }}
          className={style['site-layout-background']}
        >
          <Breadcrumb className={style['breadcrumb']}>
            <Breadcrumb.Item>Admin</Breadcrumb.Item>
            {breadcrumbs?.map((title, index) => {
              return <Breadcrumb.Item key={index}>{title}</Breadcrumb.Item>;
            })}
          </Breadcrumb>
          {content}
        </Content>
      </Layout>
    </Layout>
  );
}
