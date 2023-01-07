import { Pagination, Row } from 'antd';
import { renderGender } from 'app/pages/user/home-page/base/room-suggestion/template';
import { FiterBarRoomLoadMore } from 'app/pages/user/suggestion-page/base/skeleton-loading-room-loadmore';
import { filterPostingRequest } from 'app/pages/user/suggestion-page/screen/action';
import LogoUyTin from 'assets/protection.png';
import { convertPrice } from 'helper/convert-price-to-vnd';
import { getQueryVariable } from 'helper/index';
import { ScrollToTop } from 'hooks/scroll-to-top';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { RootState } from 'types/RootState';
import NotfoundImage from 'assets/not-found.png';
import './style.scss';

export interface SuggesstionListsProps {
  listsfour?: boolean;
  setViewMap?: any;
}

export const SuggesstionLists = (props: any) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const houseName: string = getQueryVariable('houseName');
  const roomType: string = getQueryVariable('roomType');
  const typeRental: string = getQueryVariable('typeRental');

  const [checkfavourite, setCheckFavourite]: any = useState(true);

  const state = useSelector((state: RootState) => state?.searchPageReducer);

  useEffect(() => {
    window.scrollTo(0, 0);
    const newArr: any = [];
    const newRentalArr: any = [];

    if (typeRental !== '') {
      if (typeRental !== 'null') {
        newRentalArr.push(typeRental);
        props?.setFilter({
          ...props?.filter,
          typeOfRentalIds: newRentalArr,
          pageSize: 15,
          pageIndex: 1,
        });

        props?.setApplyFilter(true);
      }

      dispatch(
        filterPostingRequest({
          ...props?.filter,
          typeOfRentalIds: newRentalArr,
          pageSize: 15,
          pageIndex: 1,
        })
      );
    }

    if (roomType !== '') {
      newArr.push(roomType);
      props?.setFilter({
        ...props?.filter,
        roomCategoryIds: newArr,
        pageSize: 15,
        pageIndex: 1,
      });

      props?.setApplyFilter(true);

      dispatch(
        filterPostingRequest({
          ...props?.filter,
          roomCategoryIds: newArr,
          pageSize: 15,
          pageIndex: 1,
        })
      );
    }
    if (decodeURI(houseName) !== '') {
      dispatch(
        filterPostingRequest({
          ...props?.filter,
          houseName: decodeURI(houseName),
          pageSize: 15,
          pageIndex: 1,
        })
      );
    }
    if (!decodeURI(houseName) && !roomType && !typeRental) {
      dispatch(filterPostingRequest({ ...props.filter, pageSize: 15 }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [houseName, roomType, typeRental]);

  let roomTypeComponent: any = '';

  if (state?.dataResponse?.length > 0 && checkfavourite) {
    roomTypeComponent = state?.dataResponse.map((item: any, key: any) => {
      let thanhPho = item.thanhPho.includes('Thành phố')
        ? item.thanhPho.replace('Thành phố', '')
        : item.thanhPho.replace('Tỉnh', '');

      return (
        // <Col xs={24} xl={4} key={key} className="mb-40">
        <div className="col-lg-15 col-sm-6 mt-50" key={key}>
          <Link
            to={`/post/${item?.post?.id}/${item?.post?.room.id}`}
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
                    )}₫/${item?.post?.room?.type}`}
              </div>

              <div
                className="room__suggestion--item--sub"
                style={{ paddingTop: 4 }}
              >
                <div>{`${item?.phuongXa}, ${item?.quanHuyen}, ${thanhPho}`}</div>
              </div>
            </div>
          </Link>
          {/* </Col> */}
        </div>
      );
    });
  }

  return (
    <Fragment>
      {/* {state?.dataResponse?.length > 0 ? (
        <div className="room__suggestion-list__container">
          <Row className="amenities__row">{roomTypeComponent}</Row>
        </div>
      ) : (
        <FiterBarRoom />
      )} */}
      <ScrollToTop />
      {state?.loading ? (
        <div className="room__suggestion-list__container">
          <Row
            className="amenities__row"
            style={{ padding: '50px 30px 0px 30px' }}
          >
            <FiterBarRoomLoadMore />
          </Row>
        </div>
      ) : state?.dataResponse?.length > 0 ? (
        <>
          <div className="room__suggestion-list__container">
            <Row className="amenities__row" style={{ padding: '0px 30px' }}>
              {roomTypeComponent}
            </Row>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Pagination
                style={{ padding: '30px 40px 0px 0px' }}
                defaultCurrent={state?.data?.currentPage}
                total={state?.data?.totalItems}
                showSizeChanger={false}
                pageSize={state?.data?.pageSize ? state?.data?.pageSize : 15}
                onChange={(pageNext: any) => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  props?.setFilter({
                    ...props.filter,
                    pageIndex: pageNext,
                    pageSize: 15,
                  });
                  dispatch(
                    filterPostingRequest({
                      ...props.filter,
                      pageIndex: pageNext,
                      pageSize: 15,
                    })
                  );
                }}
              />
            </div>
          </div>
          <div
            style={{
              zIndex: 999,
              position: 'sticky',
              bottom: 20,
              right: 0,
              width: 200,
              left: 0,
              marginLeft: 'auto',
              marginRight: 'auto',
              textAlign: 'center',
              backgroundColor: '#222222',
              color: 'white',
              padding: '10px 20px',
              borderRadius: 12,
              cursor: 'pointer',
            }}
            onClick={() => {
              props?.setApplyFilter(false);
              props?.setFilter({
                ...props?.filter,
                verify: '',
                minArea: null,
                maxArea: null,
                typeOfRentalIds: null,
                roomCategoryIds: null,
                minPrice: null,
                maxPrice: null,
                houseName: '',
                maximumNumberOfPeople: null,
                amenityHouseIds: null,
                amenityRoomIds: null,
                roomMate: '',
              });
              props?.setViewMap({
                isMap: true,
                title: 'Lưới',
              });
              history.push('/suggesstion?type=map');
            }}
          >
            Dạng map
          </div>
        </>
      ) : state?.dataResponse?.length === 0 &&
        !state?.loading &&
        state?.status === '200' ? (
        <div className="room__suggestion-list__container">
          <Row
            className="amenities__row"
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '0px 30px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                fontSize: 20,
                fontWeight: 'bold',
                paddingTop: 50,
              }}
            >
              <div>
                <img
                  style={{
                    height: 250,
                  }}
                  src={NotfoundImage}
                />
                <div
                  style={{
                    textAlign: 'center',
                  }}
                >
                  Không có địa điểm nào được tìm thấy!
                </div>
              </div>
            </div>
          </Row>
        </div>
      ) : (
        ''
      )}
    </Fragment>
  );
};
