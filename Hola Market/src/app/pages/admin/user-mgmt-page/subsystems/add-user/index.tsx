import React from 'react';
import { Checkbox, Form, Input } from 'antd';
import { AppButton } from 'app/components';

export const AdminAddUserPage: React.FC<any> = () => {
  const [autoFillUsername, setAutoFillUsername] = React.useState<boolean>(true);
  return (
    <>
      <Checkbox
        checked={autoFillUsername}
        onChange={e => setAutoFillUsername(e.target.checked)}
      >
        Tự động điền tên tài khoản theo Họ & tên
      </Checkbox>
      <Form labelCol={{ span: 3 }} wrapperCol={{ span: 7 }} className="pt-30">
        <Form.Item
          name="username"
          label="Tên tài khoản"
          rules={[{ required: true, message: 'Vui lòng nhập Tên tài khoản!' }]}
        >
          <Input disabled={autoFillUsername} />
        </Form.Item>
        <Form.Item
          name="fullName"
          label="Họ & tên"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập Họ & tên!',
            },
          ]}
        >
          <Input placeholder="Nhập họ và tên" />
        </Form.Item>
        <Form.Item label="Email">
          <Input placeholder="Nhập email" required />
        </Form.Item>
        <Form.Item label="Số điện thoại">
          <Input placeholder="Nhập số điện thoại" />
        </Form.Item>
        <Form.Item>
          <AppButton type="add" text="Tạo tài khoản" />
        </Form.Item>
      </Form>
    </>
  );
};
