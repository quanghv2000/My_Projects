import React, { Fragment, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { LayoutAdmin } from 'app/components/admin-layout';
import { BankAccountList } from 'app/pages/admin/admin-bank-account-management-page/base/bank-account-list/index';
import { getDataBankAccountRequest } from 'app/pages/admin/admin-bank-account-management-page/screen/action';
import { useDispatch } from 'react-redux';

export const AdminBankAccountManagementPage: React.FC<any> = () => {
  const dispatch = useDispatch();
  // get data type of rental in admin
  useEffect(() => {
    dispatch(getDataBankAccountRequest(''));
  }, [dispatch]);

  return (
    <Fragment>
      <Helmet>
        <title>Hola Houses Admin - Bank Account Management</title>
        <meta name="description" content="Hola Houses" />
      </Helmet>
      <LayoutAdmin content={<BankAccountList />} />
    </Fragment>
  );
};
