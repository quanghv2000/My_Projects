import React, { useState } from 'react';
import { Modal } from 'antd';
import BankAccountUpdate from 'app/pages/admin/admin-bank-account-management-page/base/bank-account-update/index';
import Moment from 'react-moment';

const BankAccountView = (props) => {
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
      <BankAccountUpdate
        data={props?.data}
        isModalUpdateVisible={isModalUpdateVisible}
        setIsModalUpdateVisible={(visibale) =>
          setIsModalUpdateVisible(visibale)
        }
      />
      <Modal
        title={'Thông tin tài khoản: ' + props?.data?.bankName}
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
              <strong>Tên ngân hàng: </strong> {props?.data?.bankName}
            </p>
            <p style={{ paddingTop: 0 }}>
              <strong>Chủ tài khoản: </strong> {props?.data?.username}
            </p>
            <p>
              <strong>Số tài khoản: </strong> {props?.data?.numberAccount}
            </p>
            <p>
              <strong>Chi nhánh: </strong> {props?.data?.branch}
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
            {/* <p>
              <strong>Icon: </strong>{' '}
              <img
                src={props?.data?.icon}
                alt=""
                style={{ width: '15%', marginLeft: '20px' }}
              />
            </p> */}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BankAccountView;
