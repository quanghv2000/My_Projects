import React, { Fragment, useState, useEffect } from 'react';
import { Tabs } from 'antd';
import 'app/pages/user/detail-room-page/base/detail-room-content/style.scss';
import { Amenities } from 'app/pages/user/detail-room-page/base/amenities';
import { AmenitieHouse } from 'app/pages/user/detail-room-page/base/amenities-house';
import { RoomInformation } from 'app/pages/user/detail-room-page/base/room-information';
import { useSelector } from 'react-redux';
import { RootState } from 'types/RootState';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { convertPrice } from 'helper/convert-price-to-vnd';
import { useParams } from 'react-router-dom';
import LogoUyTin from 'assets/protection.png';
import { getDetailPostWithRoomRequest } from 'app/pages/user/detail-room-page/screen/action';
import moment from 'moment';

export const DetailRoomContent: React.FC<any> = () => {
  const history = useHistory();
  const [currentTab, setCurrentTab] = useState('');
  const state = useSelector(
    (state: RootState) => state?.detailRoomReducer?.dataResponse
  );

  let { id, roomId }: any = useParams();

  const { TabPane } = Tabs;
  const dispatch = useDispatch();
  const onChange = (idRooms: string) => {
    if (id) {
      setCurrentTab(idRooms);
      history.push(`/post/${id}/${idRooms}`);
      dispatch(getDetailPostWithRoomRequest({ id: id, idRoom: idRooms }));
    }
  };

  useEffect(() => {
    if (roomId && id) {
      setCurrentTab(roomId);
    }
  }, [id, roomId]);

  let typeCategoRyroom = '';
  if (state?.post?.house.rooms?.length > 0) {
    typeCategoRyroom = state?.post?.house?.rooms?.map((item: any) => {
      if (item?.status === true) {
        return (
          <TabPane tab={item?.name} key={item?.id}>
            <div>
              <RoomInformation rooms={item} />

              {state?.post?.house?.description ? (
                <>
                  <div>
                    <p className="detail__room__content--detail__description__title">
                      Mô tả nhà
                    </p>
                  </div>
                  <div className="detail__room__content--detail__description">
                    <div>{state?.post?.house?.description}</div>
                  </div>
                </>
              ) : (
                ''
              )}

              <div>
                <p className="detail__room__content--detail__description__title">
                  Mô tả phòng
                </p>
              </div>
              <div className="detail__room__content--detail__description">
                <div
                  dangerouslySetInnerHTML={{
                    __html: item?.description ? item?.description : '',
                  }}
                ></div>
              </div>

              <div className="detail__room__content--detail__amenities">
                <AmenitieHouse amenities={state?.post?.house?.amenities} />
              </div>

              <div className="detail__room__content--detail__amenities">
                <Amenities amenities={item?.amenities} />
              </div>
            </div>
          </TabPane>
        );
      }
    });
  }

  return (
    <Fragment>
      <div className="detail__room__content__container">
        <div className="detail__room__content--detail">
          <p className="detail__room__content--detail-title">
            <p className="detail__room__content--detail-title--house">
              {state?.post?.house?.name ? (
                <div>
                  {state?.post?.house?.name}
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 400,
                      color: 'gray',
                    }}
                  >
                    {state?.post?.house?.typeOfRental?.name}
                  </div>
                </div>
              ) : (
                ''
              )}
            </p>
            <Tabs
              defaultActiveKey={state?.post?.room?.id}
              onChange={onChange}
              activeKey={currentTab}
            >
              {typeCategoRyroom}
            </Tabs>
          </p>
        </div>
        <div className="detail__room__content--right">
          <div className="detail__room__content--right--box">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                borderBottom: '1px solid #d7d7d7',
                paddingBottom: 5,
              }}
            >
              <p style={{}}>
                <span className="detail__room__content--right--box__price">
                  {state?.post?.room?.rentalPrice
                    ? convertPrice(state?.post?.room?.rentalPrice)
                    : ''}{' '}
                  ₫
                </span>
                /{state?.post?.room?.type ? state?.post?.room?.type : 'Tháng'}
              </p>
              <div>
                {state?.post?.verify === 'VERIFIED' ? (
                  <>
                    <img
                      src={LogoUyTin}
                      alt="uy-tin.png"
                      style={{
                        height: 23,
                        marginRight: 2,
                      }}
                    />{' '}
                    <span style={{ fontSize: 14, color: 'gray' }}>
                      Đã xác thực
                    </span>
                  </>
                ) : (
                  ''
                )}
              </div>
            </div>

            <div style={{ marginTop: 15 }}>Thông tin chủ phòng</div>
            <div style={{ marginTop: 20, display: 'flex' }}>
              <img
                style={{ borderRadius: '50%', height: 40, width: 40 }}
                src={
                  state?.post?.house?.user?.imageLink
                    ? state?.post?.house?.user?.imageLink
                    : 'https://joeschmoe.io/api/v1/random'
                }
              />
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: 10,
                  fontWeight: 'bold',
                  fontSize: 15,
                }}
              >
                {state?.post?.house?.user?.fullName
                  ? state?.post?.house?.user?.fullName
                  : 'Chủ nhà'}
              </span>
            </div>
            <div style={{ marginBottom: 30, marginTop: 10 }}>
              Ngày đăng: {moment(state?.post?.startDate).format('DD/MM/YYYY')}
            </div>
            <div>
              <button className="detail__room__content--right--box--button">
                Liên hệ :{' '}
                {state?.post?.house?.phoneNumber
                  ? state?.post?.house?.phoneNumber
                  : ''}
              </button>
            </div>

            {state?.post?.house?.linkFb ? (
              <div style={{ marginTop: 10 }}>
                <button
                  className="detail__room__content--right--box--button--facebook"
                  onClick={() =>
                    (window.location.href = state?.post?.house?.linkFb)
                  }
                >
                  Facebook
                </button>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

{
  /* <Calendar
                fullscreen={false}
                headerRender={({ value, type, onChange, onTypeChange }) => {
                  const start = 0;
                  const end = 12;
                  const monthOptions: any = [];

                  const current: any = value.clone();

                  const localeData: any = value.localeData();
                  const months: any = [];
                  for (let i = 0; i < 12; i++) {
                    current.month(i);

                    months.push(localeData.monthsShort(current));
                  }

                  const mont: any = [
                    'Tháng 1',
                    'Tháng 2',
                    'Tháng 3',
                    'Tháng 4',
                    'Tháng 5',
                    'Tháng 6',
                    'Tháng 7',
                    'Tháng 8',
                    'Tháng 9',
                    'Tháng 10',
                    'Tháng 11',
                    'Tháng 12',
                  ];

                  for (let index = start; index < end; index++) {
                    monthOptions.push(
                      <Select.Option className="month-item" key={`${index}`}>
                        {mont[index]}
                      </Select.Option>
                    );
                  }
                  const month = value.month();

                  const year = value.year();
                  const options: any = [];
                  for (let i = year - 10; i < year + 10; i += 1) {
                    options.push(
                      <Select.Option key={i} value={i} className="year-item">
                        {i}
                      </Select.Option>
                    );
                  }
                  return (
                    <div style={{ paddingTop: 10 }}>
                      <Row gutter={8}>
                        <Col>
                          <Select
                            size="small"
                            dropdownMatchSelectWidth={false}
                            className="my-year-select"
                            onChange={(newYear: any) => {
                              const now = value.clone().year(newYear);
                              onChange(now);
                            }}
                            value={String(year)}
                          >
                            {options}
                          </Select>
                        </Col>
                        <Col>
                          <Select
                            size="small"
                            dropdownMatchSelectWidth={false}
                            value={String(month)}
                            onChange={(selectedMonth) => {
                              const newValue = value.clone();
                              newValue.month(parseInt(selectedMonth, 10));
                              onChange(newValue);
                            }}
                          >
                            {monthOptions}
                          </Select>
                        </Col>
                      </Row>
                    </div>
                  );
                }}
              /> */
}
