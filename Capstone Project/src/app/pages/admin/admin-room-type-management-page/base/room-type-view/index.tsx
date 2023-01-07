import React, { useState } from 'react';
import { Modal } from 'antd';
import RoomTypeUpdate from 'app/pages/admin/admin-room-type-management-page/base/room-type-update/index';
import Moment from 'react-moment';

const RoomTypeView = (props) => {
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
      <RoomTypeUpdate
        data={props?.data}
        isModalUpdateVisible={isModalUpdateVisible}
        setIsModalUpdateVisible={(visibale) =>
          setIsModalUpdateVisible(visibale)
        }
      />
      <Modal
        title={'Loại phòng: ' + props?.data?.name}
        visible={props.isModalViewVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText="Đóng"
        okText="Sửa"
        width="750px"
      >
        <div>
          <p>
            <strong>Loại phòng: </strong> {props?.data?.name}
          </p>
          <p style={{ paddingTop: 0 }}>
            <strong>Mô tả: </strong> {props?.data?.description}
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
      </Modal>
    </>
  );
};

export default RoomTypeView;
