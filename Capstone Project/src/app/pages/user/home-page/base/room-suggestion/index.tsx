import { Col, Row } from 'antd';
import 'app/pages/user/home-page/base/room-suggestion/style.scss';
import { getPostingTop8Request } from 'app/pages/user/suggestion-page/screen/action';
import LogoUyTin from 'assets/protection.png';
import { convertPrice } from 'helper/convert-price-to-vnd';
import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from 'types/RootState';
import { renderGender } from 'app/pages/user/home-page/base/room-suggestion/template';
import { LoadingRoom } from 'app/pages/user/home-page/base/skeleton-loading';

export const RoomSuggestion: React.FC<any> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostingTop8Request(''));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const state = useSelector((state: RootState) => state?.searchPageReducer);

  let roomTypeComponent: any = '';

  if (
    state?.dataResponseTop8?.length > 0 &&
    state?.dataResponseTop8?.length <= 8
  ) {
    roomTypeComponent = state?.dataResponseTop8.map((item: any, key: any) => {
      let thanhPho = item.thanhPho.includes('Thành phố')
        ? item.thanhPho.replace('Thành phố', '')
        : item.thanhPho.replace('Tỉnh', '');
      return (
        <Col xs={24} xl={6} key={key} className="mb-40">
          <Link
            to={`/post/${item?.post?.id}/${item?.post?.room?.id}`}
            style={{ color: 'inherit' }}
          >
            <div className="room__suggestion--item">
              <img
                src={item?.post?.house.imageUrl}
                alt={item?.post?.house.name}
                className="room__suggestion--item--image"
              />
              <div
                style={{
                  paddingTop: 5,
                  paddingBottom: 10,
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ color: '#5e5e5e' }}>
                  {item?.post?.house?.typeOfRental?.name} -{' '}
                  <i
                    className="fa-regular fa-user"
                    style={{ fontSize: 11, paddingBottom: 10 }}
                  ></i>{' '}
                  {renderGender(item?.post?.room?.roomMate)}
                </div>

                <div>
                  {' '}
                  {item?.maxArea === item?.minArea
                    ? item?.minArea + ' m²'
                    : `${item?.minArea} - ${item?.maxArea} m²`}
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '-10px',
                }}
              >
                {item?.post?.verify === 'VERIFIED' ? (
                  <div style={{ height: 25 }}>
                    <img
                      src={LogoUyTin}
                      alt="uy-tin.png"
                      style={{ height: 23, marginRight: 2, marginBottom: 4 }}
                    />
                    <span className="ml-5 bold">{item?.post?.house?.name}</span>
                  </div>
                ) : (
                  <div style={{ height: 25, fontWeight: 'bold' }}>
                    {item?.post?.house?.name}
                  </div>
                )}
                <div>
                  <i
                    className="fa fa-star"
                    style={{ color: 'rgb(255, 176, 37)' }}
                  ></i>{' '}
                  <span>
                    {Number.parseFloat(item?.rating).toFixed(1)}{' '}
                    {`(${item?.amountRating})`}
                  </span>
                </div>
              </div>
              <div
                style={{ fontWeight: 'bold', paddingTop: 4, color: '#1CA4DA' }}
              >
                {item?.maxPrice === item?.minPrice
                  ? `${convertPrice(item?.minPrice)}₫/${item?.post?.room?.type}`
                  : `${convertPrice(item?.minPrice)}₫ - ${convertPrice(
                      item?.maxPrice
                    )}/${item?.post?.room?.type}`}
              </div>

              <div
                className="room__suggestion--item--sub"
                style={{ paddingTop: 4 }}
              >
                <div>{`${item?.phuongXa}, ${item?.quanHuyen}, ${thanhPho}`}</div>
              </div>
            </div>
          </Link>
        </Col>
      );
    });
  }

  return (
    <Fragment>
      <div className="room__suggestion__container">
        <Row className="room__suggestion__container-toptite">
          <h2 className="bold mb-20" style={{ color: '#222222', fontSize: 24 }}>
            Gợi ý từ Hola Houses
          </h2>
          <Link to="/suggesstion" className="bold mb-20 view-more">
            {/* <Link to="/suggestion" className="bold mb-20 view-more"> */}
            Xem thêm
          </Link>
        </Row>
        <Row className="amenities__row">
          {roomTypeComponent ? roomTypeComponent : <LoadingRoom />}
        </Row>
      </div>
    </Fragment>
  );
};
