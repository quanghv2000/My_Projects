import React, { Fragment, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
// import { getDataUserRequest } from 'app/pages/admin/admin-account-management-page/screen/action';
// import { getDataRequest } from 'app/pages/user/home-page/screen/action';
import { useDispatch } from 'react-redux';
import { PostManage } from 'app/pages/landlord/host-post-management-page/base/post-manage';
import { LayoutHost } from 'app/components/host-layout';
import {
  getListPostRequest,
  getPostTypeRequest,
  clearHostPostCreate
} from 'app/pages/landlord/host-post-management-page/screen/action';
import { getDataPostingCostRequest } from 'app/pages/admin/admin-posting-cost-management-page/screen/action';

export const HostPostManagementPage: React.FC<any> = () => {
  const dispatch = useDispatch();
  //useEffect
  useEffect(() => {
    dispatch(getListPostRequest(''));
    dispatch(getDataPostingCostRequest(''));
    dispatch(getPostTypeRequest(''));
  }, []);


  // clear state redux when component unmount
  useEffect(() => {
    return () => {
      dispatch(clearHostPostCreate(''));
    };
  }, []);

  return (
    <Fragment>
      <Helmet>
        <title>Hola Houses Landlord - Host Management</title>
        <meta name="description" content="Hola Houses" />
      </Helmet>
      <LayoutHost content={<PostManage />} />
    </Fragment>
  );
};
