import { Button, Col, Drawer, Form, Input, Radio, Row, Space } from 'antd';
import React from 'react';

export interface RegisterBeLandlordsProps {
  onCloseDrawer: () => void;
  visible: boolean;
}

export default function RegisterBeLandlords({
  onCloseDrawer,
  visible,
}: RegisterBeLandlordsProps) {
  const [form] = Form.useForm();

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  };

  return (
    <Drawer
      title="Đăng ký làm chủ nhà"
      placement="right"
      size="default"
      closable={false}
      onClose={onCloseDrawer}
      visible={visible}
      key="right"
      extra={
        <Space>
          <Button type="primary" onClick={onCloseDrawer}>
            Đăng ký
          </Button>
        </Space>
      }
    >
      {/* <Space size="middle"> */}
      <Row className="form-register-be-landlords">
        <Col span={24}>
          <Form
            {...formItemLayout}
            form={form}
            size="large"
            className="layout-form"
            layout="vertical"
          >
            <Form.Item label="CMND Số">
              <Input
                placeholder=""
                size="large"
                style={{ maxWidth: '345px !important' }}
              />
            </Form.Item>
            <Form.Item label="Nơi thường trú">
              <Input placeholder="" />
            </Form.Item>
            <Form.Item label="Hộ chiếu số">
              <Input placeholder="" />
            </Form.Item>
            <Form.Item label="Chỗ ở hiện nay">
              <Input placeholder="" />
            </Form.Item>
          </Form>
        </Col>
      </Row>

      {/* </Space> */}
    </Drawer>
  );
}
