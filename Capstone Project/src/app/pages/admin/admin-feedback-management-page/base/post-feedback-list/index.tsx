import { Button, Table } from 'antd';
import { FeedbackList } from 'app/pages/admin/admin-feedback-management-page/base/feedback-list';
import 'app/pages/landlord/landlord-house-page/base/house-data-table/style.scss';
import { filterPostingRequest } from 'app/pages/user/suggestion-page/screen/action';
import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'types/RootState';

export const PostingFeedbackList: React.FC<any> = () => {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [id, setId] = useState('');

  const filter = {
    pageIndex: 1,
    pageSize: 10,
    verify: '',
    minArea: null,
    maxArea: null,
    typeOfRentalIds: null,
    roomCategoryIds: null,
    minPrice: null,
    maxPrice: null,
    maximumNumberOfPeople: null,
    amenityHouseIds: null,
    amenityRoomIds: null,
    roomMate: '',
    houseName: '',
  };

  useEffect(() => {
    dispatch(filterPostingRequest(filter));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const statePost = useSelector((state: RootState) => state?.searchPageReducer);
  const stateFeedback = useSelector(
    (state: RootState) => state?.adminFeedbackReducer
  );

  const columns: any = [
    {
      title: 'ID Bài đăng',
      dataIndex: 'postId',
      key: 'postId',
      align: 'center',
      render: (postId, record: any) => (
        <Button
          onClick={() => {
            setId(record?.post?.id);
            setIsModalVisible(true);
          }}
          type="link"
        >
          {record?.post?.id}
        </Button>
      ),
    },
    {
      title: 'Tên nhà',
      dataIndex: 'houseId',
      key: 'houseId',
      align: 'center',
      render: (houseId, record: any) => (
        <span>{record?.post?.house?.name}</span>
      ),
    },
    {
      title: 'Chủ nhà',
      dataIndex: 'host',
      key: 'host',
      align: 'center',
      render: (host, record: any) => (
        <span>
          {record?.post?.house?.user?.fullName
            ? record?.post?.house?.user?.fullName
            : record?.post?.house?.user?.username}
        </span>
      ),
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      align: 'center',
      render: (phoneNumber, record: any) => (
        <span>{record?.post?.house?.phoneNumber}</span>
      ),
    },
    {
      title: 'Ngày đăng',
      dataIndex: 'startDate',
      key: 'startDate',
      align: 'center',
      render: (startDate, record: any) => (
        <span>{moment(record?.post?.startDate).format('DD/MM/YYYY')}</span>
      ),
    },
    {
      title: 'Tổng đánh giá',
      dataIndex: 'amountRating',
      key: 'amountRating',
      align: 'center',
      render: (amountRating, record: any) => (
        <span>
          <span className="bold">
            {record?.amountRating ? record?.amountRating : 0}
          </span>{' '}
          Đánh giá
        </span>
      ),
    },
    {
      title: 'Điểm đánh giá',
      dataIndex: 'rating',
      key: 'rating',
      align: 'center',
      render: (rating, record: any) => (
        <span>
          <span className="bold">{record?.rating ? record?.rating.toFixed(1) : 0}</span>{' '}
          <i className="fa fa-star" style={{ color: 'rgb(255, 176, 37)' }}></i>{' '}
        </span>
      ),
    },
  ];

  const onChangepage = (value) => {
    dispatch(
      filterPostingRequest({
        ...filter,
        pageIndex: value,
      })
    );
  };

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
        Quản lý đánh giá bài đăng
      </h3>
      <Table
        rowKey="id"
        bordered
        className="mt-10 mb-10 table-cursor-pointer-row"
        columns={columns}
        loading={statePost?.loading}
        dataSource={
          statePost?.dataResponse?.length > 0 ? statePost?.dataResponse : []
        }
        pagination={{
          pageSize: 10,
          total: statePost?.data?.totalItems ? statePost?.data?.totalItems : 1,
          current: statePost?.data?.currentPage,
          onChange: onChangepage,
          showSizeChanger: false,
        }}
        scroll={{ x: 600 }}
      />
      <FeedbackList
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        id={id}
        filter={filter}
      />
    </Fragment>
  );
};
