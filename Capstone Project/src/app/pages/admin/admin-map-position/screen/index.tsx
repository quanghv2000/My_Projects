import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import { LayoutAdmin } from 'app/components/admin-layout';
import { MapPositionList } from 'app/pages/admin/admin-map-position/base/map-position-list';

export const AdminMapPositonPage: React.FC<any> = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Hola Houses Admin - Map Positon</title>
        <meta name="description" content="Hola Houses" />
      </Helmet>
      <LayoutAdmin content={<MapPositionList />} />
    </Fragment>
  );
};
