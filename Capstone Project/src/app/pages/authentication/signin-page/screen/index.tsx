import { Layout } from 'antd';
import 'app/pages/authentication/signin-page/screen/style.scss';
import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';

import { PageWrapper } from 'app/components/page-wrapper';
import { SignInHeader } from 'app/pages/authentication/signin-page/base/header';
import { SignInForm } from 'app/pages/authentication/signin-page/base/signin-form';

export const SignIn: React.FC<any> = () => {
  const { Content } = Layout;

  return (
    <Fragment>
      <Helmet>
        <title>Sign In</title>
        <meta name="description" content="Sign In" />
      </Helmet>

      <Layout className="signin">
        <PageWrapper className="signin__header">
          <SignInHeader />
        </PageWrapper>
        <Content className="signin__container">
          <SignInForm />
        </Content>
      </Layout>
    </Fragment>
  );
};
