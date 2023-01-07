import { NavBar } from 'app/components/navbar';
import { Title, Wrapper } from 'app/pages/common/support-page/base/styled';
import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';

export const Support: React.FC<any> = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Support Page</title>
        <meta name="description" content="Anything you asked !" />
      </Helmet>
      <NavBar />
      <Wrapper>
        <Title>Support</Title>
      </Wrapper>
    </Fragment>
  );
};
