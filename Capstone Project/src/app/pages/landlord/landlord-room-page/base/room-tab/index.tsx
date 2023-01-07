import { Tabs, Spin } from 'antd';
import React, { Fragment, useState, useEffect } from 'react';
import { RoomDataTable } from 'app/pages/landlord/landlord-room-page/base/room-data-table';
import { RootState } from 'types/RootState';
import { ScrollToTop } from 'hooks/scroll-to-top';
import { useSelector, useDispatch } from 'react-redux';
import { hostRoomGetRequest } from 'app/pages/landlord/landlord-room-page/screen/action';
const { TabPane } = Tabs;

export const HouseTab: React.FC<any> = () => {
  const state = useSelector((state: RootState) => state?.houseListPageReducer);
  const dispatch = useDispatch();

  //useEffect
  useEffect(() => {
    if (state?.dataResponse[0]?.id) {
      dispatch(
        hostRoomGetRequest({
          pageSize: 10,
          pageIndex: 1,
          id: state?.dataResponse[0]?.id,
          tabs: state?.dataResponse[0]?.id,
          name: '',
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const callback = (key) => {
    dispatch(
      hostRoomGetRequest({
        pageSize: 10,
        pageIndex: 1,
        id: parseInt(key),
        tabs: parseInt(key),
        name: '',
      })
    );
  };

  return (
    <Fragment>
      <ScrollToTop />
      <Spin spinning={state?.loading} delay={100}>
        <Tabs onChange={callback} type="card">
          {state?.dataResponse?.length > 0 ? (
            state?.dataResponse?.map((item: any) => {
              return (
                <TabPane tab={item?.name} key={item?.id}>
                  <RoomDataTable id={item?.id} />
                </TabPane>
              );
            })
          ) : (
            <div className="bold">Bạn cần tạo nhà trước khi tạo phòng</div>
          )}
        </Tabs>
      </Spin>
    </Fragment>
  );
};
