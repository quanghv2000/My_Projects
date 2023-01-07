import { LayoutAdmin } from 'app/components/admin-layout';
import { TransactionManagementTab } from 'app/pages/admin/admin-transaction-management-page/base/transaction-management-tab/index';
import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';

export const AdminTransactionManagementPage: React.FC<any> = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Hola Houses - Transaction Management</title>
        <meta name="description" content="Hola Houses" />
      </Helmet>
      <LayoutAdmin content={<TransactionManagementTab />} />
    </Fragment>
  );
};
