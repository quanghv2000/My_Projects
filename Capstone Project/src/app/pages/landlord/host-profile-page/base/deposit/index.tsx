import { Button, Col, InputNumber, Modal, Row, Descriptions } from 'antd';
import { getDataBankAccountRequest } from 'app/pages/admin/admin-bank-account-management-page/screen/action';
import 'app/pages/landlord/landlord-house-page/base/house-data-table/style.scss';
import {
  createDepositRequest,
  clearState,
} from 'app/pages/landlord/host-profile-page/screen/action';
import { convertPrice } from 'helper/convert-price-to-vnd';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'types/RootState';
import './style.scss';
import { isNumeric } from 'helper';

export const Deposit: React.FC<any> = () => {
  const dispatch = useDispatch();
  const [bankActive, setBankActive]: any = useState({
    id: '',
    bankName: '',
    branch: '',
    numberAccount: '',
    username: '',
    imageUrl: '',
  });

  const [depositAmount, setDepositAmount] = useState(50000);
  const [invalidDepositAmount, setInvalidDepositAmount] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const userInfoCookies = localStorage.getItem('user-info');
  // const userInfoCookies = getCookie('user-info');
  let userInfo: any;

  if (userInfoCookies) {
    userInfo = JSON.parse(userInfoCookies);
  }

  useEffect(() => {
    dispatch(getDataBankAccountRequest(''));
  }, [dispatch]);

  const stateBank = useSelector(
    (state: RootState) => state?.adminBankAccountPageReducer
  );

  useEffect(() => {
    if (stateBank?.dataResponse?.length > 0) {
      const itemActive: any = stateBank?.dataResponse[0];
      setBankActive({
        id: itemActive?.id,
        bankName: itemActive?.bankName,
        branch: itemActive?.branch,
        numberAccount: itemActive?.numberAccount,
        username: itemActive?.username,
        imageUrl: itemActive?.imageUrl,
      });
    }
  }, [stateBank?.dataResponse]);

  const state = useSelector((state: RootState) => state?.hostProfileReducer);

  const success = () => {
    Modal.success({
      title: 'Thành công',
      content: 'Vui lòng chờ hệ thống xử lý. Tiền sẽ được cập nhật sớm nhất!',
    });
  };

  useEffect(() => {
    if (state.msg === 'success') {
      dispatch(clearState(''));
      success();
      setIsModalVisible(false);
    }
  }, [state.msg]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    dispatch(createDepositRequest({ amount: depositAmount }));
    // setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const confirmDeposit = () => {
    let messageInvalidDepositAmount = '';
    if (depositAmount < 50000) {
      messageInvalidDepositAmount = 'Số tiền nạp tối thiểu là 50,000đ!';
    }
    if (depositAmount > 500000000) {
      messageInvalidDepositAmount = 'Số tiền nạp nhỏ hơn là 500,000,000đ!';
    }
    if (bankActive?.bankName === '' && bankActive?.numberAccount === '') {
      messageInvalidDepositAmount = 'Vui lòng chọn ngân hàng bạn chuyển khoản!';
    }

    if (messageInvalidDepositAmount === '') {
      showModal();
    }

    setInvalidDepositAmount(messageInvalidDepositAmount);
  };

  return (
    <Fragment>
      <div
        style={{
          backgroundColor: '#1CA4DA',
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
      >
        <h3
          style={{
            color: '#FFFFFF',
            padding: '5px 10px',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            fontSize: 14,
          }}
        >
          Nạp tiền
        </h3>
      </div>
      <div style={{ padding: '20px 30px' }}>
        <div>
          <strong>Thời gian cập nhật:</strong> Trong vòng 5-15 phút
        </div>
        <div style={{ marginTop: 10 }}>
          <strong>Chọn tài khoản ngân hàng:</strong>{' '}
          <span style={{ color: 'red' }}>{'(*)'}</span>
        </div>
        <div style={{ marginTop: '20px', width: '100%' }}>
          <Row style={{ width: '100%' }}>
            <Descriptions title="" bordered style={{ width: '100%' }}>
              <Descriptions.Item label="Ngân hàng" span={3}>
                <Row style={{ width: '100%' }}>
                  {stateBank?.dataResponse?.length > 0
                    ? stateBank?.dataResponse.map((item, index) => {
                        return (
                          <Col
                            className="gutter-row"
                            span={3}
                            style={{ cursor: 'pointer', padding: '0px 5px' }}
                            onClick={() => {
                              setBankActive(item);
                            }}
                          >
                            <div
                              style={{
                                marginBottom: 10,
                              }}
                              key={index}
                            >
                              {' '}
                              <img
                                style={{
                                  height: 60,
                                  border:
                                    item.id === bankActive.id
                                      ? '3px solid #1CA4DA'
                                      : '1px solid #ccc',
                                }}
                                src={item.imageUrl}
                                alt=""
                              />
                            </div>
                          </Col>
                        );
                      })
                    : ''}
                </Row>
              </Descriptions.Item>
              <Descriptions.Item label="Tên ngân hàng" span={3}>
                {bankActive?.bankName}
              </Descriptions.Item>
              <Descriptions.Item label="Chi nhánh" span={3}>
                {bankActive?.branch}
              </Descriptions.Item>
              <Descriptions.Item label="Tên tài khoản" span={3}>
                {bankActive?.username}
              </Descriptions.Item>
              <Descriptions.Item label="Số tài khoản" span={3}>
                {bankActive?.numberAccount}
              </Descriptions.Item>
              <Descriptions.Item label="Nội dung chuyển tiền" span={3}>
                {userInfo?.codeTransaction}
              </Descriptions.Item>
            </Descriptions>
          </Row>
        </div>
        <div style={{ marginTop: '30px', borderTop: '1px solid #e4e4e4' }}>
          <div style={{ marginTop: 30 }}>
            <strong>Số tiền:</strong>{' '}
            <InputNumber
              defaultValue={depositAmount}
              step={100000}
              min={0}
              placeholder="Số tiền thực nạp"
              formatter={(value) => convertPrice(value)}
              style={{ width: '200px', marginLeft: '10px' }}
              onChange={(value) => {
                setDepositAmount(value);
              }}
            />
            <p style={{ marginTop: 8, color: 'red' }}>{invalidDepositAmount}</p>
          </div>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              backgroundColor: '#1CA4DA',
              marginTop: '30px',
              fontWeight: 'bold',
            }}
            onClick={() => confirmDeposit()}
          >
            Xác Nhận
          </Button>
        </div>
      </div>
      <div style={{ padding: '20px 45px' }}></div>
      <Modal
        title="Thông tin chuyển tiền"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Xác nhận đã chuyển tiền"
        cancelText="Đóng"
      >
        <Row style={{ marginLeft: '50px' }}>
          <Col span={12}>
            {' '}
            <div>Ngân hàng:</div>
          </Col>
          <Col span={12}>
            {' '}
            <div>
              <strong>{bankActive.bankName}</strong>
            </div>
          </Col>

          <Col span={12} style={{ marginTop: 8 }}>
            {' '}
            <div>Chủ tài khoản:</div>
          </Col>
          <Col span={12} style={{ marginTop: 8 }}>
            {' '}
            <div>
              <strong>{bankActive.username}</strong>
            </div>
          </Col>

          <Col span={12} style={{ marginTop: 8 }}>
            {' '}
            <div>Số tài khoản:</div>
          </Col>
          <Col span={12} style={{ marginTop: 8 }}>
            {' '}
            <div>
              <strong>{bankActive.numberAccount}</strong>
            </div>
          </Col>

          <Col span={12} style={{ marginTop: 8 }}>
            {' '}
            <div>Số tiền:</div>
          </Col>
          <Col span={12} style={{ marginTop: 8 }}>
            {' '}
            <div>
              <strong>{convertPrice(depositAmount)}</strong>
            </div>
          </Col>

          <Col span={12} style={{ marginTop: 8 }}>
            {' '}
            <div>Nội dung chuyển khoản:</div>
          </Col>
          <Col span={12} style={{ marginTop: 8 }}>
            {' '}
            <div>
              <strong> {userInfo?.codeTransaction}</strong>
            </div>
          </Col>
        </Row>
      </Modal>
    </Fragment>
  );
};
