import React from 'react';
import { Helmet } from 'react-helmet-async';
import AdminLayout from 'app/layouts/admin-layout';

export function TemplatePage() {
  return (
    <React.Fragment>
      <Helmet>
        <title>Template Page Common</title>
        <meta name="description" content="Template Page Common" />
      </Helmet>
      {/* <h3>Template Page Common</h3> */}
      <AdminLayout />
    </React.Fragment>
  );
}
