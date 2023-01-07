import React, { Fragment, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import { LayoutAdmin } from 'app/components/admin-layout';
import { ServiceTab } from 'app/pages/admin/admin-service-management-page/base/service-management-tab/index';

export const AdminServiceManagementPage: React.FC<any> = () => {
  const dispatch = useDispatch();

  //useEffect
  useEffect(() => {
    // if (userInfo?.id) {
    //   dispatch(hostHouseGetRequest(userInfo?.id));
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <Fragment>
      <Helmet>
        <title>Hola Houses - Transaction Management</title>
        <meta name="description" content="Hola Houses" />
      </Helmet>
      <LayoutAdmin content={<ServiceTab />} />
    </Fragment>
  );
};
