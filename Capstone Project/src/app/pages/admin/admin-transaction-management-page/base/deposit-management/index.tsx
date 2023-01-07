import {
  Table,
  Button,
  Modal,
  Form,
  Row,
  Col,
  Select,
  Input,
  Tag,
  InputNumber,
  message,
  Descriptions,
  DatePicker,
} from 'antd';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'types/RootState';
import 'app/pages/landlord/landlord-house-page/base/house-data-table/style.scss';
import Moment from 'react-moment';
import { convertPrice } from 'helper/convert-price-to-vnd';
import {
  adminGetTransactionRequest,
  adminConfirmTransactionRequest,
  adminRejectTransactionRequest,
  adminSearchTransactionRequest,
  clearState,
} from 'app/pages/admin/admin-transaction-management-page/screen/action';
import { TransactionCreateModal } from 'app/pages/admin/admin-transaction-management-page/base/create-transaction-modal';
import moment from 'moment';
const dateFormat = 'DD/MM/YYYY';

const { Option } = Select;
const { TextArea } = Input;

const columnsDepositHistory: any = [
  {
    title: 'STT',
    dataIndex: 'index',
    align: 'center',
    key: 'index',
    render: (index) => <b>{index}</b>,
  },
  {
    title: 'Người nạp',
    dataIndex: 'fullname',
    align: 'center',
    key: 'fullname',
  },
  {
    title: 'Tài khoản',
    dataIndex: 'username',
    align: 'center',
    key: 'username',
  },
  {
    title: 'Số tiền nạp',
    dataIndex: 'amount',
    key: 'amount',
    align: 'center',
    render: (amount) => (
      <span> {amount ? `${convertPrice(amount)} vn₫` : '-'}</span>
    ),
  },
  {
    title: 'Số tiền thực',
    dataIndex: 'actualAmount',
    key: 'actualAmount',
    align: 'center',
    render: (actualAmount) => (
      <span> {actualAmount ? `${convertPrice(actualAmount)} vn₫` : '-'}</span>
    ),
  },
  {
    title: 'Mã chuyển khoản',
    dataIndex: 'userCode',
    key: 'userCode',
    align: 'center',
    render: (code) => <span>{code ? code : '-'}</span>,
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
    title: 'Trạng thái',
    dataIndex: 'status',
    align: 'center',
    key: 'status',
    render: (status: any, record: any) => {
      if (
        status === 'SUCCESS' &&
        record?.action === 'MINUS' &&
        record?.typeOfTransaction === 'DEPOSIT'
      ) {
        return <Tag color="green">Trừ tiền thành công</Tag>;
      }
      if (
        status === 'SUCCESS' &&
        record?.action === 'PLUS' &&
        record?.typeOfTransaction === 'DEPOSIT'
      ) {
        return <Tag color="green">Nạp thành công</Tag>;
      }
      if (status === 'FAILED' && record?.typeOfTransaction === 'DEPOSIT') {
        return <Tag color="red">Nạp thất bại</Tag>;
      }
      if (status === 'PENDING' && record?.typeOfTransaction === 'DEPOSIT') {
        return <Tag color="orange">Chờ xác nhận</Tag>;
      }
    },
  },
];

export const DepositManagement: React.FC<any> = (props: any) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalConfirmVisible, setModalConfirmVisible] = useState(false);
  const [statusModalConfirm, setStatusModalConfirm] = useState('');
  const [createTransactionModalVisible, setCreateTransactionModalVisible] =
    useState(false);
  const [dataItem, setDataItem]: any = useState('');
  const [formSearch] = Form.useForm();
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(adminGetTransactionRequest(''));
  }, []);

  const state = useSelector(
    (state: RootState) => state?.adminTransactionReducer
  );

  const transaction =
    state?.dataResponse?.length > 0 ? state?.dataResponse : [];

  const statusOfDepositModal = (status: any, record: any) => {
    if (status === 'SUCCESS' && record?.action === 'MINUS') {
      return <Tag color="green">Trừ tiền thành công</Tag>;
    }
    if (status === 'SUCCESS' && record?.action === 'PLUS') {
      return <Tag color="green">Nạp thành công</Tag>;
    }
    if (status === 'FAILED') {
      return <Tag color="red">Nạp thất bại</Tag>;
    }
    if (status === 'PENDING') {
      return <Tag color="orange">Chờ xác nhận</Tag>;
    }
  };

  const checkStatusForButton = (status) => {
    if (status === 'SUCCESS') {
      return '';
    }
    if (status === 'FAILED') {
      return '';
    }
    if (status === 'PENDING') {
      return (
        <Fragment>
          <Button
            className="mb-10"
            danger
            type="primary"
            style={{ marginLeft: '10px' }}
            onClick={() => {
              setStatusModalConfirm('REJECT');
              setModalConfirmVisible(true);
            }}
          >
            Huỷ
          </Button>
          <Button
            type="primary"
            onClick={() => {
              setStatusModalConfirm('ACCEPT');
              setModalConfirmVisible(true);
              form.setFieldsValue({
                actualAmount: dataItem?.amount,
              });
            }}
          >
            Nạp tiền
          </Button>
        </Fragment>
      );
    }
  };

  const success = (title) => {
    message.success({
      content: title,
      className: 'custom-class',
    });
  };

  const clearDataAndStateModal = () => {
    dispatch(clearState(''));
    form.resetFields();
    setModalConfirmVisible(false);
    setModalVisible(false);
  };

  useEffect(() => {
    if (state?.status === 'confirmed') {
      clearDataAndStateModal();
      success('Chuyển tiền thành công');
      dispatch(adminGetTransactionRequest(''));
    }
    if (state?.status === 'rejected') {
      clearDataAndStateModal();
      success('Đã huỷ giao dịch thành công');
      dispatch(adminGetTransactionRequest(''));
    }
  }, [state?.status]);

  useEffect(() => {
    if (props?.isChangeTab !== 'deposit') {
      form.resetFields();
    }
  }, [state?.loading]);

  const onFinish = (values: any) => {
    if (statusModalConfirm === 'ACCEPT') {
      const body = {
        id: dataItem?.id,
        actualAmount: values?.actualAmount,
        user: {
          id: dataItem?.userId,
        },
        note: values?.note,
      };
      dispatch(adminConfirmTransactionRequest(body));
    } else {
      const body = {
        id: dataItem?.id,
        note: values?.note,
      };
      dispatch(adminRejectTransactionRequest(body));
    }
  };

  const onFinishSearch = (values: any) => {
    const body = {
      userCode: values?.userCode ? values?.userCode : '',
      username: values?.username ? values?.username : '',
      fullName: values?.fullName ? values?.fullName : '',
      status: values?.status,
      fromDateStr: values?.fromDate
        ? moment(values?.fromDate)?.format('YYYY-MM-DD 00:00:00')
        : '',
      toDateStr: values?.toDate
        ? moment(values?.toDate)?.format('YYYY-MM-DD 23:59:59')
        : '',
    };
    dispatch(adminSearchTransactionRequest(body));
  };

  return (
    <Fragment>
      <div
        className="mt-10"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          marginBottom: 30,
          paddingRight: 3,
        }}
      >
        <Form
          name="search"
          layout="vertical"
          form={formSearch}
          key="form-search"
          onFinish={onFinishSearch}
          autoComplete="off"
          style={{ display: ' flex', width: '100%' }}
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
              <Col xs={8} xl={3} style={{ padding: '0px 10px' }}>
                <Form.Item name="status" label="Trạng thái nạp">
                  <Select defaultValue={null} style={{ width: '100%' }}>
                    <Option value={null}>Tất cả</Option>
                    <Option value="PENDING">Chờ xác nhận</Option>
                    <Option value="SUCCESS">Thành công</Option>
                    <Option value="FAILED">Nạp thất bại</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={8} xl={4} style={{ padding: '0px 10px' }}>
                <Form.Item name="userCode" label="Mã chuyển khoản">
                  <Input
                    style={{ width: '100%' }}
                    placeholder="Mã chuyển khoản"
                    allowClear
                  />
                </Form.Item>
              </Col>
              <Col xs={8} xl={4} style={{ padding: '0px 10px' }}>
                <Form.Item name="fullName" label="Người nạp">
                  <Input
                    style={{ width: '100%' }}
                    placeholder="Họ và tên"
                    allowClear
                  />
                </Form.Item>
              </Col>
              <Col xs={8} xl={4} style={{ padding: '0px 10px' }}>
                <Form.Item name="username" label="Tài khoản">
                  <Input
                    style={{ width: '100%' }}
                    placeholder="Tài khoản"
                    allowClear
                  />
                </Form.Item>
              </Col>
              <Col xs={8} xl={3} style={{ padding: '0px 10px' }}>
                <Form.Item name="fromDate" label="Ngày bắt đầu">
                  <DatePicker
                    placeholder="Ngày bắt đầu"
                    style={{ width: '100%' }}
                    format={dateFormat}
                  />
                </Form.Item>
              </Col>
              <Col xs={8} xl={3} style={{ padding: '0px 10px' }}>
                <Form.Item name="toDate" label="Ngày kết thúc">
                  <DatePicker
                    placeholder="Ngày kết thúc"
                    style={{ width: '100%' }}
                    format={dateFormat}
                  />
                </Form.Item>
              </Col>
              <Col xs={8} xl={3} style={{ padding: '0px 10px', marginTop: 30 }}>
                <Button htmlType="submit" className="mt-20" type="primary">
                  Tìm kiếm
                </Button>
              </Col>
            </Row>
          </Col>
        </Form>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          width: '100%',
          marginBottom: 20,
          paddingRight: 3,
        }}
      >
        <Button
          className="ml-20"
          style={{
            backgroundColor: '#389e0d',
            borderColor: '#389e0d',
            color: 'white',
          }}
          onClick={() => setCreateTransactionModalVisible(true)}
        >
          <i className="fa fa-file-invoice mr-5"></i> Tạo hóa đơn
        </Button>
      </div>
      <Table
        rowKey="id"
        bordered
        className="mt-10 mb-10 table-cursor-pointer-row"
        columns={columnsDepositHistory}
        loading={state?.loading}
        // dataSource={roomTypes}
        dataSource={transaction}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: false,
        }}
        scroll={{ x: 600 }}
        // rowSelection={rowSelection}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              setModalVisible(true);
              setDataItem(record);
            }, // click row
          };
        }}
      />

      <Modal
        title="Chi tiết giao dịch"
        style={{ top: 20 }}
        width="1000px"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[checkStatusForButton(dataItem?.status)]}
      >
        <Descriptions title="Thông tin nạp tiền" bordered>
          <Descriptions.Item label="Người nạp">
            {dataItem?.fullname}
          </Descriptions.Item>
          <Descriptions.Item label="Tài khoản" span={2}>
            {dataItem?.username}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày nạp">
            {dataItem?.dateCreate
              ? moment(dataItem?.dateCreate).format('DD/MM/YYYY HH:mm')
              : ''}
          </Descriptions.Item>
          <Descriptions.Item label="Mã chuyển khoản" span={2}>
            {dataItem?.userCode}
          </Descriptions.Item>
          <Descriptions.Item label="Trạng thái">
            {statusOfDepositModal(dataItem?.status, dataItem)}
          </Descriptions.Item>
          <Descriptions.Item label="Mã giao dịch" span={2}>
            {dataItem?.code}
          </Descriptions.Item>
          <Descriptions.Item label="Số tiền">
            <span style={{ fontWeight: 'bold' }}>
              {dataItem?.amount ? `${convertPrice(dataItem?.amount)}₫` : ''}
            </span>
          </Descriptions.Item>
          <Descriptions.Item label="Số tiền thực" span={2}>
            <span style={{ fontWeight: 'bold' }}>
              {dataItem?.actualAmount
                ? `${convertPrice(dataItem?.actualAmount)}₫`
                : ''}
            </span>
          </Descriptions.Item>
          <Descriptions.Item label="Nội dung">
            {dataItem?.note ? dataItem?.note : ''}
          </Descriptions.Item>
        </Descriptions>
      </Modal>

      <Modal
        title={
          statusModalConfirm === 'ACCEPT' ? 'Xác nhận nạp tiền' : 'Huỷ nạp tiền'
        }
        style={{ top: 20 }}
        width="700px"
        visible={modalConfirmVisible}
        onCancel={() => {
          form.resetFields();
          setModalConfirmVisible(false);
        }}
        footer={null}
      >
        <Row style={{ display: 'flex', justifyContent: ' center' }}>
          <Col xs={24} xl={16}>
            <Form
              layout="vertical"
              name="modal"
              key={'form-approval'}
              onFinish={onFinish}
              form={form}
            >
              {statusModalConfirm === 'ACCEPT' ? (
                <Fragment>
                  <Form.Item
                    label="Số tiền thực nạp"
                    name="actualAmount"
                    rules={[{ required: true, message: 'Số tiền thực nạp!' }]}
                  >
                    <InputNumber
                      step={500000}
                      min="0"
                      style={{ width: '100%' }}
                      placeholder="Số tiền thực nạp"
                      formatter={(value) => convertPrice(value)}
                      addonAfter="VND"
                    />
                  </Form.Item>
                  <Form.Item
                    label="Ghi chú"
                    name="note"
                    rules={[{ required: true, message: 'Nhập ghi chú!' }]}
                  >
                    <TextArea
                      rows={4}
                      placeholder="Nhập ghi chú"
                      maxLength={1000}
                    />
                  </Form.Item>
                </Fragment>
              ) : (
                <Fragment>
                  <Form.Item
                    label="Lý do huỷ"
                    name="note"
                    rules={[
                      { required: true, message: 'Nhập thông lý do huỷ!' },
                    ]}
                  >
                    <TextArea
                      rows={4}
                      placeholder="Nhập thông lý do huỷ"
                      maxLength={1000}
                    />
                  </Form.Item>
                </Fragment>
              )}

              <div style={{ display: ' flex', justifyContent: 'flex-end' }}>
                <Button
                  className="mb-10"
                  style={{ marginRight: '10px' }}
                  onClick={() => {
                    form.resetFields();
                    setModalConfirmVisible(false);
                  }}
                >
                  Đóng
                </Button>
                <Button
                  type="primary"
                  loading={state?.btnConfirm}
                  htmlType="submit"
                >
                  Xác nhận
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Modal>
      <TransactionCreateModal
        createTransactionModalVisible={createTransactionModalVisible}
        setCreateTransactionModalVisible={setCreateTransactionModalVisible}
      />
    </Fragment>
  );
};
