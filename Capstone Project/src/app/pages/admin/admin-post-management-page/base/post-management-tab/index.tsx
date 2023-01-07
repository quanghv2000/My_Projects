import {
  Tabs,
  Spin,
  Form,
  Button,
  Input,
  Badge,
  Col,
  Row,
  DatePicker,
} from 'antd';
import React, { Fragment, useState, useEffect } from 'react';
import { RootState } from 'types/RootState';
import { ScrollToTop } from 'hooks/scroll-to-top';
import { useSelector, useDispatch } from 'react-redux';
import { PostListManagementTable } from 'app/pages/admin/admin-post-management-page/base/post-list-table';
import { PostListManagementVerifyTable } from 'app/pages/admin/admin-post-management-page/base/post-list-table-verify';
import moment from 'moment';
import { searchPostRequest } from 'app/pages/admin/admin-post-management-page/screen/action';
const { TabPane } = Tabs;
const dateFormat = 'DD/MM/YYYY';

export const PostManagementTab: React.FC<any> = () => {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState('');
  const state = useSelector(
    (state: RootState) => state?.adminPostManagmentReducer
  );

  const dataIsShowing = (data: any) => {
    let newArray: any = [];
    data?.map((item: any) => {
      if (
        item?.status === 'CENSORED' &&
        moment(item?.endDate) > moment() &&
        moment(item?.startDate) < moment()
      ) {
        newArray.push(item);
      }
    });
    return newArray;
  };

  const dataWaitingForShowing = (data: any) => {
    let newArray: any = [];
    data?.map((item: any) => {
      if (
        item?.status === 'CENSORED' &&
        moment(item?.startDate) > moment() &&
        moment(item?.endDate) > moment()
      ) {
        newArray.push(item);
      }
    });
    return newArray;
  };

  const dataExpired = (data: any) => {
    let newArray: any = [];
    data?.map((item: any) => {
      if (moment(item?.endDate) <= moment() && item?.status === 'CENSORED') {
        newArray.push(item);
      }
    });
    return newArray;
  };

  const dataUncensor = (data: any) => {
    let newArray: any = [];
    data?.map((item: any) => {
      if (item?.status === 'UNCENSORED') {
        newArray.push(item);
      }
    });
    return newArray;
  };

  const dataCancel = (data: any) => {
    let newArray: any = [];
    data?.map((item: any) => {
      if (item?.status === 'REJECTED') {
        newArray.push(item);
      }
    });
    return newArray;
  };

  // bài đăng bị gỡ
  const dataDelete = (data: any) => {
    let newArray: any = [];
    data?.map((item: any) => {
      if (item?.status === 'DELETED') {
        newArray.push(item);
      }
    });
    return newArray;
  };

  // xác minh bài đăng chờ
  const dataVerify = (data: any) => {
    let newArray: any = [];
    data?.map((item: any) => {
      if (item?.verify === 'WAITING') {
        newArray.push(item);
      }
    });
    return newArray;
  };

  // xác minh bài đăng
  const dataVerified = (data: any) => {
    let newArray: any = [];
    data?.map((item: any) => {
      if (item?.verify === 'VERIFIED') {
        newArray.push(item);
      }
    });
    return newArray;
  };

  // xác minh bài đăng bị huỷ
  const dataVerifyReject = (data: any) => {
    let newArray: any = [];
    data?.map((item: any) => {
      if (item?.verify === 'VERIFIED_AGAIN') {
        newArray.push(item);
      }
    });
    return newArray;
  };

  const callback = (key) => {};

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
      <ScrollToTop />
      <div
        className="mb-20 mt-10"
        // style={{ display: 'flex', justifyContent: 'space-between' }}
      >
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
        </div>
        <div
          className="mt-10"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            marginBottom: 40,
          }}
        >
          <Form
            name="search"
            // labelCol={{ span: 8 }}
            // wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            layout="vertical"
            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
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
                <Col xs={8} xl={4} style={{ padding: '0px 10px' }}>
                  <Form.Item name="postCode" label="Mã bài đăng">
                    <Input
                      style={{ width: '100%' }}
                      placeholder="Mã bài đăng"
                      allowClear
                    />
                  </Form.Item>
                </Col>
                <Col xs={8} xl={4} style={{ padding: '0px 10px' }}>
                  <Form.Item name="fullname" label="Người đăng">
                    <Input
                      style={{ width: '100%' }}
                      placeholder="Người đăng"
                      allowClear
                    />
                  </Form.Item>
                </Col>
                <Col xs={8} xl={4} style={{ padding: '0px 10px' }}>
                  <Form.Item name="username" label="Tên tài khoản">
                    <Input
                      style={{ width: '100%' }}
                      placeholder="Tên tài khoản"
                      allowClear
                    />
                  </Form.Item>
                </Col>
                <Col xs={8} xl={4} style={{ padding: '0px 10px' }}>
                  <Form.Item name="startDate" label="Ngày đăng">
                    <DatePicker
                      placeholder="Ngày đăng"
                      style={{ width: '100%' }}
                      format={dateFormat}
                    />
                  </Form.Item>
                </Col>
                <Col xs={8} xl={4} style={{ padding: '0px 10px' }}>
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
                  xl={4}
                  style={{ padding: '0px 10px', marginTop: 30 }}
                >
                  <Button htmlType="submit" className="mt-20" type="primary">
                    Tìm kiếm
                  </Button>
                </Col>
              </Row>
            </Col>
          </Form>
          <div></div>
        </div>
      </div>
      <Spin spinning={false} delay={100}>
        <Tabs onChange={callback} type="card">
          <TabPane
            tab={`Tất cả (${
              state?.dataResponse?.length > 0 ? state?.dataResponse?.length : 0
            })`}
            key={'all'}
          >
            <PostListManagementTable
              data={state?.dataResponse?.length > 0 ? state?.dataResponse : []}
            />
          </TabPane>
          <TabPane
            tab={`Đang hiển thị (${
              state?.dataResponse?.length > 0
                ? dataIsShowing(state?.dataResponse)?.length
                : 0
            })`}
            key={'isShowing'}
          >
            <PostListManagementTable
              data={
                state?.dataResponse?.length > 0
                  ? dataIsShowing(state?.dataResponse)
                  : []
              }
            />
          </TabPane>
          <TabPane
            tab={`Chờ hiển thị (${
              state?.dataResponse.length > 0
                ? dataWaitingForShowing(state?.dataResponse)?.length
                : 0
            })`}
            key={'waiting_for_showing'}
          >
            <PostListManagementTable
              data={
                state?.dataResponse?.length > 0
                  ? dataWaitingForShowing(state?.dataResponse)
                  : []
              }
            />
          </TabPane>
          <TabPane
            tab={`Chờ kiểm duyệt (${
              state?.dataResponse?.length > 0
                ? dataUncensor(state?.dataResponse)?.length
                : 0
            })`}
            key={'uncensor'}
          >
            {' '}
            <PostListManagementTable
              data={
                state?.dataResponse?.length > 0
                  ? dataUncensor(state?.dataResponse)
                  : []
              }
            />
          </TabPane>
          <TabPane
            tab={`Hết hạn (${
              state?.dataResponse?.length > 0
                ? dataExpired(state?.dataResponse)?.length
                : 0
            })`}
            key={'expired'}
          >
            {' '}
            <PostListManagementTable
              data={
                state?.dataResponse?.length > 0
                  ? dataExpired(state?.dataResponse)
                  : []
              }
            />
          </TabPane>
          <TabPane
            tab={`Huỷ bỏ (${
              state?.dataResponse?.length > 0
                ? dataCancel(state?.dataResponse)?.length
                : 0
            })`}
            key={'cancel'}
          >
            {' '}
            <PostListManagementTable
              data={
                state?.dataResponse?.length > 0
                  ? dataCancel(state?.dataResponse)
                  : []
              }
            />
          </TabPane>

          <TabPane
            tab={`Gỡ bài đăng(${
              state?.dataResponse?.length > 0
                ? dataDelete(state?.dataResponse)?.length
                : 0
            })`}
            key={'delete'}
          >
            {' '}
            <PostListManagementTable
              data={
                state?.dataResponse?.length > 0
                  ? dataDelete(state?.dataResponse)
                  : []
              }
            />
          </TabPane>

          {/* chờ xác thực */}

          <TabPane
            tab={
              <Badge
                status="success"
                text={`Đã xác thực (${
                  state?.dataResponse?.length > 0
                    ? dataVerified(state?.dataResponse)?.length
                    : 0
                })`}
              />
            }
            key={'verified'}
          >
            {' '}
            <PostListManagementVerifyTable
              data={
                state?.dataResponse?.length > 0
                  ? dataVerified(state?.dataResponse)
                  : []
              }
            />
          </TabPane>

          <TabPane
            tab={
              <Badge
                status="warning"
                text={` Chờ xác thực (${
                  state?.dataResponse?.length > 0
                    ? dataVerify(state?.dataResponse)?.length
                    : 0
                })`}
              />
            }
            key={'verify-waiting'}
          >
            {' '}
            <PostListManagementVerifyTable
              data={
                state?.dataResponse?.length > 0
                  ? dataVerify(state?.dataResponse)
                  : []
              }
            />
          </TabPane>

          <TabPane
            tab={
              <Badge
                status="processing"
                text={`Yêu cầu xác thực lại (${
                  state?.dataResponse?.length > 0
                    ? dataVerifyReject(state?.dataResponse)?.length
                    : 0
                })`}
              />
            }
            key={'verify-reject'}
          >
            {' '}
            <PostListManagementVerifyTable
              data={
                state?.dataResponse?.length > 0
                  ? dataVerifyReject(state?.dataResponse)
                  : []
              }
            />
          </TabPane>
        </Tabs>
      </Spin>
    </Fragment>
  );
};
