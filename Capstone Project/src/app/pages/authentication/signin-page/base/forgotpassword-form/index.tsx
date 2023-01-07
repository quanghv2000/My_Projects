import { Button, Form, Input, Modal, Row, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Fragment } from 'react';
import { forgotPasswordRequest } from 'app/pages/authentication/signin-page/screen/action';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'types/RootState';
import './style.scss';

export interface ForgotPasswordFormProps {
  visibleModal: boolean;
  confirmLoading: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
  },
};

export const ForgotPasswordForm = ({
  visibleModal,
  confirmLoading,
  handleOk,
  handleCancel,
}: ForgotPasswordFormProps) => {
  const { Paragraph } = Typography;

  const dispatch = useDispatch();

  const state = useSelector((state: RootState) => state?.signInReducer);

  const onFinishFormEmail = (values: any) => {
    dispatch(forgotPasswordRequest(values?.email));
  };

  return (
    <Fragment>
      <Row className="modal-container">
        <Modal
          title="Quên mật khẩu"
          visible={visibleModal}
          confirmLoading={confirmLoading}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button
              key="submit"
              type="primary"
              loading={state?.loadingForgotPass}
              htmlType="submit"
              className="login-form-button"
              form="form-email"
              // onClick={handleOk}
              size="large"
              block
            >
              Cài lại mật khẩu
            </Button>,
          ]}
        >
          <Paragraph className="text-desc">
            "Vui lòng nhập địa chỉ email của bạn"
          </Paragraph>

          <Form
            name="nest-messages"
            onFinish={onFinishFormEmail}
            validateMessages={validateMessages}
            id="form-email"
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Vui lòng nhập email!' },
                {
                  pattern:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Vui lòng nhập đúng định dạng email!',
                },
              ]}
            >
              <Input
                type="email"
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
                size="large"
              />
            </Form.Item>
            <div className={'color-success mt-10'}>
              {state?.messageForgotPass}
            </div>
          </Form>
        </Modal>
      </Row>
    </Fragment>
  );
};
