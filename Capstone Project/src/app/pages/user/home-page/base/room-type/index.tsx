import React, { Fragment, useEffect } from 'react';
import { Row, Col } from 'antd';
import 'app/pages/user/home-page/base/room-type/style.scss';
// import { roomTypeData } from 'app/pages/user/home-page/base/room-type/template';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'types/RootState';
import { useDispatch } from 'react-redux';
import { getDataRoomCategoriesRequest } from 'app/pages/admin/admin-room-category-management-page/screen/action';
import { LoadingRoomType } from 'app/pages/user/home-page/base/skeleton-loading-room-type';

export const RoomType: React.FC<any> = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDataRoomCategoriesRequest(''));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stateAdmin = useSelector(
    (state: RootState) => state?.adminRoomCategoryPageReducer
  );

  let roomTypeComponent;
  if (stateAdmin?.dataResponse?.length > 0) {
    roomTypeComponent = stateAdmin?.dataResponse.map((item: any, key: any) => {
      return (
        <Col xs={24} xl={6} key={key} className="mb-10">
          <div className="room__type--item">
            <Link to={`/suggesstion?roomType=${item?.id}`}>
              <img
                src={item?.imageUrl}
                alt={item?.name}
                className="room__type--item--image"
              />
            </Link>
            <p
              className="room__type--item--title"
              style={{ fontSize: '16px', color: '#333' }}
            >
              {item?.name}
            </p>
            <div
              className="room__type--item--subTitle"
              style={{ color: '#00000080' }}
            >
              <p>{item?.description}</p>
            </div>
          </div>
        </Col>
      );
    });
  }

  return (
    <Fragment>
      <div className="room__type__container">
        <h2
          className="bold mb-20"
          style={{ color: '#222222', fontSize: 24, padding: '0px 10px' }}
        >
          Loại phòng cho bạn
        </h2>
        <Row className="amenities__row">
          {roomTypeComponent ? roomTypeComponent : <LoadingRoomType />}
        </Row>
      </div>
    </Fragment>
  );
};
