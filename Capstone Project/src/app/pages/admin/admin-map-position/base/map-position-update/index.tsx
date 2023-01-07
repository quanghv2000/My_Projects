import { GoogleMap, Marker } from '@react-google-maps/api';
import { Button, Col, Form, Input, message, Modal, Row } from 'antd';
import {
  getMapPositonRequest,
  updateMapPositonRequest,
} from 'app/pages/admin/admin-map-position/screen/action';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'types/RootState';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const MapPositionUpdate = (props) => {
  const dispatch = useDispatch();
  const state = useSelector(
    (state: RootState) => state?.adminMapPositonPageReducer
  );

  const [position, setPosition]: any = useState({
    lat: 21.01351,
    lng: 105.527096,
  });

  useEffect(() => {
    if (props?.data?.latitude && props?.data?.longitude) {
      setPosition({
        lat: parseFloat(props?.data?.latitude),
        lng: parseFloat(props?.data?.longitude),
      });
      form.setFieldsValue({
        latitude: parseFloat(props?.data?.latitude),
        longiude: parseFloat(props?.data?.longitude),
        name: props?.data?.name,
      });
    }
  }, [props?.data]);

  const [form] = Form.useForm();

  const success = () => {
    message.success({
      content: 'Chỉnh sửa thành công',
      className: 'custom-class',
    });
  };

  useEffect(() => {
    if (state && !state?.loadingBtnUpdate && props?.isModalUpdateVisible) {
      props.setIsModalUpdateVisible(false);
      form.resetFields();
      dispatch(getMapPositonRequest(''));
      success();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const onFinish = (values: any) => {
    const body: any = {
      id: props?.data?.id,
      name: values?.name,
      longitude: values?.longitude
        ? values?.longitude + ''
        : position?.lng + '',
      latitude: values?.latitude ? values?.latitude + '' : position?.lat + '',
    };
    dispatch(updateMapPositonRequest(body));
  };

  const handleCancel = () => {
    form.resetFields();
    props.setIsModalUpdateVisible(false);
  };

  return (
    <>
      <Modal
        title="Chỉnh sửa địa điểm"
        visible={props.isModalUpdateVisible}
        confirmLoading={state?.loadingBtnUpdate}
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
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={position}
                  key="map-update"
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
                  loading={state?.loadingBtnUpdate}
                  htmlType="submit"
                  style={{
                    backgroundColor: '#1890ff',
                    borderColor: '#1890ff',
                    color: 'white',
                  }}
                >
                  Lưu
                </Button>
              </div>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default MapPositionUpdate;
