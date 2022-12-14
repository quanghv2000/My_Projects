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
              ????ng k??
            </Title>
            <Tabs
              defaultActiveKey="Tenant"
              size="large"
              onChange={onChangeTabs}
            >
              <TabPane
                tab={<div className="tabs-width">Ng?????i thu??</div>}
                key="Tenant"
              ></TabPane>
              <TabPane
                tab={<div className="tabs-width">Ch??? nh??</div>}
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
                    message: 'Vui l??ng nh???p Email!',
                  },
                  {
                    pattern:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Vui l??ng nh???p ????ng ?????nh d???ng email!',
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
                    message: 'Vui l??ng nh???p t??n ????ng nh???p!',
                  },
                  {
                    min: 8,
                    message: 'T??n ????ng nh???p t???i thi???u 8 k?? t???',
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="T??n ????ng nh???p"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="fullName"
                style={{ margin: '0 0 10px' }}
                rules={[
                  {
                    required: true,
                    message: 'Vui l??ng nh???p h??? v?? t??n!',
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="H??? v?? t??n"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="password"
                style={{ margin: '0 0 10px' }}
                rules={[
                  {
                    required: true,
                    message: 'Vui l??ng nh???p M???t kh???u!',
                  },
                  {
                    pattern:
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                    message:
                      'M???t kh???u t???i thi???u t??m k?? t???, ??t nh???t m???t ch??? c??i, m???t s??? v?? m???t k?? t??? ?????c bi???t',
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder=" M???t kh???u"
                  size="large"
                />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                style={{ margin: '0 0 10px' }}
                rules={[
                  {
                    required: true,
                    message: 'Vui l??ng x??c nh???n l???i m???t kh???u!',
                  },
                  {
                    pattern:
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                    message:
                      'M???t kh???u t???i thi???u t??m k?? t???, ??t nh???t m???t ch??? c??i, m???t s??? v?? m???t k?? t??? ?????c bi???t',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error('Hai m???t kh???u b???n ???? nh???p kh??ng kh???p!')
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder=" X??c nh???n l???i m???t kh???u"
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
                      ?????ng ?? v???i c??c {''}
                      <a
                        href="https://drive.google.com/file/d/1aWnHu1TxjZGsrq6ucu_HSRsJdPWuS1VG/view"
                        target="_blank"
                      >
                        ??i???u kho???n v?? ??i???u ki???n.
                      </a>
                      Hola House s??? x??? l?? d??? li???u c?? nh??n c???a b???n theo {''}
                      <a
                        href="https://drive.google.com/file/d/1OcOdpqhfgTR3gm5S2zwCKVJzlAVCWqG9/view"
                        target="_blank"
                      >
                        Ch??nh s??ch B???o m???t
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
                  ????ng k??
                </Button>
                <Button
                  htmlType="submit"
                  className="login-form-button"
                  size="large"
                  style={{ backgroundColor: '#f5f5f5' }}
                >
                  <GoogleLoginComponent
                    title="????ng k??"
                    disabled={termCheckbox}
                    tabs={tabs === 'Tenant' ? 'Tenant' : 'Landlord'}
                  />
                </Button>
              </Form.Item>
            </Form>
          </Row>

          <Row className="signup__form-signup">
            <Row className="account">B???n ???? c?? t??i kho???n? &nbsp;</Row>
            <Link to="/sign-in" className="signupp">
              ????ng nh???p
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
