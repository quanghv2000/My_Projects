import { Table, Modal, Tag, Badge, Popconfirm, Button } from 'antd';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'types/RootState';
import 'app/pages/landlord/landlord-house-page/base/house-data-table/style.scss';
import PostViewVerify from 'app/pages/admin/admin-post-management-page/base/post-view-detail-verify';
import Moment from 'react-moment';
import { convertPrice } from 'helper/convert-price-to-vnd';
import moment from 'moment';
import { verifyPostRequest } from 'app/pages/landlord/host-post-management-page/screen/action';

export const PostListManagementVerifyTable: React.FC<any> = (props: any) => {
  const [isModalViewVisible, setIsModalViewVisible] = useState(false);
  const state = useSelector(
    (state: RootState) => state?.adminPostManagmentReducer
  );
  const [dataModalRoomTypeView, setDataRoomTypeView] = useState({});

  const [confirmLoading, setConfirmLoading] = useState(false);
  const dispatch = useDispatch();

  const handleOk: any = (id: any) => {
    setConfirmLoading(true);

    dispatch(
      verifyPostRequest({
        id: id,
      })
    );
    setTimeout(() => {
      // setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {};

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
        <Moment format="DD/MM/YYYY HH:mm">{new Date(startDate)}</Moment>
      ),
    },
    {
      title: 'Ngày hết hạn',
      dataIndex: 'endDate',
      key: 'endDate',
      align: 'center',
      render: (endDate) => (
        <Moment format="DD/MM/YYYY HH:mm">{new Date(endDate)}</Moment>
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
      title: 'Xác thực bài đăng',
      dataIndex: 'verify',
      align: 'center',
      key: 'verify',
      render: (verify: any, data: any) => {
        if (verify === 'VERIFIED') {
          return <Tag color="green"> Đã xác thực</Tag>;
        }
        if (verify === 'WAITING') {
          return <Tag color="orange">Chờ xác thực</Tag>;
        }
        if (verify === 'UNVERIFIED' || verify === null) {
          return <Tag color="red"> Chưa xác thực</Tag>;
        }
        if (verify === 'VERIFIED_AGAIN' || verify === null) {
          return <Tag color="magenta"> Yêu cầu xác thực lại</Tag>;
        }
      },
    },
  ];

  return (
    <Fragment>
      <PostViewVerify
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
