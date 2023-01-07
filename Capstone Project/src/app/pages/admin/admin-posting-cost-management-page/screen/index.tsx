import { LayoutAdmin } from 'app/components/admin-layout';
import { PostingCostList } from 'app/pages/admin/admin-posting-cost-management-page/base/posting-cost-list/index';
import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
// import { getDataUserRequest } from 'app/pages/admin/admin-account-management-page/screen/action';

export const AdminPostingCostManagementPage: React.FC<any> = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Hola Houses Admin - Post Type Management</title>
        <meta name="description" content="Hola Houses" />
      </Helmet>
      <LayoutAdmin content={<PostingCostList />} />
    </Fragment>
  );
};
