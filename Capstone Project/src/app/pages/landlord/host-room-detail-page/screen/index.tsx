import React, { Fragment, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { LayoutHost } from 'app/components/host-layout';
import { hostHouseGetCityRequest } from 'app/pages/landlord/house-create-page/screen/action';
import { RoomDetailTab } from 'app/pages/landlord/host-room-detail-page/base/room-detail-tab';
import { useDispatch } from 'react-redux';
import {
  clearState,
} from 'app/pages/landlord/host-room-detail-page/screen/action';

export const HostRoomDetailPage: React.FC<any> = (props: any) => {
  const dispatch = useDispatch();
  //useEffect
  useEffect(() => {
    dispatch(hostHouseGetCityRequest(''));
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearState(''));
    };
  }, []);

  return (
    <Fragment>
      <Helmet>
        <title>Hola Houses Map</title>
        <meta name="description" content="Hola Houses" />
      </Helmet>
      <LayoutHost content={<RoomDetailTab id={props?.match?.params?.id} />} />
    </Fragment>
  );
};
