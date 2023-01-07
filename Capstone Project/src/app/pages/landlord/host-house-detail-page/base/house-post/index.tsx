import { Button, Form, Col, Select, Row, DatePicker } from 'antd';
import {
  postType,
  postDate,
} from 'app/pages/landlord/house-create-page/base/house-form-create/template';
import React, { Fragment } from 'react';
// import { useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';
// import { RootState } from 'types/RootState';
// import { useDispatch } from 'react-redux';

const { Option } = Select;

export const HousePost: React.FC<any> = (props: any) => {
  // const dispatch = useDispatch();
  const userInfoCookies = localStorage.getItem('user-info');
  // const userInfoCookies = getCookie('user-info');
  let userInfo: any;

  if (userInfoCookies) {
    userInfo = JSON.parse(userInfoCookies);
  }
  // const state = useSelector(
  //   (state: RootState) => state?.houseDetailPageReducer
  // );

  const [form] = Form.useForm();

  // const history = useHistory();
  // useEffect(() => {
  //   setKeyTab('1');
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const onFinish = (values: any) => {};
  const onFinishFailed = () => {};

  return (
    <Fragment>
      <Form
        name="basic"
        layout="vertical"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{
          width: ' 100%',
          padding: '20px 20px',
          display: 'flex',
          justifyContent: 'center',
          // display: 'flex',
          // justifyContent: 'center',
        }}
      >
        {/* right side room create */}
        <Col
          xs={24}
          xl={props?.page === 'house-list' ? 24 : 10}
          style={{
            width: '100%',
          }}
        >
          <div
            style={{
              boxShadow: 'rgb(0 0 0 / 15%) 0px 1px 4px',
              padding: '20px 30px',
              borderRadius: 5,
              marginBottom: 20,
            }}
          >
            {/* new row */}
            <Row style={{ display: 'flex', justifyContent: 'center' }}>
              <Col xs={24} xl={24} style={{ width: ' 100%' }}>
                <Form.Item name="name">
                  <p>Loại tin đăng</p>
                  <Select
                    showSearch
                    style={{ width: '100%' }}
                    placeholder="Loại tin đăng"
                  >
                    {postType.map((item: any, key: any) => {
                      return (
                        <Option key={key} value={item?.id}>
                          {item?.title}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            {/* new row */}
            <Row style={{ display: 'flex', justifyContent: 'center' }}>
              <Col xs={16} xl={12} style={{ width: ' 100%', paddingRight: 10 }}>
                <Form.Item
                  name="village"
                  className="flex"
                  style={{ display: 'flex' }}
                >
                  <p>
                    Số ngày đăng
                    <span style={{ color: '#ff4d4f' }}></span>
                  </p>
                  <Select
                    showSearch
                    style={{ width: '100%' }}
                    placeholder="Số ngày đăng"
                  >
                    {postDate.map((item: any, key: any) => {
                      return (
                        <Option key={key} value={item?.id}>
                          {item?.title}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={16} xl={12} style={{ width: ' 100%' }}>
                <Form.Item
                  name="village"
                  className="flex"
                  style={{ display: 'flex' }}
                >
                  <p>
                    Ngày bắt đầu
                    <span style={{ color: '#ff4d4f' }}></span>
                  </p>
                  <DatePicker
                    placeholder="Ngày bắt đầu"
                    style={{ width: '100%' }}
                    // onChange={onChange}
                    format="DD/MM/YYYY"
                  />
                </Form.Item>
              </Col>
            </Row>

            {/* new row */}
            <Row style={{ display: 'flex', justifyContent: 'center' }}>
              <Col
                xs={24}
                xl={24}
                style={{
                  width: ' 100%',
                  paddingRight: 10,
                  backgroundColor: '#edf7fe',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    padding: '10px 20px',
                    marginTop: 10,
                    borderRadius: '2px',
                  }}
                >
                  <Row style={{ width: ' 100%' }}>
                    <Col xs={24} xl={16}>
                      Đơn giá / ngày
                    </Col>
                    <Col xs={24} xl={8}>
                      2.727 VND
                    </Col>
                  </Row>
                  <Row style={{ width: ' 100%' }} className="mt-10">
                    <Col xs={24} xl={16}>
                      Số ngày đăng tin
                    </Col>
                    <Col xs={24} xl={8}>
                      10 ngày
                    </Col>
                  </Row>
                  <Row style={{ width: ' 100%' }} className="mt-10">
                    <Col xs={24} xl={16}>
                      Phí đăng tin
                    </Col>
                    <Col xs={24} xl={8}>
                      <p
                        style={{
                          color: 'rgb(150, 27, 18)',
                          fontWeight: ' bold',
                          fontSize: 15,
                        }}
                      >
                        27.270
                      </p>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>

            <div className="mt-50 flex justify-between">
              <p className="mt-10" />
              <Button
                style={{
                  backgroundColor: '#13c2c2',
                  borderColor: '#13c2c2',
                  color: 'white',
                }}
                htmlType="submit"
              >
                Đăng tin
              </Button>
            </div>
          </div>
        </Col>
      </Form>
    </Fragment>
  );
};
