import React, { Fragment, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { LayoutAdmin } from 'app/components/admin-layout';
import { TypeOfRentalList } from 'app/pages/admin/admin-type-of-rental-management-page/base/type-of-rental-list/index';
import { getDataTypeOfRentalRequest } from 'app/pages/admin/admin-type-of-rental-management-page/screen/action';
import { useDispatch } from 'react-redux';

export const AdminTypeOfRentalManagementPage: React.FC<any> = () => {
  const dispatch = useDispatch();
  // get data type of rental in admin
  useEffect(() => {
    dispatch(getDataTypeOfRentalRequest(''));
  }, [dispatch]);

  return (
    <Fragment>
      <Helmet>
        <title>Hola Houses Admin - Type Of Rental Management</title>
        <meta name="description" content="Hola Houses" />
      </Helmet>
      <LayoutAdmin content={<TypeOfRentalList />} />
    </Fragment>
  );
};
