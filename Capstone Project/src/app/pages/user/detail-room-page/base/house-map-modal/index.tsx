import React, { Fragment, useEffect, useState } from 'react';
import { Row, Button, Form, Col, Input, Checkbox } from 'antd';
import { DEFAULT_GOOGLE_MAP_API_KEY } from 'utils/config';
import { useSelector } from 'react-redux';
import { RootState } from 'types/RootState';
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsRenderer,
} from '@react-google-maps/api';

export const HouseMapModal: React.FC<any> = (props: any) => {
  const containerStyle = {
    width: '100%',
    height: '100%',
  };

  const state = useSelector(
    (state: RootState) => state?.detailRoomReducer?.dataResponse
  );

  const [curentLocation, setCurentLocation] = useState(false);
  const [directionsResponse, setDirectionsResponse]: any = useState(null);

  const [position, setPosition]: any = useState({
    lat: 21.01351,
    lng: 105.527096,
  });

  const [form] = Form.useForm();

  const [distance, setDistance]: any = useState('');
  const [duration, setDuration]: any = useState('');

  useEffect(() => {
    if (state?.post?.house?.address) {
      form.setFieldsValue({
        currentPosition: 'Vị trí của bạn',
        currentHouse: state?.post?.house?.name,
        Houselatitude: parseFloat(state?.post?.house?.address?.latitude),
        Houselongiude: parseFloat(state?.post?.house?.address?.longiude),
      });
      setPosition({
        lat: parseFloat(state?.post?.house?.address?.latitude),
        lng: parseFloat(state?.post?.house?.address?.longiude),
      });
    }
  }, [state?.post?.house?.address]);

  const onFinish = async (values: any) => {
    // if (originRef.current.value === '' || destiantionRef.current.value === '') {
    //   return
    // }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    var start = new google.maps.LatLng(
      values?.Yourlatitude.toString(),
      values?.Yourlongiude.toString()
    );
    var end = new google.maps.LatLng(
      values?.Houselatitude.toString(),
      values?.Houselongiude.toString()
    );
    const results = await directionsService.route({
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    const content: any = <div>gg</div>;
    const directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setPanel(content);
    setDistance(results?.routes[0]?.legs[0]?.distance?.text);
    setDuration(results?.routes[0]?.legs[0]?.duration?.text);
  };

  return (
    <Fragment>
      {state?.post?.house?.address ? (
        <>
          <div>
            <Form
              name="search"
              // labelCol={{ span: 8 }}
              // wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              layout="vertical"
              onFinish={onFinish}
              form={form}
              autoComplete="off"
              style={{ display: ' flex', width: '100%' }}
            >
              <Col
                xs={24}
                xl={24}
                style={{
                  width: '100%',
                  padding: '20px 30px',
                  boxShadow:
                    'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
                  borderRadius: 5,
                  marginLeft: 1,
                }}
              >
                <Row
                  style={{
                    width: ' 100%',
                  }}
                >
                  <Col xs={8} xl={10} style={{ padding: '0px 10px' }}>
                    <Form.Item
                      name="currentPosition"
                      label="Vị trí của bạn (A)"
                    >
                      <Input
                        style={{ width: '100%' }}
                        placeholder="Vị trí của bạn"
                        readOnly={true}
                        allowClear
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={8} xl={10} style={{ padding: '0px 10px' }}>
                    <Form.Item name="currentHouse" label="Nhà hiện tại (B)">
                      <Input
                        style={{ width: '100%' }}
                        placeholder="Nhà hiện tại"
                        readOnly={true}
                        allowClear
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={8} xl={4} style={{ padding: '0px 10px' }}>
                    <Form.Item label=" ">
                      <Checkbox
                        checked={curentLocation}
                        onChange={(e: any) => {
                          setCurentLocation(e.target.checked);

                          if (e.target.checked) {
                            if (navigator.geolocation) {
                              navigator.geolocation.getCurrentPosition(
                                function (position) {
                                  // Get current cordinates.
                                  const pos = {
                                    lat: position.coords.latitude,
                                    lng: position.coords.longitude,
                                  };
                                  setPosition({
                                    lat: pos.lat,
                                    lng: pos.lng,
                                  });
                                  form.setFieldsValue({
                                    Yourlatitude: pos.lat,
                                    Yourlongiude: pos.lng,
                                  });
                                },
                                function (error) {
                                  // On error code..
                                },
                                {
                                  maximumAge: 60000,
                                  timeout: 10000,
                                  enableHighAccuracy: true,
                                }
                              );
                            }
                          } else {
                            form.setFieldsValue({
                              Yourlatitude: '',
                              Yourlongiude: '',
                            });
                            setPosition({
                              lat: 21.01351,
                              lng: 105.527096,
                            });
                          }
                        }}
                      >
                        Lấy vị trí hiện tại
                      </Checkbox>
                    </Form.Item>
                  </Col>
                </Row>
                <Row
                  style={{
                    width: ' 100%',
                  }}
                >
                  <Col xs={8} xl={10} style={{ padding: '0px 10px' }}>
                    <Row
                      style={{
                        width: ' 100%',
                      }}
                    >
                      <Col
                        xs={8}
                        xl={12}
                        style={{ padding: '0px 5px 0px 0px' }}
                      >
                        {' '}
                        <Form.Item name="Yourlatitude" label="Vĩ độ của bạn">
                          <Input
                            style={{ width: '100%' }}
                            placeholder="Vĩ độ của bạn"
                            allowClear
                          />
                        </Form.Item>
                      </Col>
                      <Col
                        xs={8}
                        xl={12}
                        style={{ padding: '0px 0px 0px 5px' }}
                      >
                        {' '}
                        <Form.Item name="Yourlongiude" label="Kinh độ của bạn">
                          <Input
                            style={{ width: '100%' }}
                            placeholder="Kinh độ của bạn"
                            allowClear
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={8} xl={10} style={{ padding: '0px 10px' }}>
                    <Row
                      style={{
                        width: ' 100%',
                      }}
                    >
                      <Col
                        xs={8}
                        xl={12}
                        style={{ padding: '0px 5px 0px 0px' }}
                      >
                        {' '}
                        <Form.Item name="Houselatitude" label="Vĩ độ của nhà">
                          <Input
                            style={{ width: '100%' }}
                            placeholder="Vĩ độ của nhà"
                            allowClear
                            readOnly={true}
                          />
                        </Form.Item>
                      </Col>
                      <Col
                        xs={8}
                        xl={12}
                        style={{ padding: '0px 0px 0px 5px' }}
                      >
                        {' '}
                        <Form.Item name="Houselongiude" label="Kinh độ của nhà">
                          <Input
                            style={{ width: '100%' }}
                            placeholder="Kinh độ của nhà"
                            allowClear
                            readOnly={true}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                  <Col
                    xs={8}
                    xl={4}
                    style={{ padding: '0px 10px', marginTop: 30 }}
                  >
                    <Button htmlType="submit" className="mt-20" type="primary">
                      Dẫn đường
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Form>
          </div>

          <Row
            className="amenities__row"
            style={{ width: ' 100%', height: 500, position: 'relative' }}
          >
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={position}
              zoom={15}
              key="house-map"
              clickableIcons={false}
              onClick={(ev: any) => {
                setCurentLocation(false);
                setPosition({
                  lat: ev.latLng.lat(),
                  lng: ev.latLng.lng(),
                });
                form.setFieldsValue({
                  Yourlatitude: ev.latLng.lat(),
                  Yourlongiude: ev.latLng.lng(),
                });
              }}
            >
              <Marker position={position} />
              {directionsResponse && (
                <DirectionsRenderer directions={directionsResponse} />
              )}
            </GoogleMap>
            {directionsResponse && (
              <div
                style={{
                  position: 'absolute',
                  top: 100,
                  left: 50,
                  backgroundColor: '#FFFFFF',
                  padding: '10px 20px',
                  borderRadius: 12,
                }}
              >
                <div>
                  Quãng đường: <span className="bold">{distance}</span>
                </div>
                <div>
                  Thời gian: <span className="bold">{duration}</span>
                </div>
              </div>
            )}
          </Row>
        </>
      ) : (
        ''
      )}
    </Fragment>
  );
};
