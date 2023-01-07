import { EditOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
} from 'antd';
import { Fragment, useState } from 'react';

import RegisterBeLandlords from 'app/pages/user/settings-account-page/base/account-information/base/register-be-landloards';

import './style.scss';

export type UserType = {
  imageLink?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  dob?: string;
  username?: string;
  role?: object;
};

export interface AccountInformationProps {
  userInfor?: any;
}

export default function AccountInformation({
  userInfor,
}: AccountInformationProps) {
  const userInformation: UserType = JSON.parse(userInfor);

  const [avatarUrl, setAvatarUrl] = useState('');
  const [visibleDrawer, setVisibleDrawer] = useState(false);

  const showDrawerRegisterLandlords = () => {
    setVisibleDrawer(true);
  };

  const onCloseDrawerRegisterLandlords = () => {
    setVisibleDrawer(false);
  };

  const handleOnChangeAvatar = (props: any) => (event) => {
    event.preventDefault();

    if (props === 'img') {
      let url = URL.createObjectURL(event.target.files[0]);
      setAvatarUrl(url);
    }
  };

  const onFinish = (values: any) => {};

  const onFinishFailed = (errorInfo: any) => {};

  return (
    <Fragment>
      {userInfor && userInfor.length > 0 ? (
        <Form
          name="form-user"
          // initialValues={initialFormValues}
          labelCol={{ span: 14 }}
          wrapperCol={{ span: 24 }}
          labelAlign="left"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Row className="account-informatio__container">
            <Row className="ai__wrap">
              <Form.Item
                className="ai-avatar"
                name="avatar"
                initialValue={userInformation?.imageLink}
              >
                <div>
                  <label>Ảnh đại diện</label>
                  <Avatar
                    alt="Avatar"
                    src={avatarUrl}
                    shape="square"
                    className="avt"
                    style={{
                      width: '150px',
                      height: '150px',
                    }}
                  />
                  <label
                    className="ai-avatar__camera"
                    htmlFor="icon-button-file"
                    onChange={handleOnChangeAvatar('img')}
                  >
                    <Input
                      accept="image/*"
                      id="icon-button-file"
                      type="file"
                      className="input_image"
                    />

                    <EditOutlined className="edit-icon" />
                  </label>
                </div>
              </Form.Item>

              <Row className="ai-username">
                <Form.Item
                  className="ai-username__name"
                  name="firstName"
                  initialValue={userInformation?.firstName}
                >
                  <div>
                    <label>Tên </label>
                    <br />
                    <Input
                      placeholder="Tên"
                      size="large"
                      defaultValue={userInformation?.firstName}
                      required
                    />
                  </div>
                </Form.Item>
                <Form.Item
                  className="ai-username__basedName"
                  name="lastName"
                  initialValue={userInformation?.lastName}
                >
                  <div>
                    <label>Họ và tên đệm </label>
                    <br />
                    <Input
                      placeholder="Họ và tên đệm"
                      size="large"
                      defaultValue={userInformation?.lastName}
                    />
                  </div>
                </Form.Item>
              </Row>
              <Form.Item
                className="ai-form__email"
                name="email"
                initialValue={userInformation?.email}
              >
                <div>
                  <label>Email </label>
                  <br />
                  <Input
                    placeholder="Email"
                    size="large"
                    defaultValue={userInformation?.email}
                    required
                  />
                </div>
              </Form.Item>

              <Form.Item
                className="ai-form__phone"
                name="phoneNumber"
                initialValue={userInformation?.phoneNumber}
              >
                <div>
                  <label>Số điện thoại </label>
                  <br />
                  <InputNumber
                    placeholder="Số điện thoại"
                    size="large"
                    className="phoneNumer"
                    defaultValue={userInformation?.phoneNumber}
                    required
                  />
                </div>
              </Form.Item>

              <Form.Item
                className="ai-form__dob"
                name="dob"
                initialValue={userInformation?.dob}
              >
                <div>
                  <label>Ngày Sinh </label> <br />
                  <br />
                  <DatePicker
                    // onChange={handleOnChangeDOB}
                    picker="date"
                    // onOk={onOk}
                    placeholder="Ngày sinh"
                    size="large"
                  />
                </div>
              </Form.Item>

              <Form.Item className="ai-button-submit">
                <Button type="primary" size="large" htmlType="submit">
                  Cập nhật
                </Button>
              </Form.Item>
            </Row>
          </Row>

          <Button
            className="register-be-landlords"
            onClick={showDrawerRegisterLandlords}
          >
            Đăng ký làm chủ nhà
          </Button>
        </Form>
      ) : (
        <div>No data</div>
      )}

      <RegisterBeLandlords
        onCloseDrawer={onCloseDrawerRegisterLandlords}
        visible={visibleDrawer}
      />
    </Fragment>
  );
}
