import { Fragment, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Row, Tabs } from 'antd';

import { Helmet } from 'react-helmet-async';
import { NavBar } from 'app/components/navbar';
import { ScrollToTop } from 'hooks/scroll-to-top';
import { PageWrapper } from 'app/components/page-wrapper';

import SettingsAccount from 'app/pages/user/settings-account-page/screen/Loadable';
import WishList from 'app/pages/user/wish-list-page/Loadable';

import './style.scss';

export interface AboutUserProps {}

export const AboutUser = (props: AboutUserProps) => {
  const location = useLocation();
  const [currentTab, setCurrentTab] = useState('1');

  const { TabPane } = Tabs;
  const history = useHistory();

  // clear msg,old state when access page
  useEffect(() => {
    if (location?.pathname === '/user/wish-list') {
      setCurrentTab('2');
    }
    if (location?.pathname === '/user/profile') {
      setCurrentTab('1');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const onChangeTabs = (key) => {
    if (key === '1') {
      setCurrentTab('1');
      history.push('/user/profile');
    } else if (key === '2') {
      setCurrentTab('2');
      history.push('/user/wish-list');
    }
  };

  return (
    <Fragment>
      <Helmet>
        <title>Wish list</title>
        <meta name="description" content="Wish list page" />
      </Helmet>

      <ScrollToTop />
      <NavBar />

      <PageWrapper>
        <Row className="aboutuser__container">
          <Row className="aboutuser__container-type">
            <Tabs
              defaultActiveKey="1"
              onChange={onChangeTabs}
              size="large"
              activeKey={currentTab}
              style={{
                margin: '32px 0',
                width: '100%',
              }}
            >
              <TabPane tab="Cài đặt tài khoản" key="1">
                <SettingsAccount />
              </TabPane>
              <TabPane tab="Chỗ ở yêu thích" key="2">
                <WishList />
              </TabPane>
            </Tabs>
          </Row>
        </Row>
      </PageWrapper>
    </Fragment>
  );
};
