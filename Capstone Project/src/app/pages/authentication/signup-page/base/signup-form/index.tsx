import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Row, Tabs, Typography } from 'antd';
import { GoogleLoginComponent } from 'app/components/google-login';
import 'app/pages/authentication/signup-page/base/signup-form/style.scss';
import {
  clearStateSignUp,
  signUpRequest,
} from 'app/pages/authentication/signup-page/screen/action';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from 'types/RootState';
import { AccountType } from '../account-type';

export interface SignUpFormProps {
  emaiL: string;
  password: string;
}

export const SignUpForm: React.FC<any> = () => {
  const dispatch = useDispatch();
  const { Title } = Typography;
  const { TabPane } = Tabs;

  const [form] = Form.useForm();

  const state = useSelector((state: RootState) => state?.signUpReducer);

  const [tabs, setTabs] = useState('Tenant');
  const [termCheckbox, setTermCheckbox] = useState(true);

  // form submit
  const onFinish = (values: any) => {
    if (values) {
      // register with role is user
      if (tabs === 'Tenant') {
        const body: any = {
          email: values?.email,
          username: values?.username,
          password: values?.password,
          fullName: values?.fullName,
          role: {
            id: 2,
            role: 'ROLE_USER',
          },
        };
        dispatch(signUpRequest(body));
      }
      // register with role is host, landlord
      if (tabs === 'Landlord') {
        const body: any = {
          email: values?.email,
          username: values?.username,
          password: values?.password,
          fullName: values?.fullName,
          role: {
            id: 3,
            role: 'ROLE_LANDLORD',
          },
        };
        dispatch(signUpRequest(body));
      }
    }
  };

  // clear msg,old state when access page
  useEffect(() => {
    dispatch(clearStateSignUp({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => {
      dispatch(clearStateSignUp({}));
    };
  }, []);

  const onChangeTabs = (key: any) => {
    form.resetFields();
    dispatch(clearStateSignUp({}));
    setTabs(key);
  };

  return (
    <Fragment>
      <Row className="signup_container">
        <Row className="signup__form">
          <Row className="signup__form-container">
            <Title className="signup__form-title" level={2}>
              Đăng ký
            </Title>
            <Tabs
              defaultActiveKey="Tenant"
              size="large"
              onChange={onChangeTabs}
            >
              <TabPane
                tab={<div className="tabs-width">Người thuê</div>}
                key="Tenant"
              ></TabPane>
              <TabPane
                tab={<div className="tabs-width">Chủ nhà</div>}
                key="Landlord"
              ></TabPane>
            </Tabs>
          </Row>

          <Row className="signup__form-data">
            <Form
              name="normal_login"
              form={form}
              initialValues={{ remember: true }}
              className="form-data"
              onFinish={onFinish}
            >
              <Form.Item
                style={{ margin: '0 0 10px' }}
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập Email!',
                  },
                  {
                    pattern:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Vui lòng nhập đúng định dạng email!',
                  },
                ]}
              >
                <Input
                  // type="email"
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  placeholder=" Email"
                  size="large"
                />
              </Form.Item>
              <Form.Item
                name="username"
                style={{ margin: '0 0 10px' }}
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập tên đăng nhập!',
                  },
                  {
                    min: 8,
                    message: 'Tên đăng nhập tối thiếu 8 ký tự',
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Tên đăng nhập"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="fullName"
                style={{ margin: '0 0 10px' }}
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập họ và tên!',
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Họ và tên"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="password"
                style={{ margin: '0 0 10px' }}
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập Mật khẩu!',
                  },
                  {
                    pattern:
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                    message:
                      'Mật khẩu tối thiểu tám ký tự, ít nhất một chữ cái, một số và một ký tự đặc biệt',
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder=" Mật khẩu"
                  size="large"
                />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                style={{ margin: '0 0 10px' }}
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng xác nhận lại mật khẩu!',
                  },
                  {
                    pattern:
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                    message:
                      'Mật khẩu tối thiểu tám ký tự, ít nhất một chữ cái, một số và một ký tự đặc biệt',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error('Hai mật khẩu bạn đã nhập không khớp!')
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder=" Xác nhận lại mật khẩu"
                  size="large"
                />
              </Form.Item>
              <Form.Item className="signup__form-catag">
                <Form.Item name="host-checked" valuePropName="checked" noStyle>
                  <div>
                    <Checkbox
                      checked={termCheckbox}
                      onChange={(e: any) => setTermCheckbox(e.target.checked)}
                    >
                      Đồng ý với các {''}
                      <a
                        href="https://drive.google.com/file/d/1aWnHu1TxjZGsrq6ucu_HSRsJdPWuS1VG/view"
                        target="_blank"
                      >
                        Điều khoản và điều kiện.
                      </a>
                      Hola House sẽ xử lý dữ liệu cá nhân của bạn theo {''}
                      <a
                        href="https://drive.google.com/file/d/1OcOdpqhfgTR3gm5S2zwCKVJzlAVCWqG9/view"
                        target="_blank"
                      >
                        Chính sách Bảo mật
                      </a>
                    </Checkbox>
                  </div>
                </Form.Item>
              </Form.Item>

              <div
                className={
                  state?.dataResponse?.code === '200'
                    ? 'color-success mt-10'
                    : 'color-error mt-10'
                }
              >
                {state?.message}
              </div>

              <Form.Item className="button-form">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  size="large"
                  disabled={!termCheckbox}
                  loading={state?.loading}
                >
                  Đăng ký
                </Button>
                <Button
                  htmlType="submit"
                  className="login-form-button"
                  size="large"
                  style={{ backgroundColor: '#f5f5f5' }}
                >
                  <GoogleLoginComponent
                    title="Đăng ký"
                    disabled={termCheckbox}
                    tabs={tabs === 'Tenant' ? 'Tenant' : 'Landlord'}
                  />
                </Button>
              </Form.Item>
            </Form>
          </Row>

          <Row className="signup__form-signup">
            <Row className="account">Bạn đã có tài khoản? &nbsp;</Row>
            <Link to="/sign-in" className="signupp">
              Đăng nhập
            </Link>
          </Row>
          <Row
            className={`signup__account-type ${
              tabs === 'Tenant' ? 'tenant_slide' : 'landlord_slide'
            }`}
          >
            <AccountType type={tabs} />
          </Row>
        </Row>
      </Row>
    </Fragment>
  );
};
