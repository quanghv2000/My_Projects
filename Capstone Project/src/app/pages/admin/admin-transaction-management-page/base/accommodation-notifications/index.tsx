import { Table, Button, Modal, Form, Select, Input, Tag } from 'antd';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'types/RootState';
import 'app/pages/landlord/landlord-house-page/base/house-data-table/style.scss';
import { getDataRoomTypeRequest } from 'app/pages/admin/admin-room-type-management-page/screen/action';
import RoomTypeView from 'app/pages/admin/admin-room-type-management-page/base/room-type-view/index';
import RoomTypeCreate from 'app/pages/admin/admin-room-type-management-page/base/room-type-create/index';
import Moment from 'react-moment';
import { convertPrice } from 'helper/convert-price-to-vnd';

const { Option } = Select;

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
    title: 'Mã giao dịch',
    dataIndex: 'transferCode',
    key: 'transferCode',
    align: 'center',
    render: (transferCode) => <span>{transferCode}</span>,
  },
  {
    title: 'Ngày đăng ký',
    dataIndex: 'createdDate',
    key: 'createdDate',
    render: (text) => (
      <Moment format="DD/MM/YYYY HH:mm">{new Date(text)}</Moment>
    ),
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    render: (status: any) => {
      if (status === 'success') {
        return <Tag color="green">Đăng ký Thành công</Tag>;
      }
      if (status === 'failed') {
        return <Tag color="red">Thất bại</Tag>;
      }
      if (status === 'pending') {
        return <Tag color="gold">Chờ xác nhận</Tag>;
      }
    },
  },
  {
    title: 'Phí đăng ký',
    dataIndex: 'amount',
    key: 'amount',
    align: 'center',
    render: (amount) => (
      <Tag color="gold" style={{ fontWeight: 'bold' }}>{`+ ${convertPrice(
        amount
      )} vn₫`}</Tag>
    ),
  },
];

const { confirm } = Modal;

export const AccommodationNotificationsTransaction: React.FC<any> = () => {
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
      createdDate: new Date(),
      transferCode: 'HLH17364',
      status: 'success',
    },
    {
      id: 2,
      fullName: 'Hà Văn Quang',
      username: 'quanghv7',
      amount: 200000,
      createdDate: new Date(),
      transferCode: 'HLH17345',
      status: 'success',
    },
    {
      id: 3,
      fullName: 'Hà Văn Quang',
      username: 'quanghv7',
      amount: 200000,
      createdDate: new Date(),
      transferCode: 'HLH17434',
      status: 'success',
    },
    {
      id: 4,
      fullName: 'Hà Văn Quang',
      username: 'quanghv7',
      amount: 200000,
      createdDate: new Date(),
      transferCode: 'HLH17483',
      status: 'success',
    },
    {
      id: 5,
      fullName: 'Hà Văn Quang',
      username: 'quanghv7',
      amount: 200000,
      createdDate: new Date(),
      transferCode: 'HLH17394',
      status: 'success',
    },
    {
      id: 6,
      fullName: 'Hà Văn Quang',
      username: 'quanghv7',
      amount: 200000,
      createdDate: new Date(),
      transferCode: 'HLH17369',
      status: 'success',
    },
  ];

  useEffect(() => {
    dispatch(getDataRoomTypeRequest(''));
  }, []);

  return (
    <Fragment>
      <RoomTypeView
        isModalViewVisible={isModalViewVisible}
        data={dataModalRoomTypeView}
        setIsModalViewVisible={(visibale) => setIsModalViewVisible(visibale)}
      />
      <RoomTypeCreate
        isModalCreateVisible={isModalCreateVisible}
        setIsModalCreateVisible={(visibale) =>
          setIsModalCreateVisible(visibale)
        }
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
        <div>
          <Button
            className="ml-20"
            style={{
              backgroundColor: '#389e0d',
              borderColor: '#389e0d',
              color: 'white',
            }}
            // onClick={() => history.push('/host/room/create')}
          >
            <i className="fa fa-file-invoice mr-5"></i> Tạo hóa đơn
          </Button>
        </div>
      </div>
      {/* <div style={{ marginBottom: 16 }}>
        {hasSelected ? (
          <div>
            <Button
              onClick={() => showConfirmDelete()}
              style={{
                backgroundColor: '#ff4d4f',
                color: 'white',
                borderColor: '#ff4d4f',
                boxShadow: '0 2px 0 rgb(0 0 0 / 5%)',
              }}
            >
              <i className="fa-solid fa-trash mr-5"></i> Xoá{' '}
              {selectedRowKeys.length}
            </Button>
          </div>
        ) : (
          ''
        )}
      </div> */}
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
