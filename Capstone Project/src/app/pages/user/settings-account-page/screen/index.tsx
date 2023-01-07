import { Fragment, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Row, Tabs } from 'antd';

import { ScrollToTop } from 'hooks/scroll-to-top';
import { Helmet } from 'react-helmet-async';

// Components of about user page
import AccountInformation from 'app/pages/user/settings-account-page/base/account-information/screen';
import ChangePassword from 'app/pages/user/settings-account-page/base/change-password/account-information';
import Discount from 'app/pages/user/settings-account-page/base/discount/account-information';
import Payment from 'app/pages/user/settings-account-page/base/payment/account-information';
import './style.scss';
import { useDispatch } from 'react-redux';
import { PersonalPage } from 'app/pages/user/user-profile-page/base/personal-page';
import { getUserInfoRequest } from 'app/pages/landlord/host-profile-page/screen/action';

export interface SettingsAccountProps {}

const styless = {
  width: '250px',
  padding: '5px 0px',
  paddingRight: '10px',
  marginLeft: '-23px',
};

export const SettingsAccount = (props: SettingsAccountProps) => {
  const { TabPane } = Tabs;
  const location = useLocation();
  const history = useHistory();
  const [currentTab, setCurrentTab] = useState('1');

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

  useEffect(() => {
    if (location?.pathname === '/user/profile') {
      setCurrentTab('1');
    }
    if (location?.pathname === '/user/coupon') {
      setCurrentTab('2');
    }
    if (location?.pathname === '/user/change-password') {
      setCurrentTab('3');
    }
    if (location?.pathname === '/user/payment') {
      setCurrentTab('4');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const onChangeTabs = (key: string) => {
    if (key === '1') {
      history.push('/user/profile');
    } else if (key === '2') {
      history.push('/user/coupon');
    } else if (key === '3') {
      history.push('/user/change-password');
    } else if (key === '4') {
      history.push('/user/payment');
    }
  };

  return (
    <Fragment>
      <Helmet>
        <title>Wish list</title>
        <meta name="description" content="Wish list page" />
      </Helmet>
      <ScrollToTop />

      {/* <PageWrapper> */}
      {/* <Row className="settings-account__container">
        <Tabs
          className="settings-account__container-wrap"
          onChange={onChangeTabs}
          activeKey={currentTab}
          defaultActiveKey="1"
          tabPosition="left"
          size="large"
        >
          <TabPane tab={<Row style={styless}>Thông tin tài khoản</Row>} key="1">
            <AccountInformation userInfor={userInformation} />
          </TabPane>
          <TabPane tab={<Row style={styless}>Mã giảm giá</Row>} key="2">
            <Discount />
          </TabPane>
          <TabPane tab={<Row style={styless}>Thay đổi mật khẩu</Row>} key="3">
            <ChangePassword />
          </TabPane>
          <TabPane tab={<Row style={styless}>Thanh Toán</Row>} key="4">
            <Payment />
          </TabPane>
        </Tabs>
      </Row> */}
      {/* </PageWrapper> */}
      <PersonalPage />
    </Fragment>
  );
};
