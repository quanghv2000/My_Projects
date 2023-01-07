import { Spin, Tabs } from 'antd';
import { PostListTable } from 'app/pages/landlord/host-post-management-page/base/post-list-table/index';
import { ScrollToTop } from 'hooks/scroll-to-top';
import moment from 'moment';
import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'types/RootState';

const { TabPane } = Tabs;

export const PostTab: React.FC<any> = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state?.hostPostPageReducer);

  const callback = (key) => {};

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
      if (item?.status === 'UNCENSORED' && moment(item?.endDate) > moment()) {
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
  return (
    <Fragment>
      <ScrollToTop />
      <Spin spinning={false} delay={100}>
        <Tabs onChange={callback} type="card">
          <TabPane
            tab={`Tất cả (${
              state?.dataResponse?.length > 0 ? state?.dataResponse?.length : 0
            })`}
            key={'all'}
          >
            <PostListTable
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
            <PostListTable
              data={
                state?.dataResponse?.length > 0
                  ? dataIsShowing(state?.dataResponse)
                  : []
              }
            />
          </TabPane>
          <TabPane
            tab={`Chờ hiển thị (${
              state?.dataResponse?.length > 0
                ? dataWaitingForShowing(state?.dataResponse)?.length
                : 0
            })`}
            key={'waiting_for_showing'}
          >
            <PostListTable
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
            <PostListTable
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
            <PostListTable
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
            <PostListTable
              data={
                state?.dataResponse?.length > 0
                  ? dataCancel(state?.dataResponse)
                  : []
              }
            />
          </TabPane>
          <TabPane
            tab={`Bài đăng bị gỡ (${
              state?.dataResponse?.length > 0
                ? dataDelete(state?.dataResponse)?.length
                : 0
            })`}
            key={'delete'}
          >
            {' '}
            <PostListTable
              data={
                state?.dataResponse?.length > 0
                  ? dataDelete(state?.dataResponse)
                  : []
              }
            />
          </TabPane>
        </Tabs>
      </Spin>
    </Fragment>
  );
};
