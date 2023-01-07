import { Row, Col, Button, Popconfirm, message, Modal, Upload } from 'antd';
import React, { Fragment, useEffect, useState } from 'react';
import 'app/pages/landlord/landlord-house-page/base/house-data-table/style.scss';
import { PersonalInformationPage } from 'app/pages/user/user-profile-page/base/personal-information/index';
import { ChangePasswordPage } from 'app/pages/user/user-profile-page/base/change-password/index';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'types';
import { UserOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
// import { TransactionHistoryPage } from 'app/pages/landlord/host-profile-page/base/transaction-history';
// import { Deposit } from 'app/pages/landlord/host-profile-page/base/deposit';
import {
  clearMsgUpdate,
  updateUserImageRequest,
  clearState,
  getUserInfoRequest,
} from 'app/pages/landlord/host-profile-page/screen/action';
import { convertPrice } from 'helper/convert-price-to-vnd';
import { getBase64 } from 'helper/handle-upload';
import { DEFAULT_APP_SECOND_UPLOAD_CLOUNDINARY } from 'utils/config';
import { updateRoleHostRequest } from 'app/pages/user/settings-account-page/screen/action';

export const PersonalPage: React.FC<any> = () => {
  const state = useSelector((state: RootState) => state?.hostProfileReducer);
  const dispatch = useDispatch();
  const [active, setActive] = useState('personal_information');
  const [fileList, setFileList]: any = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewTitle, setPreviewTitle] = useState('');
  const [previewImage, setPreviewImage]: any = useState('');

  const userInfoCookies = localStorage.getItem('user-info');
  // const userInfoCookies = getCookie('user-info');
  let userInfo: any;

  if (userInfoCookies) {
    userInfo = JSON.parse(userInfoCookies);
  }

  const stateAcc = useSelector(
    (state: RootState) => state?.settingAccountReducer
  );

  const text = 'Bạn có muốn đăng ký làm chủ trọ?';

  const confirm = () => {
    dispatch(
      updateRoleHostRequest({
        role: {
          id: 3,
          role: 'ROLE_LANDLORD',
        },
      })
    );
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = '/sign-in';
  };

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
    if (stateAcc?.statusUpdate === 'updated') {
      Modal.success({
        content: 'Đăng ký thành công. Vui lòng đăng nhập lại!',
        onOk() {
          logout();
        },
      });
    }
  }, [stateAcc?.statusUpdate]);

  useEffect(() => {
    return () => {
      dispatch(clearMsgUpdate(''));
    };
  }, []);

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
      <Row style={{ padding: '20px 100px' }}>
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
          {/* {active === 'transaction_history' ? <TransactionHistoryPage /> : null}
          {active === 'deposit' ? <Deposit /> : null} */}
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
                {userInfo?.fullName ? userInfo?.fullName : ''}
              </h3>
              {/* <p style={{ color: '#006699', fontWeight: 'bold' }}>
                Mã CK: HLH17253
              </p>
              <span style={{ color: '#006699', fontWeight: 'bold' }}>
                Số dư tài khoản
              </span>{' '}
              <br />
              <p style={{ fontWeight: 'bold', marginTop: 5 }}>1.200.000 vnđ</p> */}
              <Popconfirm
                placement="top"
                title={text}
                onConfirm={confirm}
                okText="Đăng ký"
                cancelText="Hủy"
              >
                <Button
                  type="primary"
                  style={{
                    margin: '10px 0px',
                    backgroundColor: '#1CA4DA',
                    fontWeight: 'bold',
                    padding: '4px 30px',
                  }}
                  loading={stateAcc?.btnUpdateRole}
                >
                  Đăng ký làm chủ trọ
                </Button>
              </Popconfirm>
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
          <div style={{ paddingTop: 20, color: '#848484' }}>
            <ul>
              <li
                style={{ cursor: 'pointer', marginBottom: '6px' }}
                onClick={() => {
                  setActive('personal_information');
                }}
              >
                {' '}
                <span
                  style={{
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
                  dispatch(clearMsgUpdate(''));
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
          {/* <div
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
          </div> */}
        </Col>
      </Row>
    </Fragment>
  );
};
