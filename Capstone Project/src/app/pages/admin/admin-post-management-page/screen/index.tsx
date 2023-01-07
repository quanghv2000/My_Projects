import React, { Fragment, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { PostManagementTab } from 'app/pages/admin/admin-post-management-page/base/post-management-tab';
import { useDispatch } from 'react-redux';
import { LayoutAdmin } from 'app/components/admin-layout';
import { getPostTypeRequest } from 'app/pages/landlord/host-post-management-page/screen/action';
import { getListPostRequest } from 'app/pages/admin/admin-post-management-page/screen/action';
import { getDataPostingCostRequest } from 'app/pages/admin/admin-posting-cost-management-page/screen/action';

export const AdminPostManagementPage: React.FC<any> = () => {
  const dispatch = useDispatch();

  //useEffect
  useEffect(() => {
    dispatch(getListPostRequest(''));
    dispatch(getDataPostingCostRequest(''));
    dispatch(getPostTypeRequest(''));
  }, []);

  return (
    <Fragment>
      <Helmet>
        <title>Hola Houses - Post Management</title>
        <meta name="description" content="Hola Houses" />
      </Helmet>
      <LayoutAdmin content={<PostManagementTab />} />
    </Fragment>
  );
};
