import { Tabs, Spin } from 'antd';
import React, { Fragment, useState, useEffect } from 'react';
import { RoomDataTable } from 'app/pages/landlord/landlord-room-page/base/room-data-table';
import { RootState } from 'types/RootState';
import { ScrollToTop } from 'hooks/scroll-to-top';
import { useSelector, useDispatch } from 'react-redux';
import { hostRoomGetRequest } from 'app/pages/landlord/landlord-room-page/screen/action';
import { AccommodationNotifications } from 'app/pages/admin/admin-service-management-page/base/accommodation-notifications';

const { TabPane } = Tabs;

export const ServiceTab: React.FC<any> = () => {
  const dispatch = useDispatch();
  const [keytab, setKeytab] = useState('');

  //useEffect
  useEffect(() => {
    // if (state?.dataResponse[0]?.id) {
    //   dispatch(
    //     hostRoomGetRequest({
    //       pageSize: 10,
    //       pageIndex: 1,
    //       id: state?.dataResponse[0]?.id,
    //       tabs: state?.dataResponse[0]?.id,
    //     })
    //   );
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const callback = (key) => {};

  return (
    <Fragment>
      <ScrollToTop />
      <Spin spinning={false} delay={100}>
        <Tabs onChange={callback} type="card">
          <TabPane
            tab={'Dịch vụ tìm phòng'}
            key={'accommodation_notifications'}
          >
            <AccommodationNotifications />
          </TabPane>
        </Tabs>
      </Spin>
    </Fragment>
  );
};
