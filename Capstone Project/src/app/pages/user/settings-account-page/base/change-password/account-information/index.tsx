import React, { Fragment } from 'react';
import { Row, Form, Input, Button } from 'antd';
import { changePasswordRequest } from 'app/pages/user/settings-account-page/screen/action';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'types/RootState';
import './style.scss';

export interface ChangePasswordProps {}

export default function ChangePassword(props: ChangePasswordProps) {
  const dispatch = useDispatch();
  const onFinish = (values: any) => {
    const body = {
      oldPassword: values?.oldPassword,
      newPassword: values?.newPassword,
    };
    dispatch(changePasswordRequest(body));
  };

  const onFinishFailed = (errorInfo: any) => {
  };

  const state = useSelector((state: RootState) => state?.settingAccountReducer);

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  return (
    <Row>
      <Form
        name="form-change-password"
        labelCol={{ span: 32 }}
        wrapperCol={{ span: 46 }}
        initialValues={{ remember: true }}
        layout={'vertical'}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        // autoComplete="off"
        validateMessages={validateMessages}
        size={'large'}
      >
        <Form.Item
          label="Mật khẩu hiện tại"
          name="oldPassword"
          rules={[
            { required: true, message: 'Xin vui lòng nhập thông tin!' },
            {
              pattern:
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
              message:
                'Mật khẩu tối thiểu tám ký tự, ít nhất một chữ cái, một số và một ký tự đặc biệt',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Mật khẩu mới"
          name="newPassword"
          rules={[
            { required: true, message: 'Xin vui lòng nhập thông tin!' },
            {
              pattern:
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
              message:
                'Mật khẩu tối thiểu tám ký tự, ít nhất một chữ cái, một số và một ký tự đặc biệt',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Xác nhận mật khẩu mới"
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
          <Input.Password />
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

        <Form.Item>
          <Button loading={state?.loading} type="primary" htmlType="submit">
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </Row>
  );
}
