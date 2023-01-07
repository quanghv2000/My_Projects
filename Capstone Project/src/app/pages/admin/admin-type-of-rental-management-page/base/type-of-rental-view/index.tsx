import React, { useState } from 'react';
import { Modal } from 'antd';
import TypeOfRentalUpdate from 'app/pages/admin/admin-type-of-rental-management-page/base/type-of-rental-update/index';
import Moment from 'react-moment';

const TypeOfRentalView = (props) => {
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
      <TypeOfRentalUpdate
        data={props?.data}
        isModalUpdateVisible={isModalUpdateVisible}
        setIsModalUpdateVisible={(visibale) =>
          setIsModalUpdateVisible(visibale)
        }
      />
      <Modal
        title={'Loại hình cho thuê: ' + props?.data?.name}
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
              src={props?.data?.imageUrl}
              alt="img.jpg"
              style={{ width: '90%' }}
            />
          </div>
          <div style={{ maxWidth: '50%' }}>
            <p>
              <strong>Loại hình: </strong> {props?.data?.name}
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
            <p>
              <strong>Icon: </strong>{' '}
              <img
                src={props?.data?.icon}
                alt=""
                style={{ width: '15%', marginLeft: '20px' }}
              />
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TypeOfRentalView;
