import { Button, Form, Input } from 'antd';
import 'app/pages/landlord/landlord-house-page/base/house-data-table/style.scss';
import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'types/RootState';
import { changePasswordRequest } from 'app/pages/user/settings-account-page/screen/action';
import './style.scss';
import { ForgotPasswordForm } from 'app/pages/authentication/signin-page/base/forgotpassword-form';

export const ChangePasswordPage: React.FC<any> = () => {
  const dispatch = useDispatch();
  const onFinish = (values: any) => {
    const body = {
      oldPassword: values?.oldPassword,
      newPassword: values?.newPassword,
    };
    dispatch(changePasswordRequest(body));
  };

  const onShowForgotPasswordModal = () => {
    setVisibleModal(true);
  };

  const handleCancelModalForgot = () => {
    setVisibleModal(false);
  };
  const handleForgotModal = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisibleModal(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const [visibleModal, setVisibleModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [visibleModalResendEmail, setVisibleModalResendEmail] = useState(false);

  const state = useSelector((state: RootState) => state?.settingAccountReducer);

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
          Thay đổi mật khẩu
        </h3>
      </div>
      <div style={{ padding: '30px 45px' }}>
        <Form name="basic" onFinish={onFinish} autoComplete="off">
          <Form.Item
            label="Mật khẩu cũ"
            name="oldPassword"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu cũ!' },
              {
                pattern:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                message:
                  'Mật khẩu tối thiểu tám ký tự, ít nhất một chữ cái, một số và một ký tự đặc biệt',
              },
            ]}
          >
            <Input style={{ width: '325px' }} />
          </Form.Item>

          <div
            style={{ marginTop: 10, marginBottom: 10, marginLeft: 150 }}
            onClick={onShowForgotPasswordModal}
          >
            <a href="#">Quên mật khẩu?</a>
          </div>

          <Form.Item
            label="Mật khẩu mới"
            name="newPassword"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu mới!' },
              {
                pattern:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                message:
                  'Mật khẩu tối thiểu tám ký tự, ít nhất một chữ cái, một số và một ký tự đặc biệt',
              },
            ]}
          >
            <Input style={{ width: '325px' }} />
          </Form.Item>

          <Form.Item
            label="Nhập lại mật khẩu"
            name="acceptedNewPassword"
            rules={[
              { required: true, message: 'Xin vui lòng nhập thông tin!' },
              {
                pattern:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                message:
                  'Mật khẩu tối thiểu tám ký tự, ít nhất một chữ cái, một số và một ký tự đặc biệt',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('Hai mật khẩu bạn đã nhập không khớp!')
                  );
                },
              }),
            ]}
          >
            <Input style={{ width: '325px' }} />
          </Form.Item>

          <div
            className={
              state?.dataResponse?.code === '200'
                ? 'color-success mb-20'
                : 'color-error mb-20'
            }
          >
            {state?.message}
          </div>

          <Form.Item wrapperCol={{ offset: 4, span: 24 }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                backgroundColor: '#1CA4DA',
                marginTop: '30px',
                fontWeight: 'bold',
              }}
            >
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </div>

      <ForgotPasswordForm
        visibleModal={visibleModal}
        confirmLoading={confirmLoading}
        handleOk={handleForgotModal}
        handleCancel={handleCancelModalForgot}
      />
    </Fragment>
  );
};
