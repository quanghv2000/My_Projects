import {
  Modal,
  Select,
  Form,
  Row,
  Col,
  Input,
  Button,
  DatePicker,
  Radio,
  message,
} from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'types/RootState';
import { LockOutlined } from '@ant-design/icons';
import {
  roleData,
  renderOptionSelect,
} from 'app/pages/admin/admin-account-management-page/base/account-create-modal/template';
import {
  createNewAccountRequest,
  getDataAccountRequest,
  clearStateAdminAccount,
} from 'app/pages/admin/admin-account-management-page/screen/action';
import { validatePatternPhoneNumber } from 'utils/validate';

const dateFormat = 'DD/MM/YYYY';

const AccountCreateModal = (props) => {
  const state = useSelector(
    (state: RootState) => state?.adminAccountPageReducer
  );

  const dispatch = useDispatch();
  const onFinish = (values: any) => {
    const date = new Date(values?.dob);
    let role = {};
    // format role
    roleData?.map((item: any) => {
      if (item?.id === values?.role) {
        role = {
          id: item?.id,
          role: item?.role,
        };
      }
    });
    const body = {
      role: role,
      cccd: values?.cccd,
      email: values?.email,
      dob: date?.getTime(),
      fullName: values?.fullName,
      gender: values?.gender,
      phoneNumber: values?.phoneNumber,
      username: values?.username,
      password: values?.password,
    };

    dispatch(createNewAccountRequest(body));
  };

  useEffect(() => {
    if (state?.msgCreateAcc === 'created') {
      props.setIsModalCreateVisible(false);
      message.success('Thêm mới tài khoản thành công');
      const body = {
        isActive: '2',
        fullname: '',
        username: '',
        fromDateStr: '',
        toDateStr: '',
      };
      dispatch(getDataAccountRequest(body));
      dispatch(clearStateAdminAccount(''));
    }
  }, [state?.msgCreateAcc]);

  return (
    <>
      <Modal
        title="Thêm mới tài khoản"
        visible={props.isModalCreateVisible}
        onCancel={() => props.setIsModalCreateVisible(false)}
        footer={null}
        cancelText="Đóng"
        okText="Sửa"
        width="750px"
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Row>
            <Col sm={12} style={{ padding: '0px 10px' }}>
              <Form.Item
                label="Vai trò"
                name="role"
                rules={[
                  {
                    required: true,
                    message: 'Nhập vai trò của tài khoản!',
                  },
                ]}
              >
                <Select
                  showSearch
                  style={{ width: '100%' }}
                  placeholder="Chọn vai trò của tài khoản"
                >
                  {renderOptionSelect(roleData)}
                </Select>
              </Form.Item>
            </Col>
            <Col sm={12} style={{ padding: '0px 10px' }}>
              <Form.Item
                name="fullName"
                label="Họ & Tên"
                rules={[
                  {
                    required: true,
                    message: 'Nhập họ & Tên!',
                  },
                ]}
              >
                <Input style={{ width: '100%' }} placeholder="Nhập họ & Tên" />
              </Form.Item>
            </Col>
          </Row>

          {/* new Row */}
          <Row>
            <Col sm={12} style={{ padding: '0px 10px' }}>
              <Form.Item
                name="username"
                label="Tên tài khoản"
                rules={[
                  {
                    required: true,
                    message: 'Nhập tên tài khoản',
                  },
                  {
                    min: 8,
                    message: 'Tên đăng nhập tối thiếu 8 ký tự',
                  },
                ]}
              >
                <Input
                  style={{ width: '100%' }}
                  placeholder="Nhập tên tài khoản!"
                />
              </Form.Item>
            </Col>
            <Col sm={12} style={{ padding: '0px 10px' }}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: 'Nhập email!',
                  },
                  {
                    pattern:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Vui lòng nhập đúng định dạng email!',
                  },
                ]}
              >
                <Input
                  type={'email'}
                  style={{ width: '100%' }}
                  placeholder="Nhập email"
                />
              </Form.Item>
            </Col>
          </Row>

          {/* new Row */}
          <Row>
            <Col sm={12} style={{ padding: '0px 10px' }}>
              <Form.Item name="dob" label="Ngày sinh">
                <DatePicker
                  placeholder="Nhập ngày sinh"
                  style={{ width: '325px' }}
                  format={dateFormat}
                />
              </Form.Item>
            </Col>
            <Col sm={12} style={{ padding: '0px 10px' }}>
              <Form.Item name="gender" label="Giới tính">
                <Radio.Group>
                  <Radio value={true}>Nam</Radio>
                  <Radio value={false}>Nữ</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>

          {/* new Row */}
          <Row>
            <Col sm={12} style={{ padding: '0px 10px' }}>
              <Form.Item
                name="phoneNumber"
                label="Số điện thoại"
                rules={[
                  {
                    pattern: validatePatternPhoneNumber,
                    message: 'Vui lòng nhập đúng định dạng số điện thoại',
                  },
                ]}
              >
                <Input
                  style={{ width: '100%' }}
                  placeholder="Nhập số điện thoại"
                />
              </Form.Item>
            </Col>
            <Col sm={12} style={{ padding: '0px 10px' }}>
              <Form.Item name="cccd" label="CCCD / CMND">
                <Input
                  style={{ width: '100%' }}
                  placeholder="Nhập CCCD / CMND"
                />
              </Form.Item>
            </Col>
          </Row>

          {/* new Row */}
          <Row>
            <Col sm={12} style={{ padding: '0px 10px' }}>
              <Form.Item
                label="Mật khẩu"
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
                  style={{ width: '100%' }}
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder=" Mật khẩu"
                />
              </Form.Item>
            </Col>
            <Col sm={12} style={{ padding: '0px 10px' }}>
              <Form.Item
                label="Xác nhận mật khẩu"
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
                  style={{ width: '100%' }}
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder=" Mật khẩu"
                />
              </Form.Item>
            </Col>
          </Row>

          <div className={'color-error mt-10 ml-10'}>
            {state?.msgErrorCreate}
          </div>

          <Row style={{ width: '100%', marginTop: 10 }}>
            <div
              style={{
                padding: '0px 10px',
                display: 'flex',
                justifyContent: 'flex-end',
                width: '100%',
              }}
            >
              <Button
                className="mr-10"
                onClick={() => props.setIsModalCreateVisible(false)}
              >
                Đóng
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={state.btnCreateAcc}
              >
                Tạo
              </Button>
            </div>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default AccountCreateModal;
