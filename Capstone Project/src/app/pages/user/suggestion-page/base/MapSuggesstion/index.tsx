import {
  GoogleMap,
  LoadScript,
  OverlayView,
  Circle,
  Marker,
} from '@react-google-maps/api';
import {
  Button,
  Checkbox,
  Form,
  InputNumber,
  Spin,
  message,
  Modal,
  Row,
  Select,
} from 'antd';
import { getHousePostingMapRequest } from 'app/pages/user/suggestion-page/screen/action';
import LogoUyTin from 'assets/protection.png';
import { convertPrice } from 'helper/convert-price-to-vnd';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from 'types/RootState';
import { DEFAULT_GOOGLE_MAP_API_KEY } from 'utils/config';
import { vietnameseStringToUnicode } from 'helper/search-vietnamese-words';
import { renderGender } from 'app/pages/user/home-page/base/room-suggestion/template';
import { getMapPositonRequest } from 'app/pages/admin/admin-map-position/screen/action';

import './style.scss';
const { Option } = Select;
export interface SuggesstionMapProps {}

export const SuggesstionMap = (props: any) => {
  const history = useHistory();
  const [overlayPositionVisible, setoverlayPositionVisibile] = useState(false);
  const [map, setMap] = useState([]);
  const [mapItem, setMapItem]: any = useState({});
  const [mapCircle, setMapCircle]: any = useState({});
  const [mapCircleLoad, setMapCircleLoad]: any = useState(false);
  const [mapUsing, setMapUsing]: any = useState(false);
  const [unit, setUnit]: any = useState('km');
  const [mapUsingPos, setMapUsingPos]: any = useState({
    position: {
      lat: 0,
      lng: 0,
    },
  });

  const [overlayPosition, setoverlayPosition]: any = useState({
    position: {
      lat: 21.01351,
      lng: 105.527096,
    },
    title: '',
  });

  const [dataFindMap, setDataFindMap]: any = useState({
    name: '',
    m: '',
    lat: 0,
    lng: 0,
  });

  const [dataCircleMap, setDataCircleMap]: any = useState({
    loading: false,
    total: 0,
  });

  useEffect(() => {
    dispatch(getMapPositonRequest(''));
  }, []);

  const stateMap = useSelector(
    (state: RootState) => state?.adminMapPositonPageReducer
  );

  const dataMapSystem =
    stateMap?.dataResponse?.length > 0 ? stateMap?.dataResponse : [];

  const [form] = Form.useForm();

  const state = useSelector((state: RootState) => state?.searchPageReducer);

  const containerStyle = {
    width: '100%',
    height: '100%',
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (state?.dataResponseMap?.length > 0) {
      let newData: any = [];
      state?.dataResponseMap?.map((item: any) => {
        newData.push(item);
        setMap(newData);
      });
    }
  }, [state?.dataResponseMap]);

  useEffect(() => {
    let body = {
      pageIndex: null,
      pageSize: null,
      keyword: '',
      fromDate: null,
      toDate: null,
    };
    // get all house in map
    dispatch(getHousePostingMapRequest(body));
    form.setFieldsValue({
      unit: 'km',
    });
  }, []);

  useEffect(() => {
    let count: any = 0;
    // data response map get from db and dat finding map
    if (mapCircleLoad && state?.dataResponseMap && dataFindMap) {
      state?.dataResponseMap?.map((item: any) => {
        // current position of house
        var loc1: any = new google.maps.LatLng(
          item?.post?.house?.address?.latitude,
          item?.post?.house?.address?.longiude
        );
        // current position of you or maybe you choose
        var loc2: any = new google.maps.LatLng(
          dataFindMap.lat,
          dataFindMap.lng
        ); //Marker Co-ords

        // compute the distance between two position
        var diff = google.maps.geometry.spherical.computeDistanceBetween(
          loc1,
          loc2
        );

        // get total when house inside radius from choosen house
        if (diff < mapCircle?.getRadius()) {
          count += 1;
        }
      });

      setDataCircleMap({
        loading: false,
        total: count,
      });
      setIsModalVisible(false);
    }
  }, [mapCircleLoad, dataFindMap, state?.dataResponseMap]);

  const dispatch = useDispatch();

  const getPixelPositionOffset = (width, height) => ({
    x: -(width / 2),
    y: -(height * 1.14),
  });

  const options = {
    strokeColor: '#76b2e9',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#76b2e9',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    zIndex: 1,
  };

  const onLoad = (circle) => {
    setMapCircleLoad(true);
    setMapCircle(circle);
  };

  const onUnmount = (circle) => {};

  const onFinish = (values: any) => {
    let pos: any = {
      lat: '',
      lng: '',
    };
    let name = '';

    setDataCircleMap({
      ...dataCircleMap,
      loading: true,
    });

    dataMapSystem?.map((item: any) => {
      if (item?.id === values?.place) {
        pos = {
          lat: parseFloat(item?.latitude),
          lng: parseFloat(item?.longitude),
        };
        name = item?.name;
      }
    });

    if (
      mapUsing &&
      mapUsingPos?.position?.lat === 0 &&
      mapUsingPos?.position?.lng === 0
    ) {
      message.error('Bạn cần chọn một địa điểm trên bản đồ rồi vào tìm kiếm');
      return;
    }

    setDataFindMap({
      name: name ? name : 'Vị trí bạn chọn',
      m: values?.unit === 'm' ? values?.m : values?.km * 1000,
      lat:
        mapUsing && mapUsingPos?.position?.lat
          ? mapUsingPos?.position?.lat
          : pos?.lat,
      lng:
        mapUsing && mapUsingPos?.position?.lng
          ? mapUsingPos?.position?.lng
          : pos?.lng,
    });
  };

  return (
    <Spin
      delay={100}
      spinning={map?.length === 0 && stateMap?.loading ? true : false}
    >
      <Row className="google-map__container" style={{ position: 'relative' }}>
        <LoadScript
          googleMapsApiKey={DEFAULT_GOOGLE_MAP_API_KEY}
          libraries={['places', 'geometry']}
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{
              lat: overlayPosition?.position?.lat,
              lng: overlayPosition?.position?.lng,
            }}
            id="map"
            zoom={15}
            onClick={(ev: any) => {
              // if (overlayPositionVisible) {
              //   setoverlayPositionVisibile(false);
              // }
              if (mapUsing) {
                setMapUsingPos({
                  position: {
                    lat: ev.latLng.lat(),
                    lng: ev.latLng.lng(),
                  },
                });
                form.setFieldsValue({
                  lat: ev.latLng.lat(),
                  lng: ev.latLng.lng(),
                });
              }
            }}
            clickableIcons={mapUsing}
          >
            {mapUsing &&
            mapUsingPos?.position?.lat !== 0 &&
            mapUsingPos?.position?.lng !== 0 ? (
              <Marker position={mapUsingPos?.position} />
            ) : (
              ''
            )}
            {/* Child components, such as markers, info windows, etc. */}
            {dataFindMap ? (
              <Marker
                onLoad={onLoad}
                position={{
                  lat: dataFindMap?.lat,
                  lng: dataFindMap?.lng,
                }}
              />
            ) : (
              ''
            )}

            {dataFindMap ? (
              <Circle
                radius={dataFindMap?.m}
                // optional
                onLoad={onLoad}
                // optional
                onUnmount={onUnmount}
                // required
                center={{
                  lat: dataFindMap?.lat,
                  lng: dataFindMap?.lng,
                }}
                // required
                options={options}
              />
            ) : (
              ''
            )}

            <>
              {map?.map((item: any, key: any) => {
                const position: any = {
                  lat: parseFloat(item?.post?.house?.address?.latitude),
                  lng: parseFloat(item?.post?.house?.address?.longiude),
                };

                return (
                  <OverlayView
                    key={key}
                    getPixelPositionOffset={getPixelPositionOffset}
                    position={position}
                    mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                  >
                    <div
                      className="map__maker__label"
                      onClick={() => {
                        setMapItem(item);
                        // setZoom(10);
                        setoverlayPosition({
                          position: position,
                          title: item?.post?.house?.name,
                        });

                        setoverlayPositionVisibile(true);
                      }}
                    >
                      {item?.post?.house?.name}
                    </div>
                  </OverlayView>
                );
              })}

              {overlayPositionVisible ? (
                <OverlayView
                  getPixelPositionOffset={getPixelPositionOffset}
                  position={overlayPosition?.position}
                  mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                >
                  <div className="overlay__view__detail">
                    <div>
                      <img
                        src={mapItem?.post?.house?.imageUrl}
                        alt="dora"
                        style={{
                          height: 200,
                          width: '100%',
                          borderTopLeftRadius: 12,
                          borderTopRightRadius: 12,
                        }}
                        onClick={() => {
                          history.push(
                            `/post/${mapItem?.post?.id}/${mapItem?.post?.room.id}`
                          );
                        }}
                      />
                      <div
                        className="overlay__view__detail--close"
                        onClick={() => setoverlayPositionVisibile(false)}
                      >
                        <i className="fa-solid fa-x"></i>
                      </div>
                    </div>

                    <div
                      style={{ fontSize: 14, padding: 10 }}
                      onClick={() => {
                        history.push(
                          `/post/${mapItem?.post?.id}/${mapItem?.post?.room.id}`
                        );
                      }}
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
                          {mapItem?.post?.house?.typeOfRental?.name} -{' '}
                          <i
                            className="fa-regular fa-user"
                            style={{ fontSize: 11, paddingBottom: 10 }}
                          ></i>{' '}
                          {renderGender(mapItem?.post?.room?.roomMate)}
                        </div>

                        <div>
                          {' '}
                          {mapItem?.maxArea === mapItem?.minArea
                            ? mapItem?.minArea + ' m²'
                            : `${mapItem?.minArea} - ${mapItem?.maxArea} m²`}
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
                        {mapItem?.post?.verify === 'VERIFIED' ? (
                          <div style={{ height: 25 }}>
                            <img
                              src={LogoUyTin}
                              alt="uy-tin.png"
                              style={{
                                height: 23,
                                marginRight: 2,
                                marginBottom: 4,
                              }}
                            />
                            <span className="ml-5 bold">
                              {mapItem?.post?.house?.name}
                            </span>
                          </div>
                        ) : (
                          <div style={{ height: 25, fontWeight: 'bold' }}>
                            {mapItem?.post?.house?.name}
                          </div>
                        )}
                        <div>
                          <i
                            className="fa fa-star"
                            style={{ color: 'rgb(255, 176, 37)' }}
                          ></i>{' '}
                          <span>
                            {Number.parseFloat(mapItem?.rating).toFixed(1)}{' '}
                            {`(${mapItem?.amountRating})`}
                          </span>
                        </div>
                      </div>
                      <div
                        style={{
                          fontWeight: 'bold',
                          paddingTop: 4,
                          color: '#1CA4DA',
                        }}
                      >
                        {mapItem?.maxPrice === mapItem?.minPrice
                          ? `${convertPrice(mapItem?.minPrice)}₫/${
                              mapItem?.post?.room?.type
                            }`
                          : `${convertPrice(
                              mapItem?.minPrice
                            )}₫ - ${convertPrice(mapItem?.maxPrice)}₫/${
                              mapItem?.post?.room?.type
                            }`}
                      </div>
                      <div
                        className="room__suggestion--item--sub"
                        style={{ paddingTop: 4 }}
                      >
                        <div>{`${mapItem?.phuongXa}, ${mapItem?.quanHuyen}, ${
                          mapItem.thanhPho.includes('Thành phố')
                            ? mapItem.thanhPho.replace('Thành phố', '')
                            : mapItem.thanhPho.replace('Tỉnh', '')
                        }`}</div>
                      </div>
                    </div>
                  </div>
                </OverlayView>
              ) : (
                ''
              )}
            </>

            {dataFindMap ? (
              <div
                style={{
                  zIndex: 0,
                  position: 'absolute',
                  top: 100,
                  left: 50,
                  backgroundColor: '#FFFFFF',
                  padding: '10px 20px',
                  borderRadius: 12,
                }}
              >
                <div>
                  Địa điểm: <span className="bold">{dataFindMap?.name}</span>
                </div>
                <div>
                  Bán kính:{' '}
                  <span className="bold">
                    {dataFindMap?.m > 1000
                      ? dataFindMap?.m / 1000
                      : dataFindMap?.m}{' '}
                    {dataFindMap?.m > 1000 ? 'km' : 'm'}
                  </span>
                </div>
                <div>
                  Tổng số nhà:{' '}
                  <span className="bold">{dataCircleMap?.total} nhà</span>
                </div>

                {mapUsing ? (
                  <div
                    style={{
                      paddingTop: 20,
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <Button
                      type="primary"
                      loading={state?.buttonLoading}
                      style={{ width: '100%' }}
                      onClick={() => {
                        if (
                          mapUsing &&
                          mapUsingPos?.position?.lat === 0 &&
                          mapUsingPos?.position?.lng === 0
                        ) {
                          message.error(
                            'Bạn cần chọn một địa điểm trên bản đồ rồi vào tìm kiếm'
                          );
                          return;
                        } else {
                          setDataFindMap({
                            name: 'Vị trí bạn chọn',
                            m:
                              form.getFieldValue('unit') === 'm'
                                ? form.getFieldValue('m')
                                : parseFloat(form.getFieldValue('km')) * 1000,
                            lat: mapUsingPos?.position?.lat,
                            lng: mapUsingPos?.position?.lng,
                          });
                        }
                      }}
                    >
                      Tìm kiếm
                    </Button>
                  </div>
                ) : (
                  ''
                )}
              </div>
            ) : (
              ''
            )}
          </GoogleMap>
        </LoadScript>
        <div
          style={{
            zIndex: 0,
            position: 'absolute',
            top: 10,
            left: 200,
            borderRadius: 12,
            cursor: 'pointer',
          }}
        >
          <Button className="btn search-filter__button" onClick={showModal}>
            Tìm kiếm trên bản đồ
          </Button>
        </div>
        <div
          style={{
            zIndex: 999,
            position: 'absolute',
            bottom: 10,
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
              pageIndex: 1,
              pageSize: 15,
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
              isMap: false,
              title: 'Bản Đồ',
            });
            history.push('/suggesstion?type=list');
          }}
        >
          Danh sách
        </div>

        <Modal
          title="Tìm kiếm theo bản đồ"
          visible={isModalVisible}
          footer={null}
          onCancel={handleCancel}
        >
          <div style={{ padding: '10px 20px' }}>
            <Form form={form} name="basic" onFinish={onFinish}>
              <Form.Item label="Chọn địa điểm" name="place">
                <Select
                  style={{
                    width: '100%',
                  }}
                  disabled={mapUsing}
                  showSearch
                  placeholder={'Tìm địa điểm'}
                  filterOption={(input, option: any) =>
                    vietnameseStringToUnicode(option.children)
                      .toLowerCase()
                      .indexOf(
                        vietnameseStringToUnicode(input.toLowerCase())
                      ) >= 0
                  }
                  size="middle"
                  className="search-box-form__search"
                >
                  {dataMapSystem?.map((item: any, key: any) => {
                    return (
                      <Option key={key} value={item?.id}>
                        {item?.name}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>

              <Form.Item label="Sử dụng map" name=" ">
                <Checkbox
                  checked={mapUsing}
                  onChange={(e: any) => {
                    setMapUsing(e?.target?.checked);
                    if (e?.target?.checked) {
                      form.setFieldsValue({
                        lat: '',
                        lng: '',
                      });
                    }
                  }}
                >
                  Chọn trên bản đồ để lấy địa điểm
                </Checkbox>
              </Form.Item>

              <Form.Item label="Bán kính theo đơn vị" name="unit">
                <Select
                  defaultValue="km"
                  onChange={(value: any) => {
                    setUnit(value);
                  }}
                  style={{ width: '100%' }}
                >
                  <Option value="km">km</Option>
                  <Option value="m">m</Option>
                </Select>
              </Form.Item>

              {unit === 'km' ? (
                <Form.Item
                  label="Nhập bán kính km"
                  name="km"
                  rules={[
                    {
                      required: true,
                      message: 'Vui nhập bán kính!',
                    },
                  ]}
                >
                  <InputNumber
                    style={{
                      width: '100%',
                    }}
                    step={1}
                    className="budget-number"
                    min={0}
                    addonAfter="km"
                  />
                </Form.Item>
              ) : (
                <Form.Item
                  label="Nhập bán kính m"
                  name="m"
                  rules={[
                    {
                      required: true,
                      message: 'Vui nhập bán kính!',
                    },
                  ]}
                >
                  <InputNumber
                    style={{
                      width: '100%',
                    }}
                    step={100}
                    className="budget-number"
                    min={0}
                    addonAfter="m"
                  />
                </Form.Item>
              )}

              <div style={{ display: ' flex', justifyContent: 'flex-end' }}>
                <Button
                  className="mb-10"
                  style={{ marginRight: '10px' }}
                  onClick={() => {
                    form.resetFields();
                    setIsModalVisible(true);
                  }}
                >
                  Đóng
                </Button>
                <Button
                  type="primary"
                  loading={state?.buttonLoading}
                  htmlType="submit"
                >
                  Tìm kiếm
                </Button>
              </div>
            </Form>
          </div>
        </Modal>
      </Row>
    </Spin>
  );
};
