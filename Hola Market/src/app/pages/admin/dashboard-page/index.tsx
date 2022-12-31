import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';

export const AdminDashboardPage: React.FC<any> = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Admin - Dashboard Page</title>
        <meta name="description" content="Admin - Dashboard Page" />
      </Helmet>
      <h3>Admin - Dashboard Page</h3>
    </Fragment>
  );
};
