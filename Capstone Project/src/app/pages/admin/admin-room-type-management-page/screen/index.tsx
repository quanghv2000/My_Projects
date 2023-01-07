import { LayoutAdmin } from 'app/components/admin-layout';
import { RoomTypeList } from 'app/pages/admin/admin-room-type-management-page/base/room-type-list/index';
import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';

export const AdminRoomTypeManagementPage: React.FC<any> = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Hola Houses Admin - House Type Management</title>
        <meta name="description" content="Hola Houses" />
      </Helmet>
      <LayoutAdmin content={<RoomTypeList />} />
    </Fragment>
  );
};
