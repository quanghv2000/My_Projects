import { Col, Row, Spin } from 'antd';
import {
  addToFavouriteRequest,
  getListFavouriteRequest,
} from 'app/pages/user/detail-room-page/screen/action';
import { renderGender } from 'app/pages/user/home-page/base/room-suggestion/template';
import LogoUyTin from 'assets/protection.png';
import { convertPrice } from 'helper/convert-price-to-vnd';
import { ScrollToTop } from 'hooks/scroll-to-top';
import { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { RootState } from 'types/RootState';
import './style.scss';

export interface WishListProps {}

export const WishList = (props: WishListProps) => {
  const token = localStorage.getItem('token');
  const history = useHistory();
  const userInfoCookies = localStorage.getItem('user-info');
  const [loading, setLoading] = useState(false);
  // const userInfoCookies = getCookie('user-info');
  let userInfo: any;

  if (userInfoCookies) {
    userInfo = JSON.parse(userInfoCookies);
  }

  const stateListFavourite = useSelector(
    (state: RootState) => state?.detailRoomReducer?.listFavourite
  );

  const stateRoomReducer = useSelector(
    (state: RootState) => state?.detailRoomReducer
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (token && userInfo?.role?.id) {
      dispatch(getListFavouriteRequest(''));
    }
  }, []);

  useEffect(() => {
    if (stateRoomReducer?.message === 'favourite-update') {
      dispatch(getListFavouriteRequest(''));
      setLoading(false);
    }
  }, [stateRoomReducer?.message]);

  let roomTypeComponent: any = 'Danh sách yêu thích trống!';

  if (stateListFavourite?.posts?.length > 0) {
    roomTypeComponent = stateListFavourite?.posts.map((item: any, key: any) => {
      let thanhPho = item.thanhPho.includes('Thành phố')
        ? item.thanhPho.replace('Thành phố', '')
        : item.thanhPho.replace('Tỉnh', '');
      return (
        <Col xs={24} xl={6} key={key} style={{ padding: 10 }} className="mb-10">
          <div className="room__suggestion--item">
            <div style={{ position: 'relative' }}>
              <img
                onClick={() =>
                  history.push(`/post/${item?.id}/${item?.roomId}`)
                }
                src={item?.houseImageUrl}
                alt={item?.houseName}
                className="room__suggestion--item--image"
              />
              <i
                style={{
                  zIndex: 99,
                  position: 'absolute',
                  right: 10,
                  top: 10,
                  fontSize: 20,
                  color: '#F67539',
                }}
                onClick={() => {
                  setLoading(true);
                  dispatch(
                    addToFavouriteRequest({
                      postId: item?.id,
                    })
                  );
                }}
                className="fa-solid fa-heart mr-5"
              ></i>
            </div>
            <Link
              to={`/post/${item?.id}/${item?.roomId}`}
              style={{ color: 'inherit' }}
            >
              <div
                style={{
                  paddingTop: 5,
                  paddingBottom: 10,
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ color: '#5e5e5e' }}>
                  {item?.houseTypeOfRental} -{' '}
                  <i
                    className="fa-regular fa-user"
                    style={{ fontSize: 11, paddingBottom: 10 }}
                  ></i>{' '}
                  {renderGender(item?.roomMate)}
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
                {item?.verify === 'VERIFIED' ? (
                  <div style={{ height: 25 }}>
                    <img
                      src={LogoUyTin}
                      alt="uy-tin.png"
                      style={{ height: 23, marginRight: 2, marginBottom: 4 }}
                    />
                    <span className="ml-5 bold">{item?.houseName}</span>
                  </div>
                ) : (
                  <div style={{ height: 25, fontWeight: 'bold' }}>
                    {item?.houseName}
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
                  ? `${convertPrice(item?.minPrice)}₫/tháng`
                  : `${convertPrice(item?.minPrice)}₫ - ${convertPrice(
                      item?.maxPrice
                    )}₫/tháng`}
              </div>

              <div
                className="room__suggestion--item--sub"
                style={{ paddingTop: 4 }}
              >
                <div>{`${item?.phuongXa}, ${item?.quanHuyen}, ${thanhPho}`}</div>
              </div>
            </Link>
          </div>
        </Col>
      );
    });
  }

  return (
    <Fragment>
      <Helmet>
        <title>Wish list</title>
        <meta name="description" content="Wish list page" />
      </Helmet>
      <ScrollToTop />
      <Spin spinning={loading} delay={100}>
        <Row className="amenities__row">{roomTypeComponent}</Row>
      </Spin>
    </Fragment>
  );
};
