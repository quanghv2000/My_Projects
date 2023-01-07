import {
  Table,
  Input,
  Button,
  Form,
  Modal,
  Tag,
  Popconfirm,
  Badge,
  message,
  Col,
  Row,
  DatePicker,
} from 'antd';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'types/RootState';
import { convertPrice } from 'helper/convert-price-to-vnd';
// import { CustomerDataTable } from 'app/pages/landlord/room-tenants-page/base/data-table';
import 'app/pages/landlord/landlord-house-page/base/house-data-table/style.scss';
import { Select } from 'antd';
import {
  LockOutlined,
  UnlockOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import {
  getDataAccountRequest,
  lockAccountRequest,
  unlockAccountRequest,
  verifyAccountRequest,
} from 'app/pages/admin/admin-account-management-page/screen/action';
import AccountView from 'app/pages/admin/admin-account-management-page/base/account-view/index';
import AccountCreateModal from 'app/pages/admin/admin-account-management-page/base/account-create-modal';
import './style.scss';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';
const dateFormat = 'DD/MM/YYYY';

const { Option } = Select;

export const AccountList: React.FC<any> = () => {
  const dispatch = useDispatch();
  // const [isModalVisible, setIsModalVisible] = useState(false);
  // const [keyword, setKeyword] = useState('');
  // const [isActive, setIsActive] = useState(2);
  const [idAccount, setIdAccount] = useState('');
  const [isModalViewVisible, setIsModalViewVisible] = useState(false);
  const [isModalCreateVisible, setIsModalCreateVisible] = useState(false);
  const [dataModalAmenityView, setDataAmenityView] = useState({});

  const [modalConfirmVisible, setModalConfirmVisible] = useState(false);
  const [form] = Form.useForm();

  const lockAccountSuccess = () => {
    message.info('Khóa tài khoản thành công.');
  };

  const confirmUnLockAccount = (userId) => {
    dispatch(unlockAccountRequest({ id: userId }));
  };

  const unlockAccountSuccess = () => {
    message.info('Tài khoản đã được mở khóa.');
  };

  const state = useSelector(
    (state: RootState) => state?.adminAccountPageReducer
  );

  const stateHostProfile = useSelector(
    (state: RootState) => state?.hostProfileReducer
  );

  const getAllListAccount = () => {
    const body = {
      isActive: '2',
      fullname: '',
      username: '',
      fromDateStr: '',
      toDateStr: '',
    };
    dispatch(getDataAccountRequest(body));
  };

  useEffect(() => {
    form.resetFields();
    getAllListAccount();

    return () => {
      form.resetFields();
    };
  }, []);

  useEffect(() => {
    if (stateHostProfile?.statusUpdateInfoUser === 'updated') {
      setIsModalViewVisible(false);
      message.success('Thay đổi thông tin tài khoản dùng thành công');
      getAllListAccount();
    }
  }, [stateHostProfile?.statusUpdateInfoUser]);

  // const handleChangeAccountStatus = (status) => {
  //   const isActive = Number(status);
  //   dispatch(getDataAccountRequest({ keyword, isActive }));
  // };

  const onFinish = (values: any) => {
    const body = {
      isActive: values?.status ? values?.status : '2',
      fullname: values?.fullname ? values?.fullname : '',
      username: values?.username ? values?.username : '',
      fromDateStr: values?.fromDate
        ? moment(values?.fromDate)?.format('YYYY-MM-DD 00:00:00')
        : '',
      toDateStr: values?.toDate
        ? moment(values?.toDate)?.format('YYYY-MM-DD 23:59:59')
        : '',
    };
    dispatch(getDataAccountRequest(body));
  };

  const onFinishLock = (values: any) => {
    dispatch(lockAccountRequest({ id: idAccount, note: values?.note }));
  };

  const buttonLock = (record: any) => (
    <Tag
      color="red"
      onClick={() => {
        setIdAccount(record.id);
        setModalConfirmVisible(true);
      }}
      style={{ padding: '3px 5px', width: 80 }}
    >
      <LockOutlined className="mr-5" />
      Khoá
    </Tag>
  );

  const buttonVerify = (record: any) => (
    <Popconfirm
      placement="topRight"
      title={`Xác minh cho tài khoản "${record.username}"?`}
      onConfirm={() => {
        dispatch(
          verifyAccountRequest({
            id: record.id,
          })
        );
      }}
      okText="Xác Nhận"
      cancelText="Hủy"
    >
      <Tag color="processing" style={{ padding: '3px 5px', width: 80 }}>
        <i className="fa-solid fa-check mr-5"></i>
        Xác minh
      </Tag>
    </Popconfirm>
  );

  const buttonUnlock = (record: any) => (
    <Popconfirm
      placement="topRight"
      title={`Mở khóa tài khoản "${record.username}"?`}
      onConfirm={() => {
        confirmUnLockAccount(record.id);
      }}
      okText="Xác nhận"
      cancelText="Huỷ"
    >
      <Tag color="green" style={{ padding: '3px 5px', width: 80 }}>
        <UnlockOutlined className="mr-5" />
        Mở Khóa
      </Tag>
    </Popconfirm>
  );

  const actionTableColumn = (record: any) => {
    if (record?.active === true) {
      if (record?.verify) {
        return buttonLock(record);
      } else
        return (
          <>
            {buttonVerify(record)}
            <div className="mt-10">{buttonLock(record)}</div>
          </>
        );
    } else {
      if (record?.verify) {
        return buttonUnlock(record);
      } else
        return (
          <>
            {buttonVerify(record)}
            <div className="mt-10"> {buttonUnlock(record)}</div>
          </>
        );
    }
  };


  const accounts = state?.dataResponse?.data;

  const columns: any = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      align: 'center',
      render: (text, record, index) => (
        <div
          onClick={() => {
            setDataAmenityView(record);
            setIsModalViewVisible(true);
          }}
        >
          <b>{index + 1}</b>
        </div>
      ),
    },
    {
      title: 'Họ & Tên',
      dataIndex: 'fullName',
      key: 'fullName',
      align: 'center',
      render: (fullName, record, index) => (
        <div
          onClick={() => {
            setDataAmenityView(record);
            setIsModalViewVisible(true);
          }}
        >
          {fullName ? fullName : '-'}
        </div>
      ),
    },
    {
      title: 'Tên tài khoản',
      dataIndex: 'username',
      align: 'center',
      key: 'username',
      render: (username, record) => (
        <div
          onClick={() => {
            setDataAmenityView(record);
            setIsModalViewVisible(true);
          }}
        >
          <span>{username}</span>
        </div>
      ),
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      align: 'center',
      render: (phoneNumber, record, index) => (
        <div
          onClick={() => {
            setDataAmenityView(record);
            setIsModalViewVisible(true);
          }}
        >
          {phoneNumber ? phoneNumber : '-'}
        </div>
      ),
    },
    {
      title: 'Số dư tài khoản',
      dataIndex: 'balance',
      key: 'balance',
      align: 'center',
      render: (balance, record) => (
        <div
          onClick={() => {
            setDataAmenityView(record);
            setIsModalViewVisible(true);
          }}
        >
          {balance ? `${convertPrice(balance)} vn₫` : '-'}
        </div>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'active',
      key: 'active',
      align: 'center',
      render: (active: any, record) => {
        if (active === true) {
          return (
            <div
              onClick={() => {
                setDataAmenityView(record);
                setIsModalViewVisible(true);
              }}
            >
              <Badge status="success" text="Đang hoạt động" />
            </div>
          );
        }
        if (active === false) {
          return (
            <div
              onClick={() => {
                setDataAmenityView(record);
                setIsModalViewVisible(true);
              }}
            >
              <Badge status="error" text="Đang bị khóa" />
            </div>
          );
        }
      },
    },
    {
      title: 'Xác minh tài khoản',
      dataIndex: 'verify',
      key: 'verify',
      align: 'center',
      render: (verify) => {
        if (verify) {
          return (
            <Tag icon={<CheckCircleOutlined />} color="success">
              Đã xác minh
            </Tag>
          );
        } else {
          return (
            <Tag icon={<ClockCircleOutlined />} color="warning">
              Chưa xác minh
            </Tag>
          );
        }
      },
    },
    {
      title: 'Thao tác',
      dataIndex: 'active',
      key: 'active',
      align: 'center',
      render: (active: any, record: any) => actionTableColumn(record),
    },
  ];

  useEffect(() => {
    if (
      state &&
      state?.statusLockAccount === 'lock-account' &&
      state?.loading &&
      modalConfirmVisible
    ) {
      setModalConfirmVisible(false);
      getAllListAccount();
      lockAccountSuccess();
      form.resetFields()
      setDataAmenityView([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.statusLockAccount]);

  useEffect(() => {
    if (
      state &&
      state?.statusUnLockAccount === 'unlock-account' &&
      state?.loading
    ) {
      getAllListAccount();
      unlockAccountSuccess();
      setIsModalViewVisible(false)
      setDataAmenityView([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.statusUnLockAccount]);

  useEffect(() => {
    if (state && state?.statusVerify === 'verified' && state?.loading) {
      getAllListAccount();
      message.success('Đã xác minh tài khoản thành công');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.statusVerify]);

  return (
    <Fragment>
      <AccountView
        isModalViewVisible={isModalViewVisible}
        data={dataModalAmenityView}
        setIsModalViewVisible={(visibale) => setIsModalViewVisible(visibale)}
      />
      <div
        className="mt-10"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          marginBottom: 40,
        }}
      >
        <Form
          name="search"
          // labelCol={{ span: 8 }}
          // wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          layout="vertical"
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
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
              <Col xs={8} xl={4} style={{ padding: '0px 10px' }}>
                <Form.Item name="status" label="Trạng thái">
                  <Select
                    defaultValue={'2'}
                    style={{ width: '100%' }}
                    // onChange={handleChangeAccountStatus}
                  >
                    <Option value="2">Tất cả</Option>
                    <Option value="1">
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          cursor: 'pointer',
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: '#31A24C',
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                          }}
                        ></div>
                        <div style={{ color: '#31A24C', marginLeft: '6px' }}>
                          Đang hoạt động
                        </div>
                        <div></div>
                      </div>
                    </Option>
                    <Option value="0">
                      <div
                        style={{
                          color: 'red',
                          display: 'flex',
                          alignItems: 'center',
                          cursor: 'pointer',
                        }}
                      >
                        {' '}
                        <div style={{ marginTop: '-5px' }}>
                          <LockOutlined />
                        </div>
                        <div style={{ marginLeft: '6px' }}>Đang bị khóa</div>
                      </div>
                    </Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={8} xl={4} style={{ padding: '0px 10px' }}>
                <Form.Item name="fullname" label="Họ & Tên">
                  <Input
                    style={{ width: '100%' }}
                    placeholder="Họ & Tên"
                    allowClear
                  />
                </Form.Item>
              </Col>
              <Col xs={8} xl={4} style={{ padding: '0px 10px' }}>
                <Form.Item name="username" label="Tên tài khoản">
                  <Input
                    style={{ width: '100%' }}
                    placeholder="Tên tài khoản"
                    allowClear
                  />
                </Form.Item>
              </Col>
              <Col xs={8} xl={4} style={{ padding: '0px 10px' }}>
                <Form.Item name="fromDate" label="Ngày tạo từ">
                  <DatePicker
                    placeholder="Ngày tạo từ"
                    style={{ width: '100%' }}
                    format={dateFormat}
                  />
                </Form.Item>
              </Col>
              <Col xs={8} xl={4} style={{ padding: '0px 10px' }}>
                <Form.Item name="toDate" label="Ngày tạo đến">
                  <DatePicker
                    placeholder="Ngày tạo đến"
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
        <div></div>
      </div>
      <div
        className="mb-20"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <div>
            <strong>
              Tổng số tài khoản : {state?.dataResponse?.totalAccount}
            </strong>{' '}
          </div>
          <div>
            Đang hoạt động:{' '}
            <strong style={{ color: 'green' }}>
              {state?.dataResponse?.accountActive}
            </strong>{' '}
          </div>
          <div>
            Bị khóa:{' '}
            <strong style={{ color: 'red' }}>
              {state?.dataResponse?.accountInactive}
            </strong>{' '}
          </div>
        </div>
        <div>
          <Button
            className="ml-20"
            style={{
              backgroundColor: '#87d068',
              borderColor: '#87d068',
              color: 'white',
              width: '165px',
            }}
            onClick={() => setIsModalCreateVisible(true)}
          >
            <i className="fa-solid fa-plus mr-5"></i>{' '}
            <strong>Thêm tài khoản</strong>
          </Button>
        </div>
      </div>
      <Table
        rowKey="id"
        bordered
        className="mt-10 mb-10 table-cursor-pointer-row"
        columns={columns}
        loading={state.loading}
        dataSource={accounts}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: false,
        }}
        // onRow={(record, rowIndex) => {
        //   return {
        //     onClick: (event) => {
        //       setIsModalViewVisible(true);
        //       // setDataModalTypeOfRentalView(record);
        //     }, // click row
        //   };
        // }}
      />

      <AccountCreateModal
        isModalCreateVisible={isModalCreateVisible}
        setIsModalCreateVisible={setIsModalCreateVisible}
      />

      <Modal
        title={'Khoá tài khoản'}
        style={{ top: 20 }}
        width="600px"
        visible={modalConfirmVisible}
        onCancel={() => {
          form.resetFields();
          setModalConfirmVisible(false);
        }}
        footer={null}
      >
        <Row style={{ display: 'flex', justifyContent: ' center' }}>
          <Col xs={24} xl={22}>
            <Form
              layout="vertical"
              name="modal"
              onFinish={onFinishLock}
              form={form}
            >
              <Fragment>
                <Form.Item
                  label="Lý do khoá tài khoản"
                  name="note"
                  rules={[
                    { required: true, message: 'Nhập lý do khoá tài khoản!' },
                  ]}
                >
                  <TextArea
                    rows={4}
                    placeholder="Nhập lý do khoá tài khoản"
                    maxLength={1000}
                  />
                </Form.Item>
              </Fragment>

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
                  loading={state?.loadingBtnLock}
                  htmlType="submit"
                >
                  Xác nhận
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Modal>

      {/* <Modal
        title="Basic Modal"
        visible={isModalVisible}
        okText="Chọn"
        cancelText="Đóng"
        onCancel={handleCancel}
        onOk={handleOk}
        okButtonProps={{ disabled: true }}
        width={1200}
        style={{ top: 20 }}
      >
        <CustomerDataTable />
      </Modal> */}
    </Fragment>
  );
};
