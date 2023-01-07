import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import { LayoutAdmin } from 'app/components/admin-layout';
import { AccountList } from 'app/pages/admin/admin-account-management-page/base/account-list/index';
// import { getDataUserRequest } from 'app/pages/admin/admin-account-management-page/screen/action';
// import { getDataRequest } from 'app/pages/user/home-page/screen/action';

export const AdminAccountManagementPage: React.FC<any> = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Hola Houses Admin - Account Management</title>
        <meta name="description" content="Hola Houses" />
      </Helmet>
      <LayoutAdmin content={<AccountList />} />
    </Fragment>
  );
};
