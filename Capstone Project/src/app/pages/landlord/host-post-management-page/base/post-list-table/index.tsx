import { Badge, Button, Modal, Table, Tag } from 'antd';
import PostView from 'app/pages/landlord/host-post-management-page/base/post-view';
import {
  getListPostRequest,
  verifyPostAgainRequest,
  verifyPostRequest,
  clearMsg,
} from 'app/pages/landlord/host-post-management-page/screen/action';
import 'app/pages/landlord/landlord-house-page/base/house-data-table/style.scss';
import { convertPrice } from 'helper/convert-price-to-vnd';
import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'types/RootState';
import PostCreate from '../post-create';

export const PostListTable: React.FC<any> = (props: any) => {
  const [isModalCreateVisible, setIsModalCreateVisible] = useState(false);
  const [dataItem, setDataItem]: any = useState();
  const [idPost, setIdPost]: any = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleVerifyAgain, setIsModalVerifyAgainVisible] =
    useState(false);
  const [isModalViewVisible, setIsModalViewVisible] = useState(false);
  const [dataView, setDataView]: any = useState({});

  const dispatch = useDispatch();

  const handleOk: any = (id: any) => {
    dispatch(
      verifyPostRequest({
        id: id,
      })
    );
    setTimeout(() => {
      // setVisible(false);
    }, 2000);
  };

  const column: any = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      align: 'center',
      render: (text, record, index) => <b>{index + 1}</b>,
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
      render: (postType, record) => (
        <div
          onClick={() => {
            setDataView(record);
            setIsModalViewVisible(true);
          }}
        >
          {postType ? postType : '-'}
        </div>
      ),
    },
    {
      title: 'Ngày đăng',
      dataIndex: 'startDate',
      key: 'startDate',
      align: 'center',
      render: (startDate, record) => (
        <div
          onClick={() => {
            setDataView(record);
            setIsModalViewVisible(true);
          }}
        >
          <Moment format="DD/MM/YYYY HH:mm">{new Date(startDate)}</Moment>
        </div>
      ),
    },
    {
      title: 'Ngày hết hạn',
      dataIndex: 'endDate',
      key: 'endDate',
      align: 'center',
      render: (endDate, record) => (
        <div
          onClick={() => {
            setDataView(record);
            setIsModalViewVisible(true);
          }}
        >
          <Moment format="DD/MM/YYYY HH:mm">{new Date(endDate)}</Moment>
        </div>
      ),
    },
    {
      title: 'Phí đăng',
      dataIndex: 'cost',
      key: 'cost',
      align: 'center',
      render: (cost, record) => (
        <div
          onClick={() => {
            setDataView(record);
            setIsModalViewVisible(true);
          }}
        >
          {convertPrice(cost) + ' vn₫'}
        </div>
      ),
    },
    {
      title: 'Số ngày đăng',
      dataIndex: 'numberOfDays',
      key: 'numberOfDays',
      align: 'center',
      render: (numberOfDays, record) => (
        <div
          onClick={() => {
            setDataView(record);
            setIsModalViewVisible(true);
          }}
        >
          {numberOfDays}
        </div>
      ),
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
          return (
            <Tag
              color="green"
              onClick={() => {
                setDataView(data);
                setIsModalViewVisible(true);
              }}
            >
              Đang hiển thị
            </Tag>
          );
        }
        if (moment(data.endDate) <= moment() && status === 'CENSORED') {
          return (
            <Tag
              color="red"
              onClick={() => {
                setDataView(data);
                setIsModalViewVisible(true);
              }}
            >
              Đã hết hạn
            </Tag>
          );
        }
        if (status === 'CENSORED' && moment(data.startDate) > moment()) {
          return (
            <Tag
              color="blue"
              onClick={() => {
                setDataView(data);
                setIsModalViewVisible(true);
              }}
            >
              Chờ hiển thị
            </Tag>
          );
        }
        if (status === 'UNCENSORED') {
          return (
            <Tag
              color="orange"
              onClick={() => {
                setDataView(data);
                setIsModalViewVisible(true);
              }}
            >
              Chờ kiểm duyệt
            </Tag>
          );
        }
        if (status === 'REJECTED') {
          return (
            <Tag
              color="magenta"
              onClick={() => {
                setDataView(data);
                setIsModalViewVisible(true);
              }}
            >
              Đã bị huỷ
            </Tag>
          );
        }
        if (status === 'DELETED') {
          return <Tag color="magenta">Gỡ bài đăng</Tag>;
        }
      },
    },
    {
      title: 'Xác thực bài đăng',
      dataIndex: 'verify',
      align: 'center',
      key: 'verify',
      render: (verify: any, data: any) => {
        if (verify === 'VERIFIED') {
          return <Badge status="success" text="Đã xác thực" />;
        } else if (verify === 'WAITING') {
          return <Badge status="warning" text="Chờ xác thực" />;
        } else if (verify === 'VERIFIED_AGAIN') {
          return <Badge status="warning" text="Chờ xác thực" />;
        } else if (verify === 'REJECTED') {
          return (
            <Button
              danger
              type="link"
              size="small"
              onClick={() => {
                setIdPost(data?.id);
                setDataView(data);
                setIsModalVerifyAgainVisible(true);
              }}
            >
              Xác thực thất bại
            </Button>
          );
        } else {
          if (
            data?.status === 'REJECTED' ||
            data?.status === 'DELETED' ||
            (data?.status === 'UNCENSORED' && moment(data.endDate) <= moment())
          ) {
            return <Badge status="error" text="Chưa xác thực" />;
          } else {
            return (
              <Button
                type="link"
                size="small"
                onClick={() => {
                  setIdPost(data?.id);
                  setIsModalVisible(true);
                }}
              >
                Gửi xác thực
              </Button>
            );
          }
        }
      },
    },
    {
      title: 'Thao tác',
      dataIndex: 'action',
      align: 'center',
      key: 'action',
      render: (text, data) => {
        if (
          data?.status === 'REJECTED' ||
          data?.status === 'DELETED' ||
          data?.status === 'UNCENSORED'
        ) {
          return '';
        } else {
          return (
            <Button
              type="primary"
              size="small"
              style={{
                background: '#b3d3ea',
                borderColor: '#b3d3ea',
                color: ' #2c5777',
              }}
              onClick={() => {
                setDataItem(data);
                dispatch(clearMsg(''));
                setIsModalCreateVisible(true);
              }}
            >
              Gia hạn
            </Button>
          );
        }
      },
    },
  ];

  const state = useSelector((state: RootState) => state?.hostPostPageReducer);

  useEffect(() => {
    if (state.verifyStatus === 'verified' && isModalVisible) {
      setIsModalVisible(false);
      dispatch(getListPostRequest(''));
    }
    if (state.verifyStatus === 'verified-again' && isModalVisibleVerifyAgain) {
      setIsModalVerifyAgainVisible(false);
      dispatch(getListPostRequest(''));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.verifyStatus]);

  return (
    <Fragment>
      <PostCreate
        keyModal="detail"
        title={'Gia hạn bài đăng'}
        isModalCreateVisible={isModalCreateVisible}
        setIsModalCreateVisible={(visibale) =>
          setIsModalCreateVisible(visibale)
        }
        setDataItem={setDataItem}
        data={dataItem}
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
      />
      <PostView
        isModalViewVisible={isModalViewVisible}
        data={dataView}
        setIsModalViewVisible={(visibale) => setIsModalViewVisible(visibale)}
      />

      <Modal
        title="Xác thực đăng tin"
        visible={isModalVisible}
        onOk={() => handleOk(idPost)}
        okText="Xác Thực"
        cancelText="Huỷ"
        confirmLoading={state.btnLoadingVerify}
        onCancel={() => setIsModalVisible(false)}
      >
        <p>
          1.Bạn cần kiểm tra thông tin chính xác trước khi gửi yêu cầu xác thực
        </p>
        <p>
          2.Phí xác thực: <span className="bold">200.000 VNĐ</span>
        </p>
        <p className="mt-10 color-error">{state?.msgErrorVerify}</p>
      </Modal>

      <Modal
        title="Xác thực lại đăng tin"
        visible={isModalVisibleVerifyAgain}
        onOk={() =>
          dispatch(
            verifyPostAgainRequest({
              id: idPost,
            })
          )
        }
        okText="Gửi xác thực lại"
        cancelText="Huỷ"
        confirmLoading={state.btnLoadingVerify}
        onCancel={() => setIsModalVerifyAgainVisible(false)}
      >
        <div
          style={{
            border: '1px solid gray',
            padding: '10px 20px 10px 5px',
            borderRadius: 5,
          }}
        >
          <span className="bold">Lý do</span> : {dataView?.verifyNote}
        </div>
        <p className="mt-10" style={{ color: 'gray' }}>
          Bạn cần kiểm tra thông tin chính xác trước khi gửi yêu cầu xác thực
          lại !
        </p>
      </Modal>
    </Fragment>
  );
};
