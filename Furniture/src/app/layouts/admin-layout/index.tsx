import { Layout } from 'antd';
import React from 'react';
import { SiderLayout } from './components';
import HeaderLayout from './components/header';

type IProps = {
  content: (props: any) => JSX.Element;
};

export const AdminLayout: React.FC<IProps> = ({ content: Content }) => {
  return (
    <React.Fragment>
      <Layout style={{ minHeight: '100vh' }}>
        <SiderLayout />
        <Layout>
          <HeaderLayout />
          {/* {tagsView ? <TagsView /> : null} */}
          <Content />
          {/* <RightPanel /> */}
        </Layout>
      </Layout>
    </React.Fragment>
  );
};
