import React, { Fragment, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { LayoutHost } from 'app/components/host-layout';
import { HouseFormCreate } from 'app/pages/landlord/house-create-page/base/house-form-create';
import { useDispatch } from 'react-redux';
import { hostHouseGetCityRequest } from 'app/pages/landlord/house-create-page/screen/action';
import { getDataAmenityRequest } from 'app/pages/admin/admin-amenity-management-page/screen/action';
import { getDataTypeOfRentalRequest } from 'app/pages/admin/admin-type-of-rental-management-page/screen/action';
import {
  clearStateHostHouseCreate
} from 'app/pages/landlord/house-create-page/screen/action';


export const HouseCreatePage: React.FC<any> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDataAmenityRequest(''));
    dispatch(hostHouseGetCityRequest(''));
    dispatch(getDataTypeOfRentalRequest(''));
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearStateHostHouseCreate(''));
    };
  }, []);

  return (
    <Fragment>
      <Helmet>
        <title>Hola Houses Map</title>
        <meta name="description" content="Hola Houses" />
      </Helmet>
      <LayoutHost content={<HouseFormCreate />} />
    </Fragment>
  );
};
