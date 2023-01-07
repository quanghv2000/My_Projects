import React, { Fragment } from 'react';
import { Row, Col } from 'antd';
import 'app/pages/user/home-page/base/intro-about-us/style.scss';
import { introAboutUs } from 'app/pages/user/home-page/base/intro-about-us/template';

export const IntroAboutUs: React.FC<any> = () => {
  const introAboutUsComponent = introAboutUs.map((item: any, key: any) => {
    return (
      <Col xs={24} xl={8} key={key} className="mb-10">
        <div className="intro__about__us--item">
          <div className="intro__about__us--item--image">
            <img src={item?.image} alt={item?.title} />
          </div>
          <p className="intro__about__us--item--title">{item?.title}</p>
          <div className="intro__about__us--item--subTitle">
            <p>{item?.subTitle}</p>
          </div>
        </div>
      </Col>
    );
  });

  return (
    <Fragment>
      <div className="intro__about__us__container">
        <Row className="amenities__row">{introAboutUsComponent}</Row>
      </div>
    </Fragment>
  );
};
