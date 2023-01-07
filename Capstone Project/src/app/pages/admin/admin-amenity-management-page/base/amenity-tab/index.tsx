import React, { Fragment, useState } from 'react';
import { Tabs } from 'antd';
import { AmenityList } from 'app/pages/admin/admin-amenity-management-page/base/amenity-list/index';
const { TabPane } = Tabs;

export const AmenityTab: React.FC<any> = () => {
  const [amenityKey, setAmenityKey] = useState('house');

  const callback = (key) => {
    setAmenityKey(key);
  };

  return (
    <Fragment>
      <Tabs onChange={callback} type="card">
        <TabPane tab="Tiện nghi nhà" key="house">
          <AmenityList amenityKey={amenityKey} />
        </TabPane>
        <TabPane tab="Tiện nghi phòng" key="room">
          <AmenityList amenityKey={amenityKey} />
        </TabPane>
      </Tabs>
    </Fragment>
  );
};
