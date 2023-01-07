import React, { Fragment, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { LayoutAdmin } from 'app/components/admin-layout';
import { AmenityTab } from 'app/pages/admin/admin-amenity-management-page/base/amenity-tab';
// import { getDataUserRequest } from 'app/pages/admin/admin-account-management-page/screen/action';
// import { getDataRequest } from 'app/pages/user/home-page/screen/action';
import { useDispatch } from 'react-redux';

export const AdminAmenityManagementPage: React.FC<any> = () => {

  return (
    <Fragment>
      <Helmet>
        <title>Hola Houses Admin - Amenity Management</title>
        <meta name="description" content="Hola Houses" />
      </Helmet>
      <LayoutAdmin content={<AmenityTab />} />
    </Fragment>
  );
};
