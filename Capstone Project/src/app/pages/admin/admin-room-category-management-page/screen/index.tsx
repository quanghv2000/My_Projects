import { LayoutAdmin } from 'app/components/admin-layout';
import { RoomCategoryList } from 'app/pages/admin/admin-room-category-management-page/base/room-category-list/index';
import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';

export const AdminRoomCategoryManagementPage: React.FC<any> = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Hola Houses Admin - House Category Management</title>
        <meta name="description" content="Hola Houses" />
      </Helmet>
      <LayoutAdmin content={<RoomCategoryList />} />
    </Fragment>
  );
};
