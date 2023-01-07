import React, { Fragment } from 'react';
import { Row, Col } from 'antd';
import 'app/pages/user/detail-room-page/base/room-information/style.scss';
import { useSelector } from 'react-redux';
import { RootState } from 'types/RootState';
import { convertPrice } from 'helper/convert-price-to-vnd';
import { renderGender } from 'app/pages/user/home-page/base/room-suggestion/template';

export const RoomInformation: React.FC<any> = (props: any) => {
  const state = useSelector(
    (state: RootState) => state?.detailRoomReducer?.dataResponse
  );

  return (
    <Fragment>
      <div>
        <p className="room__information__title">Thông tin phòng</p>
      </div>
      <Row className="room__information__row">
        <Col xs={24} xl={6}>
          <div className="room__information__item-title">DIỆN TÍCH</div>
          <div> {props?.rooms.area ? props?.rooms.area : ''} mét vuông</div>
        </Col>
        <Col xs={24} xl={6}>
          <div className="room__information__item-title">
            GIÁ PHÒNG/{props?.rooms?.type ? props?.rooms?.type : 'Tháng'}
          </div>
          <div>
            {props?.rooms.rentalPrice
              ? convertPrice(props?.rooms?.rentalPrice)
              : ''}{' '}
            đồng
          </div>
        </Col>
        <Col xs={24} xl={6}>
          <div className="room__information__item-title">ĐẶT CỌC</div>
          <div>
            {props?.rooms?.deposit
              ? convertPrice(props?.rooms?.deposit) + ' đồng'
              : 'Không'}
          </div>
        </Col>
        <Col xs={24} xl={6}>
          <div className="room__information__item-title">SỨC CHỨA</div>
          <div>
            {props?.rooms?.maximumNumberOfPeople
              ? props?.rooms?.maximumNumberOfPeople
              : ''}{' '}
            {renderGender(props?.rooms?.roomMate)}
          </div>
        </Col>
      </Row>

      <Row className="room__information__row">
        <Col xs={24} xl={6}>
          <div className="room__information__item-title">ĐIỆN</div>
          <div>
            {props?.rooms?.electricityPriceByNumber
              ? convertPrice(props?.rooms?.electricityPriceByNumber) + ' đồng'
              : 'Miễn phí'}
          </div>
        </Col>
        <Col xs={24} xl={6}>
          <div className="room__information__item-title">NƯỚC</div>
          <div>
            {props?.rooms?.waterPricePerMonth
              ? convertPrice(props?.rooms?.waterPricePerMonth) + ' đồng'
              : 'Miễn phí'}
          </div>
        </Col>
        <Col xs={24} xl={6}>
          <div className="room__information__item-title">Loại phòng</div>
          <div>
            {' '}
            {props?.rooms?.roomCategory?.name
              ? props?.rooms?.roomCategory?.name
              : ''}
          </div>
        </Col>
        <Col xs={24} xl={6}>
          <div className="room__information__item-title">TRẠNG THÁI</div>
          {props?.rooms?.status ? (
            <div className="bold" style={{ color: '#1EDB4C' }}>
              Còn phòng
            </div>
          ) : (
            <div className="bold color-error">Hết phòng</div>
          )}
        </Col>
      </Row>

      <Row className="room__information__row">
        <div className="room__information__item-title mr-5">ĐỊA CHỈ:</div>
        <div>
          {state?.street
            ? ` ${state?.street}, ${state?.phuongXa}, ${state?.quanHuyen}, ${state?.thanhPho}`
            : ''}
        </div>
      </Row>
    </Fragment>
  );
};
