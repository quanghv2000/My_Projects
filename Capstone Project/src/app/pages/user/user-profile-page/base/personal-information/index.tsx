import { Button, DatePicker, Form, Input, Radio } from 'antd';
import {
  clearState,
  getUserInfoRequest,
  updateUserInfoRequest,
  clearMsgUpdate,
} from 'app/pages/landlord/host-profile-page/screen/action';
import 'app/pages/landlord/landlord-house-page/base/house-data-table/style.scss';
import moment from 'moment';
import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'types/RootState';
import { validatePatternPhoneNumber } from 'utils/validate';
import './style.scss';

const dateFormat = 'DD/MM/YYYY';

export const PersonalInformationPage: React.FC<any> = (props: any) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const state = useSelector((state: RootState) => state?.hostProfileReducer);
  useEffect(() => {
    if (state?.userInfo) {
      form.setFieldsValue({
        fullName: state?.userInfo?.fullName,
        username: state?.userInfo?.username,
        email: state?.userInfo?.email,
        gender: state?.userInfo?.gender,
        dob: state?.userInfo?.dob
          ? moment(new Date(state?.userInfo?.dob).getDate(), 'DD/MM/YYYY')
          : null,
        phoneNumber: state?.userInfo?.phoneNumber,
        cccd: state?.userInfo?.cccd,
      });
    }
  }, [state?.userInfo]);
  useEffect(() => {
    if (state?.userInfo?.email) {
      form.setFieldsValue({
        email: state?.userInfo?.email,
      });
    }
  }, [state?.userInfo?.email]);

  useEffect(() => {
    if (state?.statusUpdateInfoUser === 'updated') {
      dispatch(clearState(''));
      if (props?.id) {
        dispatch(clearMsgUpdate(''));
      } else dispatch(getUserInfoRequest(''));
    }
  }, [state?.statusUpdateInfoUser]);

  const onFinish = (values: any) => {
    const date = new Date(values?.dob);
    const body = {
      id: state?.userInfo?.id,
      cccd: values?.cccd,
      email: values?.email,
      dob: date?.getTime(),
      fullName: values?.fullName,
      gender: values?.gender,
      phoneNumber: values?.phoneNumber,
      username: values?.username,
    };
    if (values) {
      dispatch(updateUserInfoRequest(body));
    }
  };

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
          Thay đổi thông tin cá nhân
        </h3>
      </div>
      <div style={{ padding: '30px 45px' }}>
        <Form
          name="basic"
          form={form}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Họ và tên"
            name="fullName"
            rules={[{ required: true, message: 'Vui lòng nhập học và tên!' }]}
          >
            <Input style={{ width: '325px' }} />
          </Form.Item>

          <Form.Item label="Ngày sinh" name="dob">
            <DatePicker style={{ width: '325px' }} format={dateFormat} />
          </Form.Item>

          <Form.Item label="Giới tính" name="gender">
            <Radio.Group>
              <Radio value={true}>Nam</Radio>
              <Radio value={false}>Nữ</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Tên tài khoản"
            name="username"
            rules={[
              { required: true, message: 'Vui lòng nhập tên tài khoản!' },
              {
                min: 8,
                message: 'Tên tài khoản tối thiếu 8 ký tự',
              },
            ]}
          >
            <Input style={{ width: '325px' }} />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
          >
            <Input
              style={{ width: '325px', backgroundColor: '#EFEFEF' }}
              readOnly={true}
            />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phoneNumber"
            rules={[
              { required: true, message: 'Vui lòng nhập số điện thoại!' },
              {
                pattern: validatePatternPhoneNumber,
                message: 'Vui lòng nhập đúng định dạng số điện thoại',
              },
            ]}
          >
            <Input style={{ width: '325px' }} />
          </Form.Item>

          <Form.Item label="CCCD / CMND" name="cccd">
            <Input style={{ width: '325px' }} />
          </Form.Item>

          <div
            className={
              state?.code === '200'
                ? 'color-success mt-10'
                : 'color-error mt-10'
            }
          >
            {state?.msgError}
          </div>

          <Button
            type="primary"
            htmlType="submit"
            style={{
              backgroundColor: '#1CA4DA',
              marginTop: '30px',
              fontWeight: 'bold',
            }}
            loading={state.btnUpdateInfoUser}
          >
            Lưu lại
          </Button>
        </Form>
      </div>
    </Fragment>
  );
};
