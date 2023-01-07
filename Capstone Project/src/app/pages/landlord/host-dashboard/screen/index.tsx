import React, { Fragment, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { getDashboardHostRequest } from 'app/pages/landlord/host-dashboard/screen/action';
import { useDispatch } from 'react-redux';
import { LayoutHost } from 'app/components/host-layout';
import { Dashboard } from 'app/pages/landlord/host-dashboard/base/dashboard';

export const HostDashboardPage: React.FC<any> = () => {
  const dispatch = useDispatch();
  //useEffect
  useEffect(() => {
    dispatch(getDashboardHostRequest(''));
  }, [dispatch]);

  return (
    <Fragment>
      <Helmet>
        <title>Hola Houses - Host Dashboard</title>
        <meta name="description" content="Hola Houses" />
      </Helmet>
      <LayoutHost content={<Dashboard />} />
    </Fragment>
  );
};
