import React, { useState } from 'react';
import { Modal } from 'antd';
import PostingCostUpdate from 'app/pages/admin/admin-posting-cost-management-page/base/posting-cost-update/index';
import Moment from 'react-moment';
import { convertPrice } from 'helper/convert-price-to-vnd';

const PostingCostView = (props) => {
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
      <PostingCostUpdate
        data={props?.data}
        isModalUpdateVisible={isModalUpdateVisible}
        setIsModalUpdateVisible={(visibale) =>
          setIsModalUpdateVisible(visibale)
        }
      />
      <Modal
        title={'Loại tin: ' + props?.data?.type}
        visible={props.isModalViewVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText="Đóng"
        okText="Sửa"
        width="750px"
      >
        <div>
          <p>
            <strong>Loại tin: </strong> {props?.data?.type}
          </p>
          <p style={{ paddingTop: 0 }}>
            <strong>Phí đăng tin: </strong>{' '}
            {convertPrice(props?.data?.price) + ' vn₫/ngày'}
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

export default PostingCostView;
