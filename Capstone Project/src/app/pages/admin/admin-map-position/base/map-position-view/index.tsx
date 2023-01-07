import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import MapPositionUpdate from 'app/pages/admin/admin-map-position/base/map-position-update';
import Moment from 'react-moment';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { DEFAULT_GOOGLE_MAP_API_KEY } from 'utils/config';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const MapPositionView = (props) => {
  const handleOk = () => {
    props.setIsModalViewVisible(false);
    setIsModalUpdateVisible(true);
  };

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
    }
  }, [props?.data]);

  const [isModalUpdateVisible, setIsModalUpdateVisible] = useState(false);

  const handleCancel = () => {
    props.setIsModalViewVisible(false);
  };

  return (
    <>
      <MapPositionUpdate
        data={props?.data}
        isModalUpdateVisible={isModalUpdateVisible}
        setIsModalUpdateVisible={(visibale) =>
          setIsModalUpdateVisible(visibale)
        }
      />
      <Modal
        title={'Địa điểm: ' + props?.data?.name}
        visible={props.isModalViewVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText="Đóng"
        okText="Sửa"
        width="750px"
      >
        <div>
          <p>
            <strong>Tên địa điểm: </strong> {props?.data?.name}
          </p>
          <p style={{ paddingTop: 0 }}>
            <strong>Vĩ độ: </strong> {props?.data?.latitude}
          </p>
          <p style={{ paddingTop: 0 }}>
            <strong>Kinh độ: </strong> {props?.data?.longitude}
          </p>
          <p>
            <strong>Ngày tạo: </strong>{' '}
            <Moment format="DD/MM/YYYY HH:mm">
              {new Date(props?.data?.createdDate)}
            </Moment>
          </p>
          <p>
            <strong>Người tạo: </strong>{' '}
            {props?.data?.createdBy ? props?.data?.createdBy : ''}
          </p>
          <p>
            <strong>Ngày chỉnh sửa cuối: </strong>{' '}
            <Moment format="DD/MM/YYYY HH:mm">
              {new Date(props?.data?.lastModifiedDate)}
            </Moment>
          </p>
          <p>
            <strong>Người chỉnh sửa: </strong>{' '}
            {props?.data?.lastModifiedBy ? props?.data?.lastModifiedBy : ''}
          </p>
          <div
            style={{
              width: '100%',
              height: '300px',
              marginTop: 30,
            }}
          >
            <GoogleMap
              key={'map-view'}
              mapContainerStyle={containerStyle}
              center={position}
              zoom={15}
              clickableIcons={false}
            >
              <Marker position={position} />
            </GoogleMap>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MapPositionView;
