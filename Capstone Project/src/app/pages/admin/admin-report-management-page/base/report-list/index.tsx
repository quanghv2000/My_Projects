import { Table, Button, Modal, message } from 'antd';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'types/RootState';
import 'app/pages/landlord/landlord-house-page/base/house-data-table/style.scss';
import {
  getDataPostingCostRequest,
  deleteDataPostingCostRequest,
} from 'app/pages/admin/admin-posting-cost-management-page/screen/action';
import PostingCostView from 'app/pages/admin/admin-posting-cost-management-page/base/posting-cost-view/index';
import PostingCostCreate from 'app/pages/admin/admin-posting-cost-management-page/base/posting-cost-create/index';
import Moment from 'react-moment';
import { convertPrice } from 'helper/convert-price-to-vnd';
import PostView from 'app/pages/admin/admin-post-management-page/base/post-view/index';
import { getReportPostRequest } from 'app/pages/admin/admin-report-management-page/screen/action';

export const ReportList: React.FC<any> = () => {
  const dispatch = useDispatch();
  const [isModalViewVisible, setIsModalViewVisible] = useState(false);
  const [dataPost, setDataPost] = useState({});
  const state = useSelector((state: RootState) => state?.adminReportReducer);

  const columns: any = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      align: 'center',
      render: (text, record, index) => <b>{index + 1}</b>,
    },
    {
      title: 'Email người báo cáo',
      dataIndex: 'createdBy',
      key: 'createdBy',
      align: 'center',
      render: (createdBy) => <span>{createdBy}</span>,
    },
    {
      title: 'Nội dung báo cáo',
      dataIndex: 'content',
      align: 'center',
      key: 'content',
    },
    {
      title: 'Ngày báo cáo',
      dataIndex: 'createdDate',
      key: 'createdDate',
      align: 'center',
      render: (text) => (
        <Moment format="DD/MM/YYYY HH:mm">{new Date(text)}</Moment>
      ),
    },
    {
      title: 'Bài đăng báo cáo',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      render: (text: any, record: any) => (
        <Button
          type="link"
          onClick={() => {
            setDataPost(record?.postdetail);
            setIsModalViewVisible(true);
          }}
        >
          Xem bài đăng
        </Button>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getReportPostRequest(''));
  }, []);

  return (
    <Fragment>
      <h3
        style={{
          textTransform: 'uppercase',
          fontWeight: 'bold',
          color: '#1CA4DA',
          marginBottom: 20,
        }}
      >
        Quản lý báo cáo
      </h3>
      <PostView
        isModalViewVisible={isModalViewVisible}
        data={dataPost}
        setIsModalViewVisible={(visibale) => setIsModalViewVisible(visibale)}
      />
      <Table
        rowKey="id"
        bordered
        className="mt-10 mb-10 table-cursor-pointer-row"
        columns={columns}
        loading={state?.loading}
        dataSource={state?.dataResponse?.length > 0 ? state?.dataResponse : []}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: false,
        }}
        scroll={{ x: 600 }}
      />
    </Fragment>
  );
};
