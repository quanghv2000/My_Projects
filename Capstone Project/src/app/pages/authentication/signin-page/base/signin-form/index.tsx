import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Row, Typography } from 'antd';
// import { FacebookLoginComponent } from 'app/components/facebook-login';
import { GoogleLoginComponent } from 'app/components/google-login';
import 'app/pages/authentication/signin-page/base/signin-form/style.scss';
import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'types/RootState';
import {
  signInRequest,
  clearStateSignIn,
  signInUserInformationRequest,
} from 'app/pages/authentication/signin-page/screen/action';
import { ForgotPasswordForm } from '../forgotpassword-form';
import { ResendEmailVerifyForm } from 'app/pages/authentication/signin-page/base/resend-email-verify-form';

export interface SignInFormProps {
  emaiL: string;
  password: string;
}

export const SignInForm: React.FC<any> = () => {
  const dispatch = useDispatch();
  const { Title, Paragraph } = Typography;
  const [visibleModal, setVisibleModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [visibleModalResendEmail, setVisibleModalResendEmail] = useState(false);

  const state = useSelector((state: RootState) => state?.signInReducer);

  const onFinish = (values: any) => {
    dispatch(signInRequest(values));
  };

  const onShowForgotPasswordModal = () => {
    setVisibleModal(true);
  };

  const handleForgotModal = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisibleModal(false);
      setConfirmLoading(false);
    }, 2000);
  };

  // clear msg,old state when access page
  useEffect(() => {
    dispatch(clearStateSignIn({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // use token to sign in
  useEffect(() => {
    if (state?.token) {
      dispatch(signInUserInformationRequest({}));
    }
    dispatch(clearStateSignIn({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.token]);

  const handleCancelModalForgot = () => {
    setVisibleModal(false);
  };


  return (
    <Fragment>
      <Row className="signin__form">
        <Row className="signin__form-container">
          <Title className="signin__form-title">Đăng nhập</Title>
          <Paragraph className="signin__form-paragraph">
            bắt đầu trải nghiệm của bạn
          </Paragraph>
        </Row>

        <Row className="signin__form-data">
          <Form
            name="normal_login"
            initialValues={{ remember: true }}
            className="form-data"
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên đăng nhập!',
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder=" Tên đăng nhập"
                size="large"
              />
            </Form.Item>
            <Form.Item
              style={{ margin: '0px 0px 0px 0px' }}
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mật khẩu!',
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder=" Mật khẩu"
                size="large"
              />
            </Form.Item>
            <div className="login-form-forgot">
              <div onClick={onShowForgotPasswordModal}>Quên mật khẩu</div>
            </div>
            <div
              className={
                state?.dataResponse?.code === '200'
                  ? 'color-success mt-10'
                  : 'color-error mt-10'
              }
            >
              {state?.message}
            </div>
            <div className="login-form-verify-again">
              {state?.isVerify ? (
                <div onClick={() => setVisibleModalResendEmail(true)}>
                  {' '}
                  Gửi lại email để xác minh{' '}
                </div>
              ) : (
                ''
              )}
            </div>
            <Form.Item
              className="button-form"
              style={{ margin: '0px 0px 10px 0px' }}
            >
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                size="large"
                loading={state?.loading}
              >
                Đăng nhập
              </Button>
              <Button
                htmlType="submit"
                className="login-form-button"
                size="large"
                style={{ backgroundColor: '#f5f5f5' }}
              >
                <GoogleLoginComponent title="Đăng nhập" />
              </Button>
            </Form.Item>
          </Form>
        </Row>

        <Row className="signin__form-signup">
          <Row className="account">Bạn chưa có tài khoản?</Row>

          <Link to="/sign-up" className="signup-link">
            Đăng ký
          </Link>
        </Row>
      </Row>

      <ForgotPasswordForm
        visibleModal={visibleModal}
        confirmLoading={confirmLoading}
        handleOk={handleForgotModal}
        handleCancel={handleCancelModalForgot}
      />
      <ResendEmailVerifyForm
        visibleModal={visibleModalResendEmail}
        handleOk={() => setVisibleModalResendEmail(false)}
        handleCancel={() => setVisibleModalResendEmail(false)}
      />
    </Fragment>
  );
};
