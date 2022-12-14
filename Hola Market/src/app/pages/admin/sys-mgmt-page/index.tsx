import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';

export const AdminSystemMGMTPage: React.FC<any> = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Admin - System Management Page</title>
        <meta name="description" content="Admin - System Management Page" />
      </Helmet>
      <h3>Admin - System Management Page</h3>
    </Fragment>
  );
};
