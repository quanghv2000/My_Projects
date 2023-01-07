import React, { Fragment, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { LayoutHost } from 'app/components/host-layout';
// import { getDataUserRequest } from 'app/pages/landlord/landlord-house-page/screen/action';
import { getDataRequest } from 'app/pages/user/home-page/screen/action';
import { HouseTab } from 'app/pages/landlord/landlord-room-page/base/room-tab';
import { useDispatch } from 'react-redux';

export const HostRoomPage: React.FC<any> = () => {
  const dispatch = useDispatch();
  //useEffect
  useEffect(() => {
    dispatch(getDataRequest(''));
  }, [dispatch]);

  return (
    <Fragment>
      <Helmet>
        <title>Hola Houses Map</title>
        <meta name="description" content="Hola Houses" />
      </Helmet>
      <LayoutHost content={<HouseTab />} />
    </Fragment>
  );
};
