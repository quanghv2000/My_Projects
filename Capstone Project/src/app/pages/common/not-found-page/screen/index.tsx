import { Link } from 'app/components/link';
import { NavBar } from 'app/components/navbar';
import { Title, Wrapper } from 'app/pages/common/not-found-page/base/styled';
import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import { P } from 'app/pages/common/not-found-page/base/styled';

export const NotFoundPage: React.FC<any> = () => {
  return (
    <Fragment>
      <Helmet>
        <title>404 Page Not Found</title>
        <meta name="description" content="Page not found" />
      </Helmet>
      <NavBar />
      <Wrapper>
        <Title>404</Title>
        <P>Page not found.</P>
        <Link to={process.env.PUBLIC_URL + '/'}>Return to Home Page</Link>
      </Wrapper>
    </Fragment>
  );
};
