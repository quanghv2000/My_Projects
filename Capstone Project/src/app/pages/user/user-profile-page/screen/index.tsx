import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Image, Row } from 'antd';
import { NavBar } from 'app/components/navbar';
import { ScrollToTop } from 'hooks/scroll-to-top';
import { Fragment, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { PersonalPage } from 'app/pages/user/user-profile-page/base/personal-page';
import { getUserInfoRequest } from 'app/pages/landlord/host-profile-page/screen/action';

import './style.scss';
import { useDispatch } from 'react-redux';

export interface UserProfileProps {}

export const UserProfile = (props: UserProfileProps) => {
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

  return (
    <Fragment>
      <Helmet>
        <title>User profile</title>
        <meta name="description" content="User profile" />
      </Helmet>
      {/* <ScrollToTop /> */}
      {/* Header */}
      <NavBar navbarfixed={false} />

      <PersonalPage />

      {/* <Row className="user-profile__container">
        <Col span={8} className="user-profile__container-information">
          <Row className="user-information">
            <Row className="user-information__images">
              <Image
                width={400}
                height={200}
                src="https://img.freepik.com/free-vector/countryside-landscape-concept_52683-46411.jpg?t=st=1653488854~exp=1653489454~hmac=b67386378822dd246375a4cd9a62ff275e62075e8730e52f7a35c0ab0cdace22&w=1060"
                preview={false}
                fallback="data:image/png;base64,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"
                className="image-banner"
              />
              <Row className="user-avatar">
                <Avatar
                  size={80}
                  src="https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-cap-2-3.jpg"
                  className="avatar"
                />
              </Row>
            </Row>

            <Row className="user-information__infor">
              <span className="user-name">Nguyễn Thùy Linh</span>
              <span className="user-phone">(+84) 0123 - 345 - 678</span>
              <span className="user-email">example@holahouses.vn</span>
            </Row>
          </Row>

          <Row className="user-isLandlords">
            <span className="landlords-status">Bạn chưa đăng ký nhà</span>
          </Row>
        </Col>

        <Col span={16} className="user-profile__container-description">
          <Row className="description-overview__top">
            <Button>Tổng quan</Button>
            <Button disabled>Hình ảnh</Button>
          </Row>
          <Row className="user-about user-infor-wrap">
            <span className="user-about__information user-title">
              Thông tin
            </span>
            <span className="user-about__description">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum
              nulla necessitatibus recusandae iusto voluptatibus dolor placeat
              corrupti beatae, corporis illo fugit maxime alias, molestias autem
              voluptates facilis non velit vitae?
              <br /> <br />
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum
              nulla necessitatibus recusandae iusto voluptatibus dolor placeat
              corrupti beatae, corporis illo fugit maxime alias, molestias autem
              voluptates facilis non velit vitae?
              <br /> <br />
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod illo
              reiciendis asperiores voluptatem atque quibusdam blanditiis nemo,
              eaque laborum fugit autem ab quidem dolore excepturi, magnam
              officiis molestiae, laboriosam saepe! Excepturi quis placeat et,
              architecto debitis suscipit, aperiam repellat expedita fuga
              tenetur ex at inventore tempore! Nisi placeat non fugit alias
              odio, qui nostrum eos at cupiditate? Molestias, dignissimos
              debitis?
            </span>
          </Row>

          <Row className="user-fav__room user-infor-wrap">
            <span className="user-about__favroom user-title">
              Danh sách phòng yêu thích
            </span>
          </Row>
        </Col>
      </Row> */}
    </Fragment>
  );
};
