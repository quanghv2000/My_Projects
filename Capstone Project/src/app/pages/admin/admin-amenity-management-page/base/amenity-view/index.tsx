import React, { useState } from 'react';
import { Modal } from 'antd';
import AmenityUpdate from 'app/pages/admin/admin-amenity-management-page/base/amenity-update/index';
import Moment from 'react-moment';

const AmenityView = (props) => {
  const handleOk = () => {
    props.setIsModalViewVisible(false);
    setIsModalUpdateVisible(true);
  };

  const [isModalUpdateVisible, setIsModalUpdateVisible] = useState(false);

  const handleCancel = () => {
    props.setIsModalViewVisible(false);
  };

  return (
    <>
      <AmenityUpdate
        data={props?.data}
        isModalUpdateVisible={isModalUpdateVisible}
        setIsModalUpdateVisible={(visibale) =>
          setIsModalUpdateVisible(visibale)
        }
      />
      <Modal
        title={'Tiện nghi: ' + props?.data?.name}
        visible={props.isModalViewVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText="Đóng"
        okText="Sửa"
        width="750px"
      >
        <div style={{ display: 'flex' }}>
          <div style={{ maxWidth: '50%' }}>
            {' '}
            <img
              src={props?.data?.icon}
              alt="img.jpg"
              style={{ width: '90%' }}
            />
          </div>
          <div style={{ maxWidth: '50%' }}>
            <p>
              <strong>Tiện nghi: </strong> {props?.data?.name}
            </p>
            <p style={{ paddingTop: 0 }}>
              <strong>Dành cho: </strong>{' '}
              {props?.data?.type === 'house' ? 'Nhà' : 'Phòng'}
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
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AmenityView;
