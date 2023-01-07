import React, { Fragment, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { LayoutHost } from 'app/components/host-layout';
import { hostHouseGetRequest } from 'app/pages/landlord/landlord-house-page/screen/action';
import { HouseDataTable } from 'app/pages/landlord/landlord-house-page/base/house-data-table';
import { useDispatch } from 'react-redux';
import { ScrollToTop } from 'hooks/scroll-to-top';

export const HostHousePage: React.FC<any> = () => {
  const userInfoCookies = localStorage.getItem('user-info');
  // const userInfoCookies = getCookie('user-info');
  let userInfo: any;

  if (userInfoCookies) {
    userInfo = JSON.parse(userInfoCookies);
  }

  const dispatch = useDispatch();
  //useEffect
  useEffect(() => {
    dispatch(hostHouseGetRequest(userInfo?.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <Fragment>
      <Helmet>
        <title>Hola Houses Map</title>
        <meta name="description" content="Hola Houses" />
      </Helmet>
      <ScrollToTop />
      <LayoutHost content={<HouseDataTable />} />
    </Fragment>
  );
};
