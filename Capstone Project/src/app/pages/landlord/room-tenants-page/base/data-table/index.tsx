import { Table, Input, Button, Form } from 'antd';
import React, { Fragment, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'types/RootState';
import { convertPrice } from 'helper/convert-price-to-vnd';
import { useDispatch } from 'react-redux';
import { getDataCustomerRequest } from 'app/pages/landlord/room-tenants-page/screen/action';
import 'app/pages/landlord/landlord-room-page/base/room-data-table/style.scss';
import moment from 'moment';

const columns = [
  {
    title: 'Họ và tên',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <b>{text}</b>,
    width: 100,
    ellipsis: true,
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phone',
    key: 'phone',
    width: 100,
  },
  {
    title: 'email',
    dataIndex: 'mail',
    key: 'mail',
    width: 150,
  },
  {
    title: 'Ngày bắt đầu',
    dataIndex: 'startDate',
    key: 'startDate',
    render: (startDate) => moment(startDate).format('MM/DD/YYYY'),
    width: 100,
  },
  {
    title: 'CMND',
    dataIndex: 'CMND',
    key: 'CMND',
    width: 100,
  },
  {
    title: 'Giá phòng',
    dataIndex: 'roomPrice',
    key: 'roomPrice',
    width: 120,
    render: (price) => '₫' + convertPrice(price),
  },
  {
    title: 'Tiền cọc',
    dataIndex: 'roomDeposit',
    key: 'roomDeposit',
    width: 120,
    render: (price) => '₫' + convertPrice(price),
  },
];

export const CustomerDataTable: React.FC<any> = () => {
  // function handleChange(value) {
  // }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDataCustomerRequest(''));
  }, [dispatch]);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const hasSelected = selectedRowKeys.length > 0;

  const onFinish = (values: any) => {
  };

  const onFinishFailed = (errorInfo: any) => {
  };

  const onSelectChange = (selectedRowKeys: any, selectedRows: any) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const data = useSelector((state: RootState) => state?.roomTenantReducer);

  return (
    <Fragment>
      <div
        className="mb-20 mt-10"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          maxHeight: 700,
        }}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          style={{ display: ' flex' }}
        >
          <Form.Item name="name">
            <Input style={{ width: 200 }} placeholder="Tên khách hàng" />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" className="ml-20" type="primary">
              Tìm kiếm
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div style={{ marginBottom: 16 }}>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
      </div>
      <Table
        rowKey="id"
        bordered
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: false,
        }}
        scroll={{ x: 1500, y: 400 }}
        rowSelection={rowSelection}
        columns={columns}
        loading={data?.loading}
        dataSource={data?.dataResponse?.length > 0 ? data?.dataResponse : []}
      />
    </Fragment>
  );
};
