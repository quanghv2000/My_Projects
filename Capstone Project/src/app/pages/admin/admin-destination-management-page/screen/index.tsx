import { LayoutAdmin } from 'app/components/admin-layout';
import { DestinationList } from 'app/pages/admin/admin-destination-management-page/base/destination-list/index';
import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
// import { getDataUserRequest } from 'app/pages/admin/admin-account-management-page/screen/action';

export const AdminDestinationManagementPage: React.FC<any> = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Hola Houses Admin - Destination Management</title>
        <meta name="description" content="Hola Houses" />
      </Helmet>
      <LayoutAdmin content={<DestinationList />} />
    </Fragment>
  );
};
