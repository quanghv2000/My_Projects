import React, { Fragment } from 'react';
import { Button, PageHeader, Tabs, Form } from 'antd';
import { useHistory } from 'react-router-dom';
// import { RoomDetailCustomerTab } from 'app/pages/landlord/host-room-detail-page/base/room-detail-customer-tab';
// import { RoomDetailServiceTab } from 'app/pages/landlord/host-room-detail-page/base/room-detail-service-tab';
import { RoomFormDetail } from 'app/pages/landlord/host-room-detail-page/base/room-form-detail-tab';
import { useSelector } from 'react-redux';
import { RootState } from 'types/RootState';
const { TabPane } = Tabs;

export const RoomDetailTab: React.FC<any> = (props: any) => {
  const history = useHistory();
  const callback = (key) => {
  };

  const [form] = Form.useForm();

  const state = useSelector(
    (state: RootState) => state?.hostRoomDetailReducer
  );

  return (
    <Fragment>
      <PageHeader
        className="site-page-header mb-20"
        onBack={() => history.push('/host/room')}
        title="Xem thông tin chi tiết phòng"
        extra={[
          <Button
            className="ml-20"
            style={{
              backgroundColor: '#fa8c16',
              borderColor: '#fa8c16',
              color: 'white',
            }}
            onClick={() => history.push('/host/room')}
          >
            <i className="fa-solid fa-rotate-left mr-5"></i> Quay về
          </Button>,

          <Button
            type="primary"
            style={{
              // backgroundColor: '#7cb305',
              // borderColor: '#7cb305',
              color: 'white',
            }}
            loading={state?.btnUpdateLoading}
            onClick={() => form.submit()}
          >
            Lưu
          </Button>,
        ]}
      />
      <Tabs onChange={callback} type="card">
        <TabPane tab="Thông tin phòng" key="0">
          <RoomFormDetail id={props?.id} form={form} />
        </TabPane>
        {/* <TabPane tab="Thông tin khách thuê" key="1">
          <RoomDetailCustomerTab />
        </TabPane>
        <TabPane tab="Dịch vụ" key="2">
          <RoomDetailServiceTab />
        </TabPane>
        <TabPane tab="Thành viên" key="3">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Hợp đồng" key="4">
          Content of Tab Pane 2
        </TabPane> */}
      </Tabs>
    </Fragment>
  );
};
