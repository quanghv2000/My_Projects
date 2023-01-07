import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Button, Col, Form, Input, message, Modal, Row } from 'antd';
import {
  createMapPositonRequest,
  getMapPositonRequest,
} from 'app/pages/admin/admin-map-position/screen/action';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'types/RootState';
import { DEFAULT_GOOGLE_MAP_API_KEY } from 'utils/config';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const MapPositionCreate = (props) => {
  const dispatch = useDispatch();
  const state = useSelector(
    (state: RootState) => state?.adminMapPositonPageReducer
  );

  const [position, setPosition]: any = useState({
    lat: 21.01351,
    lng: 105.527096,
  });

  const [form] = Form.useForm();

  const success = () => {
    message.success({
      content: 'Thêm mới thành công',
      className: 'custom-class',
    });
  };

  useEffect(() => {
    if (state && !state?.loadingBtnCreate && props?.isModalCreateVisible) {
      props.setIsModalCreateVisible(false);
      form.resetFields();
      dispatch(getMapPositonRequest(''));
      success();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const onFinish = (values: any) => {
    const body: any = {
      name: values?.name,
      longitude: values?.longitude
        ? values?.longitude + ''
        : position?.lng + '',
      latitude: values?.latitude ? values?.latitude + '' : position?.lat + '',
    };
    dispatch(createMapPositonRequest(body));
  };

  const handleCancel = () => {
    form.resetFields();
    props.setIsModalCreateVisible(false);
  };

  return (
    <>
      <Modal
        title="Thêm địa điểm mới"
        visible={props.isModalCreateVisible}
        confirmLoading={state?.loadingBtnCreate}
        footer={null}
        style={{ top: 20 }}
        onCancel={handleCancel}
        width="1000px"
      >
        <Form name="basic" form={form} onFinish={onFinish}>
          <div
            style={{
              paddingTop: '20px',
              paddingRight: '50px',
              // paddingLeft: '45px',
            }}
          >
            <Form.Item
              label="Tên địa điểm"
              name="name"
              rules={[
                { required: true, message: 'Nhập tên địa điểm!' },
                {
                  max: 100,
                  message: 'Tên địa điểm không vượt quá 100 ký tự!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="latitude"
              label="Vĩ độ"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập vĩ độ!',
                },
              ]}
            >
              <Input
                onChange={(e: any) => {
                  setPosition({
                    lat: parseFloat(e?.target?.value),
                    lng: parseFloat(form.getFieldValue('longiude')),
                  });
                }}
                style={{ width: '100%' }}
                placeholder="Vĩ độ"
              />
            </Form.Item>
            <Form.Item
              name="longiude"
              label="Kinh độ"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập!',
                },
              ]}
            >
              <Input
                onChange={(e: any) => {
                  setPosition({
                    lat: parseFloat(form.getFieldValue('latitude')),
                    lng: parseFloat(e?.target?.value),
                  });
                }}
                style={{ width: '100%' }}
                placeholder="Kinh độ"
              />
            </Form.Item>

            <Row
              style={{
                width: '100%',
                height: '500px',
                marginTop: 30,
              }}
            >
              <Col xs={24} xl={24} style={{ width: ' 100%' }}>
                {/* <LoadScript
                  googleMapsApiKey={DEFAULT_GOOGLE_MAP_API_KEY}
                  libraries={['places']}
                  key="map-create"
                > */}
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={position}
                  zoom={15}
                  onClick={(ev: any) => {
                    setPosition({
                      lat: ev.latLng.lat(),
                      lng: ev.latLng.lng(),
                    });
                    form.setFieldsValue({
                      latitude: ev.latLng.lat(),
                      longiude: ev.latLng.lng(),
                    });
                  }}
                  // clickableIcons={false}
                >
                  <Marker position={position} />
                </GoogleMap>
                {/* </LoadScript> */}
              </Col>
            </Row>

            <Form.Item
              className="button-form"
              style={{
                margin: '0px 0px 10px 0px',
                display: 'flex',
                width: '100%',
                justifyContent: 'flex-end',
              }}
            >
              <div
                style={{
                  marginTop: 30,
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'flex-end',
                }}
              >
                <Button
                  onClick={handleCancel}
                  style={{ backgroundColor: '#fff', marginRight: 10 }}
                >
                  Đóng
                </Button>
                <Button
                  loading={state?.loadingBtnCreate}
                  htmlType="submit"
                  style={{
                    backgroundColor: '#1890ff',
                    borderColor: '#1890ff',
                    color: 'white',
                  }}
                >
                  Tạo
                </Button>
              </div>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default MapPositionCreate;
