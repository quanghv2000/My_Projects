import { Table, Input, Button, Form, Modal } from 'antd';
import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'types/RootState';
import { convertRoomTypeDescription } from 'helper/convert-room-type-description';
import { CustomerDataTable } from 'app/pages/landlord/room-tenants-page/base/data-table';
import 'app/pages/landlord/landlord-house-page/base/house-data-table/style.scss';
import { Select } from 'antd';
import { LockOutlined } from '@ant-design/icons';

const { Option } = Select;

const destinationsColumn = [
  {
    title: 'STT',
    dataIndex: 'index',
    key: 'index',
    render: (text, record, index) => <b>{index + 1}</b>,
  },
  {
    title: 'Tên địa điểm',
    dataIndex: 'name',
    key: 'name',
    render: (name) => <span>{name}</span>,
  },
  {
    title: 'Địa chỉ',
    dataIndex: 'address',
    key: 'address',
    render: (address) => <span>{address}</span>,
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'createdDate',
    key: 'createdDate',
    render: (text) => <span>{new Date(text).toDateString()}</span>,
  },
  {
    title: 'Người tạo',
    dataIndex: 'createdBy',
    key: 'createdBy',
    render: (text) => <span>{text}</span>,
  },
  {
    title: 'Thao tác',
    dataIndex: 'action',
    key: 'action',
    render: () => (
      <div>
        <Button
          style={{
            backgroundColor: '#13c2c2',
            borderColor: '#13c2c2',
            color: 'white',
          }}
          size="small"
        >
          <i className="fa-solid fa-eye mr-5"></i> Xem
        </Button>
        <Button
          style={{
            backgroundColor: '#1890FF',
            borderColor: '#1890FF',
            color: 'white',
            marginLeft: '6px',
          }}
          size="small"
        >
          <i className="fa-solid fa-edit mr-5"></i> Sửa
        </Button>
        <Button
          style={{
            backgroundColor: '#FF4D4F',
            borderColor: '#FF4D4F',
            color: 'white',
            marginLeft: '6px',
          }}
          size="small"
        >
          <i className="fa-solid fa-trash mr-5"></i> Xóa
        </Button>
      </div>
    ),
  },
];

export const DestinationList: React.FC<any> = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);


  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  const roomTypes = [
    {
      id: 1,
      name: 'Tân xã',
      address: 'Tân xã - Thạch Thất - Hà Nội',
      createdDate: new Date(),
      createdBy: 'quanghv7',
    },
    {
      id: 2,
      name: 'Thạch Hòa',
      address: 'Thạch Hòa - Thạch Thất - Hà Nội',
      createdDate: new Date(),
      createdBy: 'quanghv7',
    },
    {
      id: 3,
      name: 'Đồng Trúc',
      address: 'Đồng Trúc - Thạch Thất - Hà Nội',
      createdDate: new Date(),
      createdBy: 'quanghv7',
    },
    {
      id: 4,
      name: 'Bình Yên',
      address: 'Bình Yên - Thạch Thất - Hà Nội',
      createdDate: new Date(),
      createdBy: 'quanghv7',
    },
  ];

  return (
    <Fragment>
      <div
        className="mb-20"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <strong>Tổng số địa điểm nổi bật: 8</strong>
        </div>
        <div>
          <Button
            className="ml-20"
            style={{
              backgroundColor: '#87d068',
              borderColor: '#87d068',
              color: 'white',
              width: '210px',
            }}
          >
            <i className="fa-solid fa-plus mr-5"></i>{' '}
            <strong>Thêm địa điểm nổi bật</strong>
          </Button>
        </div>
      </div>
      <Table
        rowKey="_id"
        bordered
        className="mt-10 mb-10"
        columns={destinationsColumn}
        // loading={data}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: false,
        }}
        dataSource={roomTypes}
      />
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        okText="Chọn"
        cancelText="Đóng"
        onCancel={handleCancel}
        onOk={handleOk}
        okButtonProps={{ disabled: true }}
        width={1200}
        style={{ top: 20 }}
      >
        <CustomerDataTable />
      </Modal>
    </Fragment>
  );
};
