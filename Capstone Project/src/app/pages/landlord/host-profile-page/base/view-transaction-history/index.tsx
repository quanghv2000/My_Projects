import { Descriptions, Modal, Tag } from 'antd';
import {
  checkStatus,
  checkTypeOfTransaction,
  checkPriceStatus,
} from 'app/pages/landlord/host-profile-page/base/transaction-history/template';
import { convertPrice } from 'helper/convert-price-to-vnd';
import moment from 'moment';
import { useState } from 'react';

const TransactionHistoryView = (props) => {
  const handleOk = () => {
    props.setIsModalViewVisible(false);
    setIsModalUpdateVisible(true);
  };

  const [isModalUpdateVisible, setIsModalUpdateVisible] = useState(false);

  const handleCancel = () => {
    props.setIsModalViewVisible(false);
  };

  return (
    <>
      <Modal
        title={'Lịch sử giao dịch'}
        visible={props.isModalViewVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText="Đóng"
        okText="OK"
        width="1000px"
      >
        <Descriptions
          title={'Thông tin giao dịch: ' + props?.data?.code}
          bordered
        >
          <Descriptions.Item label="Loại giao dịch">
            {checkTypeOfTransaction(
              props?.data?.typeOfTransaction,
              props?.data?.action
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Mã giao dịch" span={2}>
            {props?.data?.code}
          </Descriptions.Item>
          {/* <Descriptions.Item label="Automatic Renewal">YES</Descriptions.Item> */}
          <Descriptions.Item label="Ngày tạo">
            {props?.data?.dateCreate
              ? moment(props?.data?.dateCreate).format('DD/MM/YYYY HH:mm')
              : ''}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày kiểm duyệt" span={2}>
            {props?.data?.dateVerify
              ? moment(props?.data?.dateVerify).format('DD/MM/YYYY HH:mm')
              : ''}
          </Descriptions.Item>
          {/* <Descriptions.Item label="Trạng thái" span={3}>
            <Badge status="processing" text="Chờ xác nhận" />
          </Descriptions.Item> */}
          <Descriptions.Item label="Trạng thái" span={3}>
            {checkStatus(props?.data, props?.data?.status)}
          </Descriptions.Item>
          <Descriptions.Item label="Số tiền">
            {props?.data?.actualAmount > 0  ? (
              <Tag color="gold" style={{ fontWeight: 'bold' }}>{`${convertPrice(
                props?.data?.amount
              )} vn₫`}</Tag>
            ) : (
              checkPriceStatus(props?.data, props?.data?.amount)
            )}
          </Descriptions.Item>
          {props?.data?.actualAmount > 0 ? (
            <Descriptions.Item label="Số tiền thực">
              {checkPriceStatus(props?.data, props?.data?.actualAmount)}
            </Descriptions.Item>
          ) : (
            ''
          )}

          <Descriptions.Item
            label="Số dư cuối"
            span={props?.data?.actualAmount ? 1 : 2}
          >
            {' '}
            <Tag color="blue" style={{ fontWeight: 'bold' }}>{`${convertPrice(
              props?.data?.lastBalance
            )} vn₫`}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Mô tả">
            {props?.data?.note ? props?.data?.note : ''}
          </Descriptions.Item>
        </Descriptions>
      </Modal>
    </>
  );
};

export default TransactionHistoryView;
