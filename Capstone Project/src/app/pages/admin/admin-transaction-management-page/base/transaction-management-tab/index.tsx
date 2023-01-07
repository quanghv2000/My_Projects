import { Spin, Tabs } from 'antd';
import { DepositManagement } from 'app/pages/admin/admin-transaction-management-page/base/deposit-management/index';
import { PostingManagement } from 'app/pages/admin/admin-transaction-management-page/base/posting-management/index';
import { VerifyManagement } from 'app/pages/admin/admin-transaction-management-page/base/verify-management/index';
import { adminGetTransactionRequest } from 'app/pages/admin/admin-transaction-management-page/screen/action';
import { ScrollToTop } from 'hooks/scroll-to-top';
import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';

const { TabPane } = Tabs;

export const TransactionManagementTab: React.FC<any> = () => {
  const dispatch = useDispatch();

  const [isChangeTab, setChangeTab]: any = useState('deposit');

  const callback = (key) => {
    dispatch(adminGetTransactionRequest(''));
    setChangeTab(key)
  };

  return (
    <Fragment>
      <ScrollToTop />
      <Spin spinning={false} delay={100}>
        <Tabs onChange={callback} type="card">
          {/* <TabPane tab={'Tất cả giao dịch'} key={'all'}></TabPane> */}
          <TabPane tab={'Nạp tiền'} key={'deposit'}>
            <DepositManagement isChangeTab={isChangeTab}/>
          </TabPane>
          <TabPane tab={'Đăng tin & Gia hạn'} key={'posting'}>
            <PostingManagement isChangeTab={isChangeTab}/>
          </TabPane>
          <TabPane tab={'Xác thực bài đăng'} key={'verify'}>
            <VerifyManagement isChangeTab={isChangeTab}/>
          </TabPane>
          
          {/* <TabPane
            tab={'Đăng ký nhận thông báo tìm phòng'}
            key={'accommodation_notifications'}
          >
            <AccommodationNotificationsTransaction />
          </TabPane> */}
        </Tabs>
      </Spin>
    </Fragment>
  );
};
