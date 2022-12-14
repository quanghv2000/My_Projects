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
      title: 'Th??nh c??ng',
      content: 'Vui l??ng ch??? h??? th???ng x??? l??. Ti???n s??? ???????c c???p nh???t s???m nh???t!',
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
      messageInvalidDepositAmount = 'S??? ti???n n???p t???i thi???u l?? 50,000??!';
    }
    if (depositAmount > 500000000) {
      messageInvalidDepositAmount = 'S??? ti???n n???p nh??? h??n l?? 500,000,000??!';
    }
    if (bankActive?.bankName === '' && bankActive?.numberAccount === '') {
      messageInvalidDepositAmount = 'Vui l??ng ch???n ng??n h??ng b???n chuy???n kho???n!';
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
          N???p ti???n
        </h3>
      </div>
      <div style={{ padding: '20px 30px' }}>
        <div>
          <strong>Th???i gian c???p nh???t:</strong> Trong v??ng 5-15 ph??t
        </div>
        <div style={{ marginTop: 10 }}>
          <strong>Ch???n t??i kho???n ng??n h??ng:</strong>{' '}
          <span style={{ color: 'red' }}>{'(*)'}</span>
        </div>
        <div style={{ marginTop: '20px', width: '100%' }}>
          <Row style={{ width: '100%' }}>
            <Descriptions title="" bordered style={{ width: '100%' }}>
              <Descriptions.Item label="Ng??n h??ng" span={3}>
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
              <Descriptions.Item label="T??n ng??n h??ng" span={3}>
                {bankActive?.bankName}
              </Descriptions.Item>
              <Descriptions.Item label="Chi nh??nh" span={3}>
                {bankActive?.branch}
              </Descriptions.Item>
              <Descriptions.Item label="T??n t??i kho???n" span={3}>
                {bankActive?.username}
              </Descriptions.Item>
              <Descriptions.Item label="S??? t??i kho???n" span={3}>
                {bankActive?.numberAccount}
              </Descriptions.Item>
              <Descriptions.Item label="N???i dung chuy???n ti???n" span={3}>
                {userInfo?.codeTransaction}
              </Descriptions.Item>
            </Descriptions>
          </Row>
        </div>
        <div style={{ marginTop: '30px', borderTop: '1px solid #e4e4e4' }}>
          <div style={{ marginTop: 30 }}>
            <strong>S??? ti???n:</strong>{' '}
            <InputNumber
              defaultValue={depositAmount}
              step={100000}
              min={0}
              placeholder="S??? ti???n th???c n???p"
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
            X??c Nh???n
          </Button>
        </div>
      </div>
      <div style={{ padding: '20px 45px' }}></div>
      <Modal
        title="Th??ng tin chuy???n ti???n"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="X??c nh???n ???? chuy???n ti???n"
        cancelText="????ng"
      >
        <Row style={{ marginLeft: '50px' }}>
          <Col span={12}>
            {' '}
            <div>Ng??n h??ng:</div>
          </Col>
          <Col span={12}>
            {' '}
            <div>
              <strong>{bankActive.bankName}</strong>
            </div>
          </Col>

          <Col span={12} style={{ marginTop: 8 }}>
            {' '}
            <div>Ch??? t??i kho???n:</div>
          </Col>
          <Col span={12} style={{ marginTop: 8 }}>
            {' '}
            <div>
              <strong>{bankActive.username}</strong>
            </div>
          </Col>

          <Col span={12} style={{ marginTop: 8 }}>
            {' '}
            <div>S??? t??i kho???n:</div>
          </Col>
          <Col span={12} style={{ marginTop: 8 }}>
            {' '}
            <div>
              <strong>{bankActive.numberAccount}</strong>
            </div>
          </Col>

          <Col span={12} style={{ marginTop: 8 }}>
            {' '}
            <div>S??? ti???n:</div>
          </Col>
          <Col span={12} style={{ marginTop: 8 }}>
            {' '}
            <div>
              <strong>{convertPrice(depositAmount)}</strong>
            </div>
          </Col>

          <Col span={12} style={{ marginTop: 8 }}>
            {' '}
            <div>N???i dung chuy???n kho???n:</div>
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
