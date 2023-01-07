import React, { Fragment, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { LayoutHost } from 'app/components/host-layout';
import { hostHouseGetRequest } from 'app/pages/landlord/landlord-house-page/screen/action';
import { HouseTab } from 'app/pages/landlord/landlord-room-page/base/room-tab';
import { useDispatch } from 'react-redux';

export const HostRoomPage: React.FC<any> = () => {
  const dispatch = useDispatch();
  const userInfoCookies = localStorage.getItem('user-info');
  // const userInfoCookies = getCookie('user-info');
  let userInfo: any;

  if (userInfoCookies) {
    userInfo = JSON.parse(userInfoCookies);
  }

  //useEffect
  useEffect(() => {
    if (userInfo?.id) {
      dispatch(hostHouseGetRequest(userInfo?.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
