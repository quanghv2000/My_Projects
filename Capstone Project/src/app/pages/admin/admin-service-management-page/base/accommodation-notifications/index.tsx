import { Table, Button, Modal, Form, Input, Tag } from 'antd';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'types/RootState';
import 'app/pages/landlord/landlord-house-page/base/house-data-table/style.scss';
import { getDataRoomTypeRequest } from 'app/pages/admin/admin-room-type-management-page/screen/action';
import AccommodationNotificationView from 'app/pages/admin/admin-service-management-page/base/accommodation-notifications-view/index';
import Moment from 'react-moment';

const columnsDepositHistory: any = [
  {
    title: 'STT',
    dataIndex: 'index',
    key: 'index',
    render: (text, record, index) => <b>{index + 1}</b>,
  },
  {
    title: 'Người đăng ký',
    dataIndex: 'fullName',
    key: 'fullName',
    render: (fullName) => <span>{fullName}</span>,
  },
  {
    title: 'Tài khoản',
    dataIndex: 'username',
    key: 'username',
    render: (username) => <span>{username}</span>,
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
    render: (phoneNumber) => <span>{phoneNumber}</span>,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    render: (email) => <span>{email}</span>,
  },
  {
    title: 'Ngày đăng ký',
    dataIndex: 'createdDate',
    key: 'createdDate',
    align: 'center',
    render: (text) => <Moment format="DD/MM/YYYY">{new Date(text)}</Moment>,
  },
  {
    title: 'Ngày hết hạn',
    dataIndex: 'expirationDate',
    key: 'expirationDate',
    align: 'center',
    render: (expirationDate) => (
      <Moment format="DD/MM/YYYY">{new Date(expirationDate)}</Moment>
    ),
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    render: (status: any) => {
      if (status === 'searching') {
        return <Tag color="green">Đang tìm kiếm</Tag>;
      }
      if (status === 'expired') {
        return <Tag color="red">Đã hết hạn</Tag>;
      }
    },
  },
  {
    title: 'Thông tin',
    dataIndex: 'amount',
    key: 'amount',
    align: 'center',
    render: () => <a href="#">Xem chi tiết</a>,
  },
];

const { confirm } = Modal;

export const AccommodationNotifications: React.FC<any> = () => {
  const dispatch = useDispatch();
  const [isModalViewVisible, setIsModalViewVisible] = useState(false);
  const [isModalCreateVisible, setIsModalCreateVisible] = useState(false);
  const [dataModalRoomTypeView, setDataRoomTypeView] = useState({});

  // state for select each row in table
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRow, setSelectedRow]: any = useState();

  // function change item when select
  const onSelectChange = (selectedRowKeys: any, selectedRows: any) => {
    setSelectedRow(selectedRows);
    setSelectedRowKeys(selectedRowKeys);
  };

  // function row selection in table
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  const showConfirmDelete = () => {
    confirm({
      title: `Bạn có chắc chắn muốn xóa ${selectedRowKeys.length} danh mục phòng trọ?`,
      okText: 'Xác nhận',
      cancelText: 'Huỷ',
      onOk() {
        // dispatch(deleteDataTypeOfRentalRequest(selectedRow[0]?.id));
      },
      onCancel() {},
    });
  };

  const state = useSelector(
    (state: RootState) => state?.adminRoomTypePageReducer
  );

  const roomTypes = state?.dataResponse?.length > 0 ? state?.dataResponse : [];

  const depositList = [
    {
      id: 1,
      fullName: 'Hà Văn Quang',
      username: 'quanghv7',
      amount: 200000,
      phoneNumber: '0968904962',
      email: 'quanghv2000.dev@gmail.com',
      createdDate: new Date(),
      expirationDate: new Date(),
      transferCode: 'HLH17364',
      status: 'searching',
    },
    {
      id: 2,
      fullName: 'Hà Văn Quang',
      username: 'quanghv7',
      amount: 200000,
      phoneNumber: '0968904962',
      email: 'quanghv2000.dev@gmail.com',
      createdDate: new Date(),
      expirationDate: new Date(),
      transferCode: 'HLH17345',
      status: 'searching',
    },
    {
      id: 3,
      fullName: 'Hà Văn Quang',
      username: 'quanghv7',
      amount: 200000,
      phoneNumber: '0968904962',
      email: 'quanghv2000.dev@gmail.com',
      createdDate: new Date(),
      expirationDate: new Date(),
      transferCode: 'HLH17434',
      status: 'searching',
    },
    {
      id: 4,
      fullName: 'Hà Văn Quang',
      username: 'quanghv7',
      amount: 200000,
      phoneNumber: '0968904962',
      email: 'quanghv2000.dev@gmail.com',
      createdDate: new Date(),
      expirationDate: new Date(),
      transferCode: 'HLH17483',
      status: 'expired',
    },
    {
      id: 5,
      fullName: 'Hà Văn Quang',
      username: 'quanghv7',
      amount: 200000,
      phoneNumber: '0968904962',
      email: 'quanghv2000.dev@gmail.com',
      createdDate: new Date(),
      expirationDate: new Date(),
      transferCode: 'HLH17394',
      status: 'expired',
    },
    {
      id: 6,
      fullName: 'Hà Văn Quang',
      username: 'quanghv7',
      amount: 200000,
      phoneNumber: '0968904962',
      email: 'quanghv2000.dev@gmail.com',
      createdDate: new Date(),
      expirationDate: new Date(),
      transferCode: 'HLH17369',
      status: 'expired',
    },
  ];

  useEffect(() => {
    dispatch(getDataRoomTypeRequest(''));
  }, []);

  return (
    <Fragment>
      <AccommodationNotificationView
        isModalViewVisible={isModalViewVisible}
        data={dataModalRoomTypeView}
        setIsModalViewVisible={(visibale) => setIsModalViewVisible(visibale)}
      />
      <div
        className="mb-20 mt-10"
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
          style={{ display: ' flex' }}
        >
          <Form.Item name="name">
            <Input style={{ width: 200 }} placeholder="Tên tài khoản" />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" className="ml-20" type="primary">
              Tìm kiếm
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Table
        rowKey="id"
        bordered
        className="mt-10 mb-10 table-cursor-pointer-row"
        columns={columnsDepositHistory}
        loading={state?.loading}
        // dataSource={roomTypes}
        dataSource={depositList}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: false,
        }}
        scroll={{ x: 600 }}
        // rowSelection={rowSelection}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              setIsModalViewVisible(true);
              setDataRoomTypeView(record);
            }, // click row
          };
        }}
      />
    </Fragment>
  );
};
