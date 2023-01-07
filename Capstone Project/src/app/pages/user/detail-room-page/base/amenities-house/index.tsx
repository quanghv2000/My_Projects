import React, { Fragment } from 'react';
import { Row, Col } from 'antd';
import 'app/pages/user/detail-room-page/base/amenities/style.scss';
import { useSelector } from 'react-redux';
import { RootState } from 'types/RootState';

export const AmenitieHouse: React.FC<any> = (props: any) => {

  const state = props;

  let amenitiesComp = '';
  if (state?.amenities?.length > 0) {
    amenitiesComp = state?.amenities?.map((item: any, key: any) => {
      return (
        <Col xs={24} xl={6} style={{ marginBottom: 30 }} key={key}>
          <img style={{ height: 25, marginRight: 10 }} src={item?.icon} />{' '}
          {item?.name}
        </Col>
      );
    });
  }

  return (
    <Fragment>
      <div>
        <p className="amenities__title">Tiện nghi nhà</p>
        <p className="amenities__sub--title">
          Giới thiệu về các tiện nghi và dịch vụ của nhà
        </p>
      </div>

      <Row className="amenities__row">{amenitiesComp}</Row>
    </Fragment>
  );
};
