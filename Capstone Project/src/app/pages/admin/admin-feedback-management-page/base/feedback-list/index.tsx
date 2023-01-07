import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, message, Modal, Table } from 'antd';
import {
  clearState,
  deleteFeedbackRequest,
} from 'app/pages/admin/admin-feedback-management-page/screen/action';
import 'app/pages/landlord/landlord-house-page/base/house-data-table/style.scss';
import { getListFeedbackRequest } from 'app/pages/user/detail-room-page/screen/action';
import { filterPostingRequest } from 'app/pages/user/suggestion-page/screen/action';
import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'types/RootState';

export const FeedbackList: React.FC<any> = (props: any) => {
  const dispatch = useDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const stateListFeedback = useSelector(
    (state: RootState) => state?.detailRoomReducer?.listFeedback
  );

  const stateFeedback = useSelector(
    (state: RootState) => state?.adminFeedbackReducer
  );
  const state = useSelector((state: RootState) => state?.detailRoomReducer);

  const columns: any = [
    {
      title: 'ID đánh giá',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      render: (id) => <span>{id}</span>,
    },
    {
      title: 'Nội dung đánh giá',
      dataIndex: 'content',
      key: 'content',
      align: 'center',
      render: (content) => <span>{content}</span>,
    },
    {
      title: 'Tên người đánh giá',
      dataIndex: 'fullname',
      key: 'fullname',
      align: 'center',
      render: (fullname, record: any) => <span>{record?.user?.fullName}</span>,
    },
    {
      title: 'Tài khoản',
      dataIndex: 'username',
      key: 'username',
      align: 'center',
      render: (fullname, record: any) => <span>{record?.user?.username}</span>,
    },
    {
      title: 'Email',
      dataIndex: 'username',
      key: 'username',
      align: 'center',
      render: (fullname, record: any) => <span>{record?.user?.email}</span>,
    },
    {
      title: 'Ngày đánh giá',
      dataIndex: 'createdDate',
      key: 'createdDate',
      align: 'center',
      render: (createdDate) => (
        <span>{moment(createdDate).format('DD/MM/YYYY')}</span>
      ),
    },
    {
      title: 'Điểm đánh giá',
      dataIndex: 'rating',
      key: 'rating',
      align: 'center',
      render: (rating, record: any) => (
        <span>
          <span className="bold">{record?.rating ? record?.rating : 0}</span>{' '}
          <i className="fa fa-star" style={{ color: 'rgb(255, 176, 37)' }}></i>{' '}
        </span>
      ),
    },
  ];

  useEffect(() => {
    if (props?.id) {
      dispatch(getListFeedbackRequest({ id: props?.id }));
    }
  }, [props?.id]);

  useEffect(() => {
    if (stateFeedback?.status === '200' && props.isModalVisible) {
      message.success('Xoá đánh giá thành công!');
      setSelectedRowKeys([]);
      props.setIsModalVisible(false);
      dispatch(clearState(''));
      dispatch(
        filterPostingRequest({
          ...props?.filter,
          pageIndex: 1,
        })
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateFeedback?.status]);

  const onSelectChange = (selectedRowKeys: any, selectedRows: any) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  return (
    <Fragment>
      <Modal
        title="Chi tiết đánh giá"
        visible={props?.isModalVisible}
        okButtonProps={{ style: { display: 'none' } }}
        cancelText="Đóng"
        style={{ top: 20 }}
        onCancel={() => {
          setSelectedRowKeys([]);
          props?.setIsModalVisible(false);
        }}
        width={'100%'}
      >
        {selectedRowKeys.length > 0 ? (
          <div
            style={{
              marginBottom: 16,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Button
              style={{
                backgroundColor: '#ff4d4f',
                color: 'white',
                borderColor: '#ff4d4f',
                boxShadow: '0 2px 0 rgb(0 0 0 / 5%)',
              }}
              onClick={() => {
                Modal.confirm({
                  title: 'Xác nhận xoá đánh giá!',
                  icon: <ExclamationCircleOutlined />,
                  content:
                    'Bạn có chắc chắn xoá đánh của người dùng này không ?',
                  okText: 'Xác nhận',
                  cancelText: 'Huỷ',
                  onOk: () => {
                    dispatch(
                      deleteFeedbackRequest({
                        id: selectedRowKeys,
                      })
                    );
                  },
                });
              }}
            >
              <i className="fa-solid fa-delete-left mr-5"></i> Xoá
            </Button>
          </div>
        ) : (
          ''
        )}
        <Table
          rowKey="id"
          bordered
          className="mt-10 mb-10 table-cursor-pointer-row"
          columns={columns}
          loading={state?.loadingFeedback || stateFeedback?.loading}
          dataSource={
            stateListFeedback?.feedbackDtos?.length > 0
              ? stateListFeedback?.feedbackDtos
              : []
          }
          rowSelection={{
            type: 'radio',
            columnTitle: selectedRowKeys.length > 0 ? <div></div> : <></>,
            getCheckboxProps: (record: any) => {
              return {
                disabled: record.check,
              };
            },
            onChange: onSelectChange,
          }}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: false,
          }}
          scroll={{ x: 600 }}
        />
      </Modal>
    </Fragment>
  );
};
