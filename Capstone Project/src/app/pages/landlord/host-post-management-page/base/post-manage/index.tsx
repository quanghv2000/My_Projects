import { Button, Col, DatePicker, Form, Input, Row } from 'antd';
import { PostTab } from 'app/pages/landlord/host-post-management-page/base/post-tab/index';
import 'app/pages/landlord/landlord-house-page/base/house-data-table/style.scss';
import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import PostCreate from '../post-create';
import {
  clearMsg,
  searchPostRequest,
} from 'app/pages/landlord/host-post-management-page/screen/action';
import moment from 'moment';
const dateFormat = 'DD/MM/YYYY';

export const PostManage: React.FC<any> = () => {
  const dispatch = useDispatch();
  const [isModalCreateVisible, setIsModalCreateVisible] = useState(false);

  const onFinish = (values: any) => {
    const body = {
      postCode: values?.postCode ? values?.postCode : '',
      username: values?.username ? values?.username : '',
      fullname: values?.fullname ? values?.fullname : '',
      fromDateStr: values?.startDate
        ? moment(values?.startDate)?.format('YYYY-MM-DD 00:00:00')
        : '',
      toDateStr: values?.endDate
        ? moment(values?.endDate)?.format('YYYY-MM-DD 23:59:59')
        : '',
    };
    dispatch(searchPostRequest(body));
  };

  return (
    <Fragment>
      <PostCreate
        title="Đăng tin mới"
        keyModal="create"
        isModalCreateVisible={isModalCreateVisible}
        setIsModalCreateVisible={(visibale) =>
          setIsModalCreateVisible(visibale)
        }
      />
      <div>
        <h3
          style={{
            textTransform: 'uppercase',
            fontWeight: 'bold',
            color: '#1CA4DA',
            marginBottom: 20,
          }}
        >
          Danh sách tin
        </h3>
        <div
          className="mb-20 mt-10"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 30,
          }}
        >
          <Form
            name="basic"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
            style={{ display: ' flex', width: '100%' }}
          >
            <Col
              xs={24}
              xl={24}
              style={{
                width: '100%',
                padding: '20px 30px',
                boxShadow:
                  'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
                borderRadius: 5,
                marginLeft: 1,
              }}
            >
              <Row
                style={{
                  width: ' 100%',
                }}
              >
                <Col xs={8} xl={7} style={{ padding: '0px 10px' }}>
                  <Form.Item name="postCode" label="Mã bài đăng">
                    <Input
                      style={{ width: '100%' }}
                      placeholder="Mã bài đăng"
                      allowClear
                    />
                  </Form.Item>
                </Col>
                <Col xs={8} xl={7} style={{ padding: '0px 10px' }}>
                  <Form.Item name="startDate" label="Ngày đăng">
                    <DatePicker
                      placeholder="Ngày đăng"
                      style={{ width: '100%' }}
                      format={dateFormat}
                    />
                  </Form.Item>
                </Col>
                <Col xs={8} xl={7} style={{ padding: '0px 10px' }}>
                  <Form.Item name="endDate" label="Ngày hết hạn">
                    <DatePicker
                      placeholder="Ngày hết hạn"
                      style={{ width: '100%' }}
                      format={dateFormat}
                    />
                  </Form.Item>
                </Col>
                <Col
                  xs={8}
                  xl={3}
                  style={{ padding: '0px 10px', marginTop: 30 }}
                >
                  <Button htmlType="submit" className="mt-20" type="primary">
                    Tìm kiếm
                  </Button>
                </Col>
              </Row>
            </Col>
          </Form>
          <div>
            {/* <Button
            className="ml-20"
            style={{
              backgroundColor: '#fa8c16',
              borderColor: '#fa8c16',
              color: 'white',
            }}
          >
            <i className="fa-solid fa-users mr-5"></i> Khách thuê
          </Button> */}
            <Button
              className="ml-20"
              style={{
                backgroundColor: '#13c2c2',
                borderColor: '#13c2c2',
                color: 'white',
                fontWeight: 'bold',
              }}
              onClick={() => {
                dispatch(clearMsg(''));
                setIsModalCreateVisible(true);
              }}
            >
              <i className="fab fa-wpforms" style={{ marginRight: 8 }}></i> Đăng
              tin
            </Button>
            {/* <Button
              className="ml-20"
              style={{
                backgroundColor: '#389e0d',
                borderColor: '#389e0d',
                color: 'white',
              }}
              // onClick={() => history.push('/host/room/create')}
            >
              <i className="fa-solid fa-house mr-5"></i> Thêm phòng
            </Button> */}
          </div>
        </div>
        <PostTab />
      </div>
    </Fragment>
  );
};
