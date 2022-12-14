import { UnlockOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Popconfirm, Radio, Tag } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { unlockAccountRequest } from 'app/pages/admin/admin-account-management-page/screen/action';
import {
  clearMsgUpdate,
  clearState,
  getUserInfoRequest,
  updateUserInfoRequest,
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
    return () => {
      dispatch(clearMsgUpdate(''));
    };
  }, []);

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

  const confirmUnLockAccount = (userId) => {
    dispatch(unlockAccountRequest({ id: userId }));
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
          Thay ?????i th??ng tin c?? nh??n
        </h3>
      </div>
      {!state?.userInfo?.active &&
      state?.userInfo &&
      Object.keys(state?.userInfo)?.length > 0 ? (
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            padding: '20px 30px',
            boxShadow:
              'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
            borderRadius: 5,
          }}
        >
          {!state?.loadingGetUser && state?.userInfo ? (
            <div>
              <div className="color-error">T??i kho???n ??ang b??? kho??</div>
              <TextArea
                className="mt-10"
                style={{ width: '400px' }}
                value={state?.userInfo?.note}
                rows={4}
                readOnly
              />

              <div>
                <Popconfirm
                  placement="topRight"
                  title={`M??? kh??a t??i kho???n "${state?.userInfo?.username}"?`}
                  onConfirm={() => {
                    confirmUnLockAccount(state?.userInfo?.id);
                  }}
                  className="mt-10"
                  okText="X??c nh???n"
                  cancelText="Hu???"
                >
                  <Tag
                    color="green"
                    style={{ padding: '3px 5px', width: 80, cursor: 'pointer' }}
                  >
                    <UnlockOutlined className="mr-5" />
                    M??? Kh??a
                  </Tag>
                </Popconfirm>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      ) : (
        ''
      )}
      <div style={{ padding: '30px 45px' }}>
        <Form
          name="basic"
          form={form}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="H??? v?? t??n"
            name="fullName"
            rules={[{ required: true, message: 'Vui l??ng nh???p h???c v?? t??n!' }]}
          >
            <Input
              style={{ width: '325px' }}
              disabled={state?.userInfo?.active ? false : true}
            />
          </Form.Item>

          <Form.Item label="Ng??y sinh" name="dob">
            <DatePicker
              style={{ width: '325px' }}
              format={dateFormat}
              disabled={state?.userInfo?.active ? false : true}
            />
          </Form.Item>

          <Form.Item label="Gi???i t??nh" name="gender">
            <Radio.Group disabled={state?.userInfo?.active ? false : true}>
              <Radio value={true}>Nam</Radio>
              <Radio value={false}>N???</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="T??n t??i kho???n"
            name="username"
            rules={[
              { required: true, message: 'Vui l??ng nh???p t??n t??i kho???n!' },
              {
                min: 8,
                message: 'T??n t??i kho???n t???i thi???u 8 k?? t???',
              },
            ]}
          >
            <Input
              style={{ width: '325px' }}
              disabled={state?.userInfo?.active ? false : true}
            />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Vui l??ng nh???p email!' }]}
          >
            <Input
              style={{ width: '325px', backgroundColor: '#EFEFEF' }}
              readOnly={true}
              disabled={state?.userInfo?.active ? false : true}
            />
          </Form.Item>

          <Form.Item
            label="S??? ??i???n tho???i"
            name="phoneNumber"
            rules={[
              { required: true, message: 'Vui l??ng nh???p s??? ??i???n tho???i!' },
              {
                pattern: validatePatternPhoneNumber,
                message: 'Vui l??ng nh???p ????ng ?????nh d???ng s??? ??i???n tho???i',
              },
            ]}
          >
            <Input
              style={{ width: '325px' }}
              disabled={state?.userInfo?.active ? false : true}
            />
          </Form.Item>

          <Form.Item label="CCCD / CMND" name="cccd">
            <Input
              style={{ width: '325px' }}
              disabled={state?.userInfo?.active ? false : true}
            />
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

          {props?.role === 'admin' && !state?.userInfo?.active ? (
            ''
          ) : (
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
              L??u l???i
            </Button>
          )}
        </Form>
      </div>
    </Fragment>
  );
};
