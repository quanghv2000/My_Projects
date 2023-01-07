import { Table, Modal, Tag, Badge, Popconfirm, Button, Form, Col, Row } from 'antd';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'types/RootState';
import 'app/pages/landlord/landlord-house-page/base/house-data-table/style.scss';
import PostView from 'app/pages/admin/admin-post-management-page/base/post-view/index';
import Moment from 'react-moment';
import { convertPrice } from 'helper/convert-price-to-vnd';
import moment from 'moment';

export const PostListManagementTable: React.FC<any> = (props: any) => {
  const [isModalViewVisible, setIsModalViewVisible] = useState(false);
  const state = useSelector(
    (state: RootState) => state?.adminPostManagmentReducer
  );
  const [dataModalRoomTypeView, setDataRoomTypeView] = useState({});

  // const dispatch = useDispatch();

  const column: any = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      align: 'center',
      render: (text, record, index) => <b>{index + 1}</b>,
    },
    {
      title: 'Người đăng',
      dataIndex: 'hostName',
      align: 'center',
      key: 'hostName',
      render: (hostName) => <span>{hostName}</span>,
    },
    {
      title: 'Tên tài khoản',
      dataIndex: 'username',
      align: 'center',
      key: 'username',
      render: (username) => <span>{username}</span>,
    },
    {
      title: 'Mã bài đăng',
      dataIndex: 'postCode',
      align: 'center',
      key: 'postCode',
      render: (postCode) => <span>{postCode}</span>,
    },
    {
      title: 'Loại tin đăng',
      dataIndex: 'postType',
      key: 'postType',
      align: 'center',
      render: (postType) => <span>{postType}</span>,
    },
    {
      title: 'Ngày đăng',
      dataIndex: 'startDate',
      key: 'startDate',
      align: 'center',
      render: (startDate) => (
        <Moment format="DD/MM/YYYY">{new Date(startDate)}</Moment>
      ),
    },
    {
      title: 'Ngày hết hạn',
      dataIndex: 'endDate',
      key: 'endDate',
      align: 'center',
      render: (endDate) => (
        <Moment format="DD/MM/YYYY">{new Date(endDate)}</Moment>
      ),
    },
    {
      title: 'Phí đăng',
      dataIndex: 'cost',
      key: 'cost',
      align: 'center',
      render: (cost) => convertPrice(cost) + ' vn₫',
    },
    {
      title: 'Số ngày đăng',
      dataIndex: 'numberOfDays',
      key: 'numberOfDays',
      align: 'center',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      align: 'center',
      key: 'status',
      render: (status, data) => {
        if (
          status === 'CENSORED' &&
          moment(data.endDate) > moment() &&
          moment(data.startDate) < moment()
        ) {
          return <Tag color="green">Đang hiển thị</Tag>;
        }
        if (moment(data.endDate) <= moment() && status === 'CENSORED') {
          return <Tag color="red">Đã hết hạn</Tag>;
        }
        if (status === 'CENSORED' && moment(data.startDate) > moment()) {
          return <Tag color="blue">Chờ hiển thị</Tag>;
        }
        if (status === 'UNCENSORED') {
          return <Tag color="orange">Chờ kiểm duyệt</Tag>;
        }
        if (status === 'REJECTED') {
          return <Tag color="magenta">Đã bị huỷ</Tag>;
        }
        if (status === 'DELETED') {
          return <Tag color="magenta">Bài đăng bị gỡ</Tag>;
        }
      },
    },
  ];

  return (
    <Fragment>
      <PostView
        isModalViewVisible={isModalViewVisible}
        data={dataModalRoomTypeView}
        setIsModalViewVisible={(visibale) => setIsModalViewVisible(visibale)}
      />
      <Table
        rowKey="id"
        bordered
        className="mt-10 mb-10 table-cursor-pointer-row"
        columns={column}
        loading={state?.loading}
        dataSource={props?.data?.length > 0 ? props?.data : []}
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
