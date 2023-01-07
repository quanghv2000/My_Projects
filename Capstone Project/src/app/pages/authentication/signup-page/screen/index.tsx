import { Layout } from 'antd';
import 'app/pages/authentication/signup-page/screen/style.scss';
import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';

import { PageWrapper } from 'app/components/page-wrapper';
import { SignUpHeader } from 'app/pages/authentication/signup-page/base/header';
import { SignUpForm } from 'app/pages/authentication/signup-page/base/signup-form';

export const SignUp: React.FC<any> = () => {
  const { Content } = Layout;

  return (
    <Fragment>
      <Helmet>
        <title>Sign Up</title>
        <meta name="description" content="Sign Up" />
      </Helmet>

      <Layout className="signup">
        <PageWrapper className="signup__header">
          <SignUpHeader />
        </PageWrapper>
        <Content className="signup__form">
          <SignUpForm />
        </Content>
      </Layout>
    </Fragment>
  );
};
