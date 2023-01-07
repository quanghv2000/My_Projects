import { Row, Col, Avatar, Button, Upload, Modal, message } from 'antd';
import React, { Fragment, useState, useEffect } from 'react';
import 'app/pages/landlord/landlord-house-page/base/house-data-table/style.scss';
import { UserOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { PersonalInformationPage } from 'app/pages/landlord/host-profile-page/base/personal-information';
import { ChangePasswordPage } from 'app/pages/landlord/host-profile-page/base/change-password';
import { TransactionHistoryPage } from 'app/pages/landlord/host-profile-page/base/transaction-history';
import { Deposit } from 'app/pages/landlord/host-profile-page/base/deposit';
import {
  clearMsgUpdate,
  updateUserImageRequest,
  clearState,
  getUserInfoRequest,
} from 'app/pages/landlord/host-profile-page/screen/action';
import { convertPrice } from 'helper/convert-price-to-vnd';
import { useSelector } from 'react-redux';
import { RootState } from 'types/RootState';
import { useDispatch } from 'react-redux';
import { getBase64 } from 'helper/handle-upload';
import { DEFAULT_APP_SECOND_UPLOAD_CLOUNDINARY } from 'utils/config';

export const PersonalPage: React.FC<any> = () => {
  const state = useSelector((state: RootState) => state?.hostProfileReducer);
  const dispatch = useDispatch();
  const [active, setActive] = useState('personal_information');
  const [fileList, setFileList]: any = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewTitle, setPreviewTitle] = useState('');
  const [previewImage, setPreviewImage]: any = useState('');

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Thêm</div>
    </div>
  );

  useEffect(() => {
    if (state?.msg === 'upload__image_success') {
      message.success('Đã cập nhật ảnh thành công');
      dispatch(clearState(''));
      dispatch(getUserInfoRequest(''));
    }
  }, [state?.msg]);


  useEffect(() => {
    if (state?.userInfo?.imageLink) {
      const image: any = {
        uid: '-1',
        name: 'Ảnh',
        url: state?.userInfo?.imageLink,
        status: 'done',
      };
      let imageList: any = [];
      imageList.push(image);
      setFileList(imageList);
    } else {
      const image: any = {
        uid: '-1',
        name: 'Ảnh',
        url: 'https://joeschmoe.io/api/v1/random',
        status: 'done',
      };
      let imageList: any = [];
      imageList.push(image);
      setFileList(imageList);
    }
  }, [state?.userInfo?.imageLink]);

  const handleChangeUpload: any = async (fileLists: any) => {
    setFileList(fileLists.fileList);
    const url = DEFAULT_APP_SECOND_UPLOAD_CLOUNDINARY;
    const formData = new FormData();
    for (let i = 0; i < fileLists.fileList.length; i++) {
      let file = await fileLists.fileList[i];
      await formData.append('file', file?.originFileObj);
      await formData.append('upload_preset', 'ml_default');

      await fetch(url, {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          return response.text();
        })
        .then((data) => {
          const body = {
            id: state?.userInfo?.id,
            imageLink: JSON.parse(data)?.url ? JSON.parse(data)?.url : '',
          };
          dispatch(updateUserImageRequest(body));
        });
    }
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    );
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };

  return (
    <Fragment>
      <Row>
        <Col
          span={18}
          push={6}
          style={{
            border: '1px solid',
            borderColor: '#e4e4e4',
            borderRadius: 12,
          }}
        >
          {active === 'personal_information' ? (
            <PersonalInformationPage />
          ) : null}
          {active === 'change_password' ? <ChangePasswordPage /> : null}
          {active === 'transaction_history' ? <TransactionHistoryPage /> : null}
          {active === 'deposit' ? <Deposit /> : null}
        </Col>
        <Col
          span={5}
          pull={18}
          style={{
            border: '1px solid',
            borderColor: '#ccc',
            paddingBottom: 30,
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ backgroundColor: '#1CA4DA' }}>
              <h3
                style={{
                  color: '#1890ff',
                  padding: 5,
                  background: '#e6f7ff',
                  textTransform: 'uppercase',
                  fontSize: 14,
                  fontWeight: 'bold',
                }}
              >
                Trang cá nhân
              </h3>
            </div>
            <div style={{ padding: '25px 0px' }}>
              <Upload
                action="http://www.mocky.io/v2/596a5f03110000920701cd92"
                listType="picture-card"
                maxCount={1}
                fileList={fileList}
                beforeUpload={() => {
                  return false;
                }}
                accept=".PNG,.JPG"
                onPreview={handlePreview}
                onChange={handleChangeUpload}
              >
                {fileList.length >= 1 ? null : uploadButton}
              </Upload>
              {/* <Avatar size={108} icon={<UserOutlined />} /> */}
            </div>
            <div>
              <h3
                style={{
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  color: '#006699',
                  paddingTop: 0,
                }}
              >
                {state?.userInfo?.fullName}
              </h3>
              <p style={{ color: '#006699', fontWeight: 'bold' }}>
                Mã CK: {state?.userInfo?.codeTransaction}
              </p>
              <span style={{ color: '#006699', fontWeight: 'bold' }}>
                Số dư tài khoản
              </span>{' '}
              <br />
              <p style={{ fontWeight: 'bold', marginTop: 5 }}>
                {state?.userInfo?.balance
                  ? convertPrice(state?.userInfo?.balance)
                  : 0}{' '}
                vnđ
              </p>
              <Button
                type="primary"
                style={{
                  margin: '10px 0px',
                  backgroundColor: '#1CA4DA',
                  fontWeight: 'bold',
                  padding: '4px 30px',
                }}
                onClick={() => {
                  setActive('deposit');
                }}
              >
                Nạp Tiền
              </Button>
            </div>
          </div>
          <div
            style={{
              backgroundColor: '#E8E8E8',
              color: '#666666',
              fontWeight: 'bold',
              padding: '7px 10px',
              marginTop: 30,
            }}
          >
            Quản lý thông tin cá nhân
          </div>
          <div style={{ paddingTop: 20, color: '#848484', borderRadius: 12 }}>
            <ul>
              <li
                style={{ cursor: 'pointer', marginBottom: '6px' }}
                onClick={() => {
                  dispatch(clearMsgUpdate(''));
                  setActive('personal_information');
                }}
              >
                {' '}
                <span
                  style={{
                    borderRadius: 12,
                    color:
                      active === 'personal_information' ? '#E47313' : '#848484',
                  }}
                >
                  Thay đổi thông tin cá nhân
                </span>
              </li>
              <li
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setActive('change_password');
                }}
              >
                {' '}
                <span
                  style={{
                    color: active === 'change_password' ? '#E47313' : '#848484',
                  }}
                >
                  Thay đổi mật khẩu
                </span>
              </li>
            </ul>
          </div>
          <div
            style={{
              backgroundColor: '#E8E8E8',
              color: '#666666',
              fontWeight: 'bold',
              padding: '7px 10px',
              marginTop: 20,
            }}
          >
            Quản lý tài chính
          </div>
          <div style={{ paddingTop: 20, color: '#848484' }}>
            <ul>
              <li
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setActive('deposit');
                }}
              >
                {' '}
                <span
                  style={{
                    color: active === 'deposit' ? '#E47313' : '#848484',
                  }}
                >
                  Nạp tiền
                </span>
              </li>
              <li
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setActive('transaction_history');
                }}
              >
                {' '}
                <span
                  style={{
                    color:
                      active === 'transaction_history' ? '#E47313' : '#848484',
                  }}
                >
                  Lịch sử giao dịch
                </span>
              </li>
            </ul>
          </div>
        </Col>
      </Row>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </Fragment>
  );
};
