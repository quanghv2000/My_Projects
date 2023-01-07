import { TeamOutlined } from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Col,
  InputNumber,
  Row,
  Slider,
  Tooltip,
  Typography,
} from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { convertPrice } from 'helper/convert-price-to-vnd';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { RootState } from 'types';
import {
  filterPostingRequest,
  clearState,
  filterPostingMapRequest,
} from 'app/pages/user/suggestion-page/screen/action';
import { renderGender } from 'app/pages/user/home-page/base/room-suggestion/template';
import './style.scss';
import { getQueryVariable } from 'helper';

export const FilterBar: React.FC<any> = (props: any) => {
  const dispatch = useDispatch();
  const stateAdminTypeOfRental = useSelector(
    (state: RootState) => state?.adminTypeOfRentalPageReducer
  );

  const stateCategoryRoom = useSelector(
    (state: RootState) => state?.adminRoomCategoryPageReducer
  );

  const stateAdminAmenity = useSelector(
    (state: RootState) => state?.adminAmenityPageReducer
  );

  const [typeOfRental, setTypeOfRental] = useState([]);
  const [categoryRoom, setCategoryRoom] = useState([]);
  const [roomMate, setRoomMate]: any = useState([
    {
      // female
      id: 2,
      value: 'F',
      title: 'Phòng cho Nữ',
      checked: false,
    },
    {
      // male
      id: 1,
      value: 'M',
      title: 'Phòng cho Nam',
      checked: false,
    },
  ]);

  const { Text } = Typography;
  const [tenants, setTenants] = useState(1);
  const [budget, setBudget] = useState({
    minValue: 0,
    maxValue: 1000,
  });

  const [amenity, setAmenity] = useState({
    house: [],
    room: [],
  });

  const onHandleBudgetChange = (e: any) => {
    props?.setApplyFilter(true);
    props.setFilter({
      ...props.filter,
      minPrice: e[0] * 10000,
      maxPrice: e[1] * 10000,
    });
    setBudget({ minValue: e[0], maxValue: e[1] });
  };

  useEffect(() => {
    let houseAmenity: any = [];
    let roomAmenity: any = [];
    if (stateAdminAmenity?.dataResponse?.length > 0) {
      stateAdminAmenity?.dataResponse?.map((item: any) => {
        if (item?.type === 'house') {
          houseAmenity.push({
            ...item,
            checked: false,
          });
        }
        if (item?.type === 'room') {
          roomAmenity.push({
            ...item,
            checked: false,
          });
        }
      });
    }
    setAmenity({
      house: houseAmenity,
      room: roomAmenity,
    });
  }, [stateAdminAmenity?.dataResponse]);

  useEffect(() => {
    const newData: any = [];
    if (
      getQueryVariable('roomType') &&
      stateCategoryRoom?.dataResponse?.length > 0 &&
      categoryRoom?.length > 0
    ) {
      categoryRoom?.map((item: any) => {
        if (item?.id == getQueryVariable('roomType')) {
          newData.push({
            ...item,
            checked: true,
          });
        } else newData.push(item);
      });
      setCategoryRoom(newData);
    }
  }, [
    getQueryVariable('roomType'),
    stateCategoryRoom?.dataResponse,
    categoryRoom?.length,
  ]);

  useEffect(() => {
    const newData: any = [];
    if (
      getQueryVariable('typeRental') &&
      stateAdminTypeOfRental?.dataResponse?.length > 0 &&
      typeOfRental?.length > 0
    ) {
      typeOfRental?.map((item: any) => {
        if (item?.id == getQueryVariable('typeRental')) {
          newData.push({
            ...item,
            checked: true,
          });
        } else newData.push(item);
      });
      setTypeOfRental(newData);
    }
  }, [
    getQueryVariable('typeRental'),
    stateAdminTypeOfRental?.dataResponse,
    typeOfRental?.length,
  ]);

  useEffect(() => {
    let newData: any = [];
    if (stateAdminTypeOfRental?.dataResponse?.length > 0) {
      stateAdminTypeOfRental?.dataResponse?.map((item: any) => {
        newData.push({
          ...item,
          checked: false,
        });
      });
    }
    setTypeOfRental(newData);
  }, [stateAdminTypeOfRental?.dataResponse]);

  useEffect(() => {
    let newData: any = [];
    if (stateCategoryRoom?.dataResponse?.length > 0) {
      stateCategoryRoom?.dataResponse?.map((item: any) => {
        newData.push({
          ...item,
          checked: false,
        });
      });
    }
    setCategoryRoom(newData);
  }, [stateCategoryRoom?.dataResponse]);

  const className = props?.show
    ? 'filter__bar__container__fixed scroll__active'
    : 'filter__bar__container__fixed';

  const getAllItemChecked = (listData) => {
    const newData: any = [];
    listData?.map((item: any) => {
      if (item?.checked) {
        newData.push(item?.id);
      }
    });
    return newData;
  };

  const deleteAllItemChecked = (listData) => {
    const newData: any = [];
    listData?.map((item: any) => {
      newData.push({
        ...item,
        checked: false,
      });
    });
    return newData;
  };

  const onChangeRental = (e: CheckboxChangeEvent) => {
    props?.setApplyFilter(true);
    let newArray: any = [];
    typeOfRental?.map((item: any) => {
      if (item?.id === e.target.value) {
        item.checked = e.target.checked;
      }
      newArray.push(item);
    });
    setTypeOfRental(newArray);

    props.setFilter({
      ...props.filter,
      typeOfRentalIds: getAllItemChecked(newArray),
    });
  };

  const onChangeRoomType = (e: CheckboxChangeEvent) => {
    props?.setApplyFilter(true);
    let newArray: any = [];
    categoryRoom?.map((item: any) => {
      if (item?.id === e.target.value) {
        item.checked = e.target.checked;
      }
      newArray.push(item);
    });
    setCategoryRoom(newArray);
    props.setFilter({
      ...props.filter,
      roomCategoryIds: getAllItemChecked(newArray),
    });
  };

  const onChangeHouseAmenity = (e: CheckboxChangeEvent) => {
    props?.setApplyFilter(true);
    let newArray: any = [];
    amenity.house?.map((item: any) => {
      if (item?.id === e.target.value) {
        item.checked = e.target.checked;
      }
      newArray.push(item);
    });
    setAmenity({
      ...amenity,
      house: newArray,
    });
    props.setFilter({
      ...props.filter,
      amenityHouseIds: getAllItemChecked(newArray),
    });
  };

  const onChangeRoomAmenity = (e: CheckboxChangeEvent) => {
    props?.setApplyFilter(true);
    let newArray: any = [];
    amenity.room?.map((item: any) => {
      if (item?.id === e.target.value) {
        item.checked = e.target.checked;
      }
      newArray.push(item);
    });
    setAmenity({
      ...amenity,
      room: newArray,
    });
    props.setFilter({
      ...props.filter,
      amenityRoomIds: getAllItemChecked(newArray),
    });
  };

  const onChangeRoomMate = (e: CheckboxChangeEvent) => {
    props?.setApplyFilter(true);
    let itemSearch: any = '';
    let newArray: any = [];
    let count = 0;
    roomMate?.map((item: any) => {
      if (item?.id === e.target.value) {
        item.checked = e.target.checked;
      }
      if (item.checked === true) {
        count += 1;
      }
      newArray.push(item);
    });
    setRoomMate(newArray);

    if (count === roomMate?.length) {
      itemSearch = 'MF';
    } else {
      roomMate?.map((item: any) => {
        if (item?.checked) {
          itemSearch = item?.value;
        }
      });
    }

    props.setFilter({
      ...props.filter,
      roomMate: itemSearch,
    });
  };

  const clearChecked = () => {
    const typeOfRentalDel = deleteAllItemChecked(typeOfRental);
    setTypeOfRental(typeOfRentalDel);

    const categoryRoomDel = deleteAllItemChecked(categoryRoom);
    setCategoryRoom(categoryRoomDel);

    const roomMateDel = deleteAllItemChecked(roomMate);
    setRoomMate(roomMateDel);

    const amenityHouseDel = deleteAllItemChecked(amenity?.house);
    const amenityRoomDel = deleteAllItemChecked(amenity?.room);
    setAmenity({
      room: amenityRoomDel,
      house: amenityHouseDel,
    });

    setTenants(0);

    setBudget({
      minValue: 0,
      maxValue: 200,
    });

    props?.setApplyFilter(false);
    props?.setFilter({
      pageIndex: getQueryVariable('type') === 'map' ? '' : 1,
      pageSize: getQueryVariable('type') === 'map' ? '' : 15,
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
  };

  useEffect(() => {
    if (props?.isApplyFilter === false) {
      clearChecked();
    }
  }, [props?.isApplyFilter]);

  return (
    <Fragment>
      <div
        className={`${className} ${
          getQueryVariable('type') === 'map' ? '' : 'fixed'
        }`}
      >
        <div className="filter__bar__container">
          {' '}
          <div style={{ padding: 30 }}>
            <div className="filter__responsive">
              <Button
                className="btn search-filter__button mt-10"
                type="primary"
                style={
                  props?.isApplyFilter
                    ? {
                        backgroundColor: '#ff4d4f',
                        borderColor: '#ff4d4f',
                        color: 'white',
                      }
                    : {
                        backgroundColor: 'white',
                        color: 'black',
                      }
                }
                onClick={clearChecked}
              >
                Xoá Bộ lọc
              </Button>
              <div
                style={{
                  // overflowX: 'scroll',
                  width: '100%',
                }}
              >
                <Button
                  style={
                    props.filter.verify === 'verified'
                      ? {
                          backgroundColor: '#1CA4DA',
                          color: 'white',
                        }
                      : {}
                  }
                  className="btn search-filter__button mt-10"
                  onClick={() => {
                    if (props.filter.verify === 'verified') {
                      props?.setApplyFilter(true);
                      props.setFilter({ ...props.filter, verify: '' });
                    } else {
                      props?.setApplyFilter(true);
                      props.setFilter({ ...props.filter, verify: 'verified' });
                    }
                  }}
                >
                  Đã xác thực
                </Button>
                <Tooltip
                  placement="bottomLeft"
                  title={
                    <>
                      <div
                        style={{
                          backgroundColor: 'white',
                          padding: 15,
                          borderRadius: 4,
                        }}
                      >
                        {typeOfRental.length > 0
                          ? typeOfRental.map((item: any, index) => {
                              return (
                                <div key={index}>
                                  <Checkbox
                                    checked={item?.checked}
                                    value={item?.id}
                                    onChange={onChangeRental}
                                    style={{ padding: 5, fontSize: 16 }}
                                  >
                                    <p> {item.name}</p>
                                  </Checkbox>
                                </div>
                              );
                            })
                          : ''}
                      </div>
                    </>
                  }
                >
                  <Button className="btn search-filter__button mt-10">
                    Loại hình cho thuê{' '}
                    {props?.filter?.typeOfRentalIds?.length > 0
                      ? `(${props?.filter?.typeOfRentalIds?.length})`
                      : ''}
                  </Button>
                </Tooltip>
                <Tooltip
                  placement="bottomLeft"
                  title={
                    <>
                      <div
                        style={{
                          backgroundColor: 'white',
                          padding: 15,
                          borderRadius: 4,
                        }}
                      >
                        {categoryRoom.length > 0
                          ? categoryRoom.map((item: any, index) => {
                              return (
                                <div key={index}>
                                  <Checkbox
                                    checked={item?.checked}
                                    value={item?.id}
                                    onChange={onChangeRoomType}
                                    style={{ padding: 5, fontSize: 16 }}
                                  >
                                    <p> {item.name}</p>
                                  </Checkbox>
                                </div>
                              );
                            })
                          : ''}
                      </div>
                    </>
                  }
                >
                  <Button className="btn search-filter__button mt-10">
                    Loại phòng{' '}
                    {props?.filter?.roomCategoryIds?.length > 0
                      ? `(${props?.filter?.roomCategoryIds?.length})`
                      : ''}
                  </Button>
                </Tooltip>

                {/* amenities house */}

                <Tooltip
                  placement="bottomLeft"
                  title={
                    <>
                      <div
                        style={{
                          backgroundColor: 'white',
                          padding: 15,
                          borderRadius: 4,
                        }}
                      >
                        {amenity?.house?.length > 0
                          ? amenity?.house?.map((item: any, index) => {
                              return (
                                <div key={index}>
                                  <Checkbox
                                    checked={item?.checked}
                                    value={item?.id}
                                    onChange={onChangeHouseAmenity}
                                    style={{ padding: 5, fontSize: 16 }}
                                  >
                                    <p> {item.name}</p>
                                  </Checkbox>
                                </div>
                              );
                            })
                          : ''}
                      </div>
                    </>
                  }
                >
                  <Button className="btn search-filter__button mt-10">
                    Tiện nghi cho nhà{' '}
                    {props?.filter?.amenityHouseIds?.length > 0
                      ? `(${props?.filter?.amenityHouseIds?.length})`
                      : ''}
                  </Button>
                </Tooltip>

                {/* amenities room */}

                <Tooltip
                  placement="bottomLeft"
                  title={
                    <>
                      <div
                        style={{
                          backgroundColor: 'white',
                          padding: 15,
                          borderRadius: 4,
                          height: 500,
                          overflowY: 'scroll',
                        }}
                      >
                        {amenity?.room?.length > 0
                          ? amenity?.room?.map((item: any, index) => {
                              return (
                                <div key={index}>
                                  <Checkbox
                                    checked={item?.checked}
                                    value={item?.id}
                                    onChange={onChangeRoomAmenity}
                                    style={{ padding: 5, fontSize: 16 }}
                                  >
                                    <p> {item.name}</p>
                                  </Checkbox>
                                </div>
                              );
                            })
                          : ''}
                      </div>
                    </>
                  }
                >
                  <Button className="btn search-filter__button mt-10">
                    Tiện nghi cho phòng{' '}
                    {props?.filter?.amenityRoomIds?.length > 0
                      ? `(${props?.filter?.amenityRoomIds?.length})`
                      : ''}
                  </Button>
                </Tooltip>

                <Tooltip
                  style={{ width: '100%' }}
                  placement="bottomLeft"
                  title={
                    <>
                      <Row
                        className="budget-filter__wrap"
                        style={{ padding: '10px 20px', marginTop: 10 }}
                      >
                        <Col span={24}>
                          <Slider
                            range
                            // defaultValue={[0, 1000000]}
                            defaultValue={[budget.minValue, budget.maxValue]}
                            value={[budget.minValue, budget.maxValue]}
                            step={10}
                            max={1000}
                            tooltipVisible={false}
                            onChange={(e) => onHandleBudgetChange(e)}
                            marks={{
                              0: '0',
                              200: '2Tr',
                              400: '4Tr',
                              600: '6Tr',
                              800: '8Tr',
                              1000: '10Tr',
                            }}
                          />
                        </Col>
                        <Row className="budget-filter__input">
                          <Row className="budget__min-price budget-price">
                            <Text className="budget-title">Giá thấp nhất</Text>
                            <InputNumber
                              className="budget-number"
                              value={budget.minValue}
                              min={0}
                              max={1000}
                              step={100}
                              readOnly
                              addonAfter="VND"
                              formatter={(value: any) =>
                                convertPrice(parseFloat(value) * 10000)
                              }
                              // onChange={(value) => {
                              //   console.log(value);

                              //   props?.setApplyFilter(true);
                              //   setBudget({
                              //     ...budget,
                              //     minValue: value,
                              //   });
                              //   props.setFilter({
                              //     ...props.filter,
                              //     minPrice: value,
                              //   });
                              // }}
                            />
                          </Row>
                          <Row className="budget__max-price budget-price mt-10">
                            <Text className="budget-title">Giá cao nhất</Text>
                            <InputNumber
                              className="budget-number"
                              value={budget.maxValue}
                              min={0}
                              max={1000}
                              step={100}
                              readOnly
                              formatter={(value: any) =>
                                convertPrice(parseFloat(value) * 10000)
                              }
                              addonAfter="VND"
                              // onChange={(value) => {
                              //   props?.setApplyFilter(true);
                              //   setBudget({
                              //     ...budget,
                              //     maxValue: value / 10000,
                              //   });
                              //   props.setFilter({
                              //     ...props.filter,
                              //     maxPrice: value / 10000,
                              //   });
                              // }}
                            />
                          </Row>
                        </Row>
                      </Row>
                    </>
                  }
                >
                  <Button className="btn search-filter__button mt-10">
                    Giá thuê{' '}
                    {props?.filter?.minPrice !== null
                      ? `(${convertPrice(
                          props?.filter?.minPrice
                        )} - ${convertPrice(props?.filter?.maxPrice)})`
                      : ''}
                  </Button>
                </Tooltip>
                <Tooltip
                  placement="bottomLeft"
                  title={
                    <>
                      <Row className="tenants-filter__wrap">
                        <Row className="tenants-people">
                          <TeamOutlined />
                          <Text>(+{tenants}) Người</Text>
                        </Row>
                        <Row className="tenants-slider">
                          <Col style={{ width: '100%' }}>
                            <Slider
                              defaultValue={tenants}
                              min={0}
                              max={10}
                              step={1}
                              tooltipVisible={false}
                              onChange={(e) => {
                                props?.setApplyFilter(true);
                                props.setFilter({
                                  ...props.filter,
                                  maximumNumberOfPeople: e,
                                });
                                setTenants(e);
                              }}
                            />
                          </Col>
                        </Row>
                      </Row>
                    </>
                  }
                >
                  <Button className="btn search-filter__button mt-10">
                    Số người ở{' '}
                    {props?.filter?.maximumNumberOfPeople > 0
                      ? `(${props?.filter?.maximumNumberOfPeople})`
                      : ''}
                  </Button>
                </Tooltip>

                {/* room mate */}

                <Tooltip
                  placement="bottomLeft"
                  title={
                    <>
                      <div
                        style={{
                          backgroundColor: 'white',
                          padding: 15,
                          borderRadius: 4,
                        }}
                      >
                        {roomMate?.length > 0
                          ? roomMate?.map((item: any, index) => {
                              return (
                                <div key={index}>
                                  <Checkbox
                                    checked={item?.checked}
                                    value={item?.id}
                                    onChange={onChangeRoomMate}
                                    style={{ padding: 5, fontSize: 16 }}
                                  >
                                    <p> {item.title}</p>
                                  </Checkbox>
                                </div>
                              );
                            })
                          : ''}
                      </div>
                    </>
                  }
                >
                  <Button className="btn search-filter__button mt-10">
                    Phòng cho{' '}
                    {props?.filter?.roomMate !== ''
                      ? `(${renderGender(props?.filter?.roomMate)})`
                      : ''}
                  </Button>
                </Tooltip>
              </div>

              <Button
                onClick={() => {
                  if (getQueryVariable('type') === 'map') {
                    props.setFilter({
                      ...props.filter,
                      pageIndex: '',
                      pageSize: '',
                    });
                    dispatch(
                      filterPostingMapRequest({
                        ...props.filter,
                        pageIndex: '',
                        pageSize: '',
                      })
                    );
                  } else {
                    props.setFilter({
                      ...props.filter,
                      pageIndex: 1,
                      pageSize: 15,
                    });
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    dispatch(
                      filterPostingRequest({
                        ...props.filter,
                        pageIndex: 1,
                        pageSize: 15,
                      })
                    );
                  }
                }}
                type="primary"
                style={{ height: 36, marginTop: 10 }}
              >
                Tìm kiếm
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
