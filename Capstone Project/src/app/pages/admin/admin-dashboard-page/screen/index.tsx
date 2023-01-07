import React, { Fragment, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { LayoutAdmin } from 'app/components/admin-layout';
import { useDispatch } from 'react-redux';
import { Dashboard } from 'app/pages/admin/admin-dashboard-page/base/dashboard';
import { getDashboardAdminRequest , getDashboardAdminDataRequest} from 'app/pages/admin/admin-dashboard-page/screen/action';

export const AdminDashboardPage: React.FC<any> = () => {
  const dispatch = useDispatch();
  //useEffect
  useEffect(() => {
    dispatch(getDashboardAdminRequest(''));
  }, [dispatch]);

  return (
    <Fragment>
      <Helmet>
        <title>Hola Houses Admin - Dashboard</title>
        <meta name="description" content="Hola Houses" />
      </Helmet>
      <LayoutAdmin content={<Dashboard />} />
    </Fragment>
  );
};
