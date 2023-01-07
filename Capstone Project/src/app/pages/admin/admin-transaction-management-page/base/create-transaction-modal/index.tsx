import {
  Modal,
  Row,
  Col,
  Form,
  Select,
  Input,
  Button,
  InputNumber,
  Badge,
  Card,
  Descriptions,
  message,
} from 'antd';
import React, { Fragment, useState, useEffect } from 'react';
import { RootState } from 'types/RootState';
import { useSelector, useDispatch } from 'react-redux';
import {
  actionData,
  renderOptionSelect,
  renderOptionSelectUserName,
  findDataItem,
  checkTypeTransaction,
  checkTypeTransactionColor,
} from 'app/pages/admin/admin-transaction-management-page/base/create-transaction-modal/template';
import { convertPrice } from 'helper/convert-price-to-vnd';
import { getDataAccountRequest } from 'app/pages/admin/admin-account-management-page/screen/action';
import {
  adminGetTransactionRequest,
  adminCreateTransactionRequest,
  clearState,
} from 'app/pages/admin/admin-transaction-management-page/screen/action';
import { vietnameseStringToUnicode } from 'helper/search-vietnamese-words';

const { TextArea } = Input;

export const TransactionCreateModal: React.FC<any> = (props: any) => {
  // declare hooks
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  // declare state
  const state = useSelector(
    (state: RootState) => state?.adminAccountPageReducer
  );

  const stateTransaction = useSelector(
    (state: RootState) => state?.adminTransactionReducer
  );

  const [userState, setUserState]: any = useState({});
  const [descriptionTransaction, setDescriptionTransaction]: any = useState({
    type: 'Hoá Đơn',
    price: 0,
    note: '',
    color: 'green',
  });

  // using useEffect
  useEffect(() => {
    const body = {
      isActive: '2',
      fullname: '',
      username: '',
      fromDateStr: '',
      toDateStr: '',
    };
    dispatch(getDataAccountRequest(body));
  }, []);

  const onFinish = (values: any) => {
    const body = {
      amount: values?.price,
      actualAmount: values?.price,
      action: values?.transferType === 1 ? 'PLUS' : 'MINUS',
      user: {
        id: userState?.id,
      },
      note: values?.note,
    };
    dispatch(adminCreateTransactionRequest(body));
  };

  useEffect(() => {
    if (
      stateTransaction?.msgCreate === 'created' &&
      props.createTransactionModalVisible
    ) {
      props.setCreateTransactionModalVisible(false);
      dispatch(adminGetTransactionRequest(''));
      form.resetFields();
      dispatch(clearState(''));
      message.success('Tạo hoá đơn mới thành công');
    }
  }, [stateTransaction?.msgCreate]);

  return (
    <Fragment>
      <Modal
        title="Tạo mới hoá đơn"
        visible={props.createTransactionModalVisible}
        onCancel={() => props.setCreateTransactionModalVisible(false)}
        footer={null}
        width="850px"
      >
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Row>
            <Col sm={12} style={{ padding: '0px 10px' }}>
              <Form.Item
                label="Tài khoản"
                name="role"
                rules={[
                  {
                    required: true,
                    message: 'Nhập tài khoản!',
                  },
                ]}
              >
                <Select
                  showSearch
                  style={{ width: '100%' }}
                  placeholder="Chọn tài khoản"
                  filterOption={(input, option: any) =>
                    vietnameseStringToUnicode(option.children)
                      .toLowerCase()
                      .indexOf(
                        vietnameseStringToUnicode(input.toLowerCase())
                      ) >= 0
                  }
                  onSelect={(values: any) => {
                    setUserState(
                      findDataItem(values, state?.dataResponse?.data)
                    );
                  }}
                >
                  {renderOptionSelectUserName(state?.dataResponse?.data)}
                </Select>
              </Form.Item>
            </Col>
            <Col sm={12} style={{ padding: '0px 10px' }}>
              <Form.Item
                name="transferType"
                label="Loại giao dịch"
                rules={[
                  {
                    required: true,
                    message: 'Nhập loại giao dịch!',
                  },
                ]}
              >
                <Select
                  showSearch
                  style={{ width: '100%' }}
                  placeholder="Chọn loại giao dịch"
                  onSelect={(values: any) => {
                    const type = checkTypeTransaction(values);
                    const color = checkTypeTransactionColor(values);

                    setDescriptionTransaction({
                      ...descriptionTransaction,
                      type: type,
                      color: color,
                    });
                  }}
                >
                  {renderOptionSelect(actionData)}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* new Row */}
          <Row>
            <Col sm={12} style={{ padding: '0px 10px' }}>
              <Form.Item name="price" label="Số tiền">
                <InputNumber
                  style={{ width: '100%' }}
                  placeholder="Đơn giá"
                  step={500000}
                  onChange={(value: any) => {
                    setDescriptionTransaction({
                      ...descriptionTransaction,
                      price: value,
                    });
                  }}
                  min="0"
                  formatter={(value) => convertPrice(value)}
                  addonAfter="VND"
                />
              </Form.Item>
            </Col>
            <Col sm={12} style={{ padding: '0px 10px' }}>
              <Form.Item
                name="note"
                label="Ghi chú"
                rules={[
                  {
                    required: true,
                    message: 'Nhập ghi chú!',
                  },
                ]}
              >
                <TextArea
                  style={{ width: '100%' }}
                  rows={1}
                  onChange={(e: any) => {
                    setDescriptionTransaction({
                      ...descriptionTransaction,
                      note: e?.target?.value,
                    });
                  }}
                  placeholder="Nhập ghi chú"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row style={{ width: '100%' }}>
            <div
              style={{
                padding: '0px 10px',
                width: '100%',
                marginBottom: 10,
              }}
            >
              <Badge.Ribbon
                text={descriptionTransaction?.type}
                color={descriptionTransaction?.color}
              >
                <Card title="Thông tin hoá đơn" size="small">
                  <Row>
                    <Col sm={12}>
                      <Descriptions title="">
                        <Descriptions.Item label="Tên tài khoản">
                          {userState?.username}
                        </Descriptions.Item>
                      </Descriptions>
                    </Col>
                    <Col sm={12}>
                      <Descriptions title="">
                        <Descriptions.Item label="Tên người dùng">
                          {userState?.fullName}
                        </Descriptions.Item>
                      </Descriptions>
                    </Col>
                  </Row>

                  <Row>
                    <Col sm={12}>
                      <Descriptions title="">
                        <Descriptions.Item label="Mã chuyển khoản">
                          {userState?.codeTransaction}
                        </Descriptions.Item>
                      </Descriptions>
                    </Col>
                    <Col sm={12}>
                      <Descriptions title="">
                        <Descriptions.Item label="Số tiền">
                          <span className="bold">
                            {descriptionTransaction?.price > 0
                              ? convertPrice(descriptionTransaction?.price) +
                                ' vn₫'
                              : ''}
                          </span>
                        </Descriptions.Item>
                      </Descriptions>
                    </Col>
                  </Row>

                  <Row>
                    <Col sm={24}>
                      <Descriptions title="">
                        <Descriptions.Item label="Ghi chú">
                          {descriptionTransaction?.note}
                        </Descriptions.Item>
                      </Descriptions>
                    </Col>
                  </Row>
                </Card>
              </Badge.Ribbon>
            </div>
          </Row>

          <div className={'color-error mt-10'}>{stateTransaction?.status}</div>

          <Row style={{ width: '100%' }}>
            <div
              style={{
                padding: '0px 10px',
                display: 'flex',
                justifyContent: 'flex-end',
                width: '100%',
              }}
            >
              <Button
                className="mr-10"
                onClick={() => props.setCreateTransactionModalVisible(false)}
              >
                Đóng
              </Button>
              <Button type="primary" htmlType="submit">
                Tạo
              </Button>
            </div>
          </Row>
        </Form>
      </Modal>
    </Fragment>
  );
};
