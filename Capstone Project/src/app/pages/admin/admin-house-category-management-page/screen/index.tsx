import { LayoutAdmin } from 'app/components/admin-layout';
import { HouseCategoryList } from 'app/pages/admin/admin-house-category-management-page/base/house-category-list/index';
import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
// import { getDataUserRequest } from 'app/pages/admin/admin-account-management-page/screen/action';

export const AdminHouseCategoryManagementPage: React.FC<any> = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Hola Houses Admin - House Type Management</title>
        <meta name="description" content="Hola Houses" />
      </Helmet>
      <LayoutAdmin content={<HouseCategoryList />} />
    </Fragment>
  );
};
