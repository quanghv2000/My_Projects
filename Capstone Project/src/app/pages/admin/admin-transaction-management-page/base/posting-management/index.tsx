import {
  Table,
  Button,
  Form,
  Input,
  Row,
  Tag,
  Col,
  DatePicker,
  Select,
  Modal,
  Descriptions,
} from 'antd';
import React, { Fragment, useEffect, useState } from 'react';
import { RootState } from 'types/RootState';
import 'app/pages/landlord/landlord-house-page/base/house-data-table/style.scss';
import Moment from 'react-moment';
import moment from 'moment';
import { adminSearchPostOrExtendTransactionRequest } from 'app/pages/admin/admin-transaction-management-page/screen/action';
import { convertPrice } from 'helper/convert-price-to-vnd';
import { useDispatch, useSelector } from 'react-redux';

const dateFormat = 'DD/MM/YYYY';
const { Option } = Select;

const postings: any = [
  {
    title: 'STT',
    dataIndex: 'index',
    align: 'center',
    key: 'index',
    render: (text, record, index) => <b>{index + 1}</b>,
  },
  {
    title: 'Người đăng',
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
    title: 'Loại tin đăng',
    dataIndex: 'typeOfPosting',
    key: 'typeOfPosting',
    align: 'center',
  },
  {
    title: 'Thao tác',
    dataIndex: 'typeOfTransaction',
    key: 'typeOfTransaction',
    align: 'center',
    render: (typeOfTransaction: any) => {
      if (typeOfTransaction === 'POSTING') {
        return <Tag color="blue">Đăng tin</Tag>;
      }
      if (typeOfTransaction === 'POSTING_EXTEND') {
        return <Tag color="orange">Gia hạn</Tag>;
      }
    },
  },
  {
    title: 'Ngày đăng / gia hạn',
    dataIndex: 'datePostingOrExtend',
    key: 'datePostingOrExtend',
    align: 'center',
    render: (text) => (
      <Moment format="DD/MM/YYYY HH:mm">{new Date(text)}</Moment>
    ),
  },
  {
    title: 'Số ngày đăng',
    dataIndex: 'dayAmount',
    key: 'dayAmount',
    align: 'center',
    render: (text) => <span>{text + ' ngày'}</span>,
  },
  {
    title: 'Phí đăng',
    dataIndex: 'amount',
    key: 'amount',
    align: 'center',
    render: (amount) => convertPrice(amount) + 'vn₫',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    align: 'center',
    render: (status: any) => {
      if (status === 'SUCCESS') {
        return <Tag color="green">Thành công</Tag>;
      } else {
        return <span>-</span>;
      }
    },
  },
];

export const PostingManagement: React.FC<any> = (props: any) => {
  const dispatch = useDispatch();
  const state = useSelector(
    (state: RootState) => state?.adminTransactionReducer
  );

  const [form] = Form.useForm();

  const transaction =
    state?.dataPostingResponse?.length > 0 ? state?.dataPostingResponse : [];

  const [dataItem, setDataItem]: any = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const onFinishSearch = (values: any) => {
    const body = {
      username: values?.username ? values?.username : '',
      type: values?.type ? values?.type : '',
      fullName: values?.fullName ? values?.fullName : '',
      fromDateStr: values?.fromDate
        ? moment(values?.fromDate)?.format('YYYY-MM-DD 00:00:00')
        : '',
      toDateStr: values?.toDate
        ? moment(values?.toDate)?.format('YYYY-MM-DD 23:59:59')
        : '',
    };
    dispatch(adminSearchPostOrExtendTransactionRequest(body));
  };

  useEffect(() => {
    if (props?.isChangeTab !== 'posting') {
      form.resetFields();
    }
  }, [state?.loading]);

  return (
    <Fragment>
      <div
        className="mb-20 mt-10"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingRight: 2,
        }}
      >
        <Form
          form={form}
          name="basic"
          layout="vertical"
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
              <Col xs={8} xl={4} style={{ padding: '0px 10px' }}>
                <Form.Item name="type" label="Loại">
                  <Select defaultValue={null} style={{ width: '100%' }}>
                    <Option value={null}>Tất cả</Option>
                    <Option value="POSTING">Đăng tin</Option>
                    <Option value="POSTING_EXTEND">Gia hạn</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={8} xl={4} style={{ padding: '0px 10px' }}>
                <Form.Item name="fullName" label="Người đăng">
                  <Input
                    style={{ width: '100%' }}
                    placeholder="Người đăng"
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
              <Col xs={8} xl={4} style={{ padding: '0px 10px' }}>
                <Form.Item name="fromDate" label="Ngày bắt đầu">
                  <DatePicker
                    placeholder="Ngày bắt đầu"
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
      <Table
        rowKey="id"
        bordered
        className="mt-10 mb-10 table-cursor-pointer-row"
        columns={postings}
        loading={state?.loading}
        dataSource={transaction}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: false,
        }}
        scroll={{ x: 600 }}
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
        title="Chi tiết giao dịch đăng tin & gia hạn"
        style={{ top: 20 }}
        width="1000px"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Descriptions title="Thông tin chi tiết" bordered>
          <Descriptions.Item label="Người đăng">
            {dataItem?.fullname}
          </Descriptions.Item>
          <Descriptions.Item label="Tài khoản" span={2}>
            {dataItem?.username}
          </Descriptions.Item>
          <Descriptions.Item
            label={
              dataItem?.typeOfTransaction === 'POSTING'
                ? 'Ngày đăng tin'
                : 'Ngày gia hạn'
            }
          >
            {dataItem?.datePostingOrExtend
              ? moment(dataItem?.datePostingOrExtend).format('DD/MM/YYYY HH:mm')
              : ''}
          </Descriptions.Item>
          <Descriptions.Item label="Mã chuyển khoản" span={2}>
            {dataItem?.userCode}
          </Descriptions.Item>
          <Descriptions.Item label="Trạng thái">
            {dataItem?.typeOfTransaction === 'POSTING' ? (
              <Tag color="blue">Đăng tin</Tag>
            ) : (
              <Tag color="orange">Gia hạn</Tag>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Mã giao dịch" span={2}>
            {dataItem?.code}
          </Descriptions.Item>
          <Descriptions.Item label="Phí đăng">
            <span style={{ fontWeight: 'bold' }}>
              {dataItem?.amount ? `${convertPrice(dataItem?.amount)}₫` : ''}
            </span>
          </Descriptions.Item>
          <Descriptions.Item label="Số ngày đăng" span={2}>
            {dataItem?.dayAmount ? dataItem?.dayAmount + ' Ngày' : ''}
          </Descriptions.Item>
        </Descriptions>
      </Modal>
    </Fragment>
  );
};
