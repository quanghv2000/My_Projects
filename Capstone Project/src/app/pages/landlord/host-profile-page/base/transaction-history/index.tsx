import { Button, Col, DatePicker, Form, Input, Row, Select, Table } from 'antd';
import {
  checkPriceStatus,
  checkStatus,
  checkTypeOfTransaction,
} from 'app/pages/landlord/host-profile-page/base/transaction-history/template';
import {
  getTransactionRequest,
  searchTransactionRequest,
} from 'app/pages/landlord/host-profile-page/screen/action';
import 'app/pages/landlord/landlord-house-page/base/house-data-table/style.scss';
import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'types/RootState';
import TransactionHistoryView from '../view-transaction-history';
import './style.scss';
const dateFormat = 'DD/MM/YYYY';
const { Option } = Select;

export const TransactionHistoryPage: React.FC<any> = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isModalViewVisible, setIsModalViewVisible] = useState(false);
  const [dataModalTransactionHistoryView, setDataModalTransactionHistoryView] =
    useState({});

  const state = useSelector((state: RootState) => state?.hostProfileReducer);

  const transactionHistory: any = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      align: 'center',
      render: (index) => <b>{index}</b>,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'dateCreate',
      key: 'dateCreate',
      align: 'center',
      render: (text) => (
        <Moment format="DD/MM/YYYY HH:mm">{new Date(text)}</Moment>
      ),
    },
    {
      title: 'Mã giao dịch',
      align: 'center',
      dataIndex: 'code',
      key: 'code',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Số tiền',
      dataIndex: 'amount',
      key: 'amount',
      align: 'center',
      render: (amount, record) => {
        if (record?.actualAmount > 0) {
          return checkPriceStatus(record, record?.actualAmount);
        } else return checkPriceStatus(record, amount);
      },
    },
    {
      title: 'Loại giao dịch',
      dataIndex: 'typeOfTransaction',
      key: 'typeOfTransaction',
      align: 'center',
      render: (typeOfTransaction, record: any) => {
        return checkTypeOfTransaction(typeOfTransaction, record.action);
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status: any, record) => {
        return checkStatus(record, status);
      },
    },
  ];

  useEffect(() => {
    dispatch(getTransactionRequest(''));
  }, [dispatch]);

  const returnAction = (value) => {
    if (value === 'DEPOSITMINUS') {
      return 'MINUS';
    } else return '';
  };

  const returnTransferType = (value) => {
    if (value === 'DEPOSITPLUS' || value === 'DEPOSITMINUS') {
      return 'DEPOSIT';
    } else return value;
  };

  const onFinishSearch = (values: any) => {
    const body = {
      transactionCode: values?.transactionCode ? values?.transactionCode : '',
      transactionType: {
        transferType: values?.transactionType
          ? returnTransferType(values?.transactionType)
          : '',
        action: values?.transactionType
          ? returnAction(values?.transactionType)
          : '',
      },
      status: values?.status ? values?.status : '',
      fromDateStr: values?.fromDate
        ? moment(values?.fromDate)?.format('YYYY-MM-DD 00:00:00')
        : '',
      toDateStr: values?.toDate
        ? moment(values?.toDate)?.format('YYYY-MM-DD 23:59:59')
        : '',
    };
    dispatch(searchTransactionRequest(body));
  };

  return (
    <Fragment>
      <TransactionHistoryView
        isModalViewVisible={isModalViewVisible}
        data={dataModalTransactionHistoryView}
        setIsModalViewVisible={(visibale) => setIsModalViewVisible(visibale)}
      />
      <div style={{ backgroundColor: '#1CA4DA' }}>
        <h3
          style={{
            color: '#FFFFFF',
            padding: '5px 10px',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            fontSize: 14,
          }}
        >
          Lịch sử giao dịch
        </h3>
      </div>

      <div
        className="mt-10"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Form
          name="search"
          layout="vertical"
          onFinish={onFinishSearch}
          autoComplete="off"
          style={{
            display: ' flex',
            width: '100%',
            padding: '10px 10px 10px 10px',
          }}
        >
          <Col
            xs={24}
            xl={24}
            style={{
              width: '100%',
              padding: '20px 30px',
              boxShadow:
                'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
              borderRadius: 5,
              marginLeft: 1,
            }}
          >
            <Row
              style={{
                width: ' 100%',
              }}
            >
              <Col xs={8} xl={4} style={{ padding: '0px 10px' }}>
                <Form.Item name="transactionCode" label="Mã giao dịch">
                  <Input
                    style={{ width: '100%' }}
                    placeholder="Mã giao dịch"
                    allowClear
                  />
                </Form.Item>
              </Col>
              <Col xs={8} xl={4} style={{ padding: '0px 10px' }}>
                <Form.Item name="transactionType" label="Loại giao dịch">
                  <Select defaultValue={''} style={{ width: '100%' }}>
                    <Option value={''}>Tất cả</Option>
                    <Option value="DEPOSITPLUS">Nạp tiền</Option>
                    <Option value="DEPOSITMINUS">Trừ tiền</Option>
                    <Option value="POSTING">Đăng tin</Option>
                    <Option value="REFUND">Hoàn tiền</Option>
                    <Option value="POSTING_EXTEND">Gia hạn bài đăng</Option>
                    <Option value="VERIFY">Xác thực đăng tin</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={8} xl={4} style={{ padding: '0px 10px' }}>
                <Form.Item name="status" label="Trạng thái">
                  <Select defaultValue={''} style={{ width: '100%' }}>
                    <Option value={''}>Tất cả</Option>
                    <Option value="PENDING">Chờ xác nhận</Option>
                    <Option value="SUCCESS">Thành công</Option>
                    <Option value="FAILED">Thất bại</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={8} xl={4} style={{ padding: '0px 10px' }}>
                <Form.Item name="fromDate" label="Ngày tạo">
                  <DatePicker
                    placeholder="Ngày tạo"
                    style={{ width: '100%' }}
                    format={dateFormat}
                  />
                </Form.Item>
              </Col>
              <Col xs={8} xl={4} style={{ padding: '0px 10px' }}>
                <Form.Item name="toDate" label="Ngày kết thúc">
                  <DatePicker
                    placeholder="Ngày kết thúc"
                    style={{ width: '100%' }}
                    format={dateFormat}
                  />
                </Form.Item>
              </Col>
              <Col xs={8} xl={4} style={{ padding: '0px 10px', marginTop: 30 }}>
                <Button htmlType="submit" className="mt-20" type="primary">
                  Tìm kiếm
                </Button>
              </Col>
            </Row>
          </Col>
        </Form>
      </div>

      <div style={{ padding: '10px 20px' }}>
        <Table
          rowKey="id"
          bordered
          pagination={{
            defaultPageSize: 12,
            showSizeChanger: false,
          }}
          scroll={{ x: 600 }}
          // rowSelection={rowSelection}
          loading={state?.loading}
          className="mt-10 mb-10 table-cursor-pointer-row"
          columns={transactionHistory}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                setIsModalViewVisible(true);
                setDataModalTransactionHistoryView(record);
              }, // click row
            };
          }}
          // loading={data}
          dataSource={
            state?.dataResponse?.length > 0 ? state?.dataResponse : []
          }
        />
      </div>
    </Fragment>
  );
};
