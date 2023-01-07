import React, { Fragment, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { LayoutHost } from 'app/components/host-layout';
import { RoomFormCreate } from 'app/pages/landlord/room-create-page/base/room-form-create';
import {
  getDataRoomCategoriesRequest,
} from 'app/pages/admin/admin-room-category-management-page/screen/action';
import { getDataAmenityRequest } from 'app/pages/admin/admin-amenity-management-page/screen/action';
import { getDataRoomTypeRequest } from 'app/pages/admin/admin-room-type-management-page/screen/action';
import { useDispatch } from 'react-redux';
import { hostHouseGetRequest } from 'app/pages/landlord/landlord-house-page/screen/action';
import {
  clearStateHostRoomCreate,
} from 'app/pages/landlord/room-create-page/screen/action';

export const RoomCreatePage: React.FC<any> = () => {
  const userInfoCookies = localStorage.getItem('user-info');
  // const userInfoCookies = getCookie('user-info');
  let userInfo: any;

  if (userInfoCookies) {
    userInfo = JSON.parse(userInfoCookies);
  }

  //useEffect
  useEffect(() => {
    if (userInfo?.id) {
      dispatch(clearStateHostRoomCreate(''));
      dispatch(hostHouseGetRequest(userInfo?.id));
    }

    return () => {
      dispatch(clearStateHostRoomCreate(''));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDataAmenityRequest(''));
    dispatch(getDataRoomCategoriesRequest(''));
    dispatch(getDataRoomTypeRequest(''));
  }, [dispatch]);

  return (
    <Fragment>
      <Helmet>
        <title>Hola Houses Map</title>
        <meta name="description" content="Hola Houses" />
      </Helmet>
      <LayoutHost content={<RoomFormCreate />} />
    </Fragment>
  );
};
