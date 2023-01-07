import React, { Fragment, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import { LayoutHost } from 'app/components/host-layout';
import { PersonalPage } from 'app/pages/landlord/host-profile-page/base/personal-page/index';
import { getUserInfoRequest } from 'app/pages/landlord/host-profile-page/screen/action';

export const HostProfilePage: React.FC<any> = () => {
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
      dispatch(getUserInfoRequest({ id: userInfo?.id }));
    }
  }, [userInfo?.id]);

  return (
    <Fragment>
      <Helmet>
        <title>Hola Houses - Host Profile</title>
        <meta name="description" content="Hola Houses" />
      </Helmet>
      <LayoutHost content={<PersonalPage />} />
    </Fragment>
  );
};
