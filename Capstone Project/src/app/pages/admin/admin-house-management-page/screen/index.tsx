import React, { Fragment, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { LayoutAdmin } from 'app/components/admin-layout';
// import { getDataUserRequest } from 'app/pages/admin/admin-account-management-page/screen/action';
// import { getDataRequest } from 'app/pages/user/home-page/screen/action';
import { useDispatch } from 'react-redux';

export const AdminHouseManagementPage: React.FC<any> = () => {
  const dispatch = useDispatch();
  //useEffect
  useEffect(() => {
    // dispatch(getDataUserRequest(''));
    // dispatch(getDataRequest(''));
  }, [dispatch]);

  return (
    <Fragment>
      <Helmet>
        <title>Hola Houses Admin - House Managemenet</title>
        <meta name="description" content="Hola Houses" />
      </Helmet>
      <LayoutAdmin content="Admin House Management" />
    </Fragment>
  );
};
