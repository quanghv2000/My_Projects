import { Tag, Table } from 'antd';
import React, { Fragment, useEffect } from 'react';
import { hostHouseHistoryRequest } from 'app/pages/landlord/host-house-detail-page/screen/action';
import { convertPrice } from 'helper/convert-price-to-vnd';
import Moment from 'react-moment';
import { useSelector } from 'react-redux';
import { RootState } from 'types/RootState';
import { useDispatch } from 'react-redux';
import moment from 'moment';

export const HouseDetailHistoryTab: React.FC<any> = (props: any) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hostHouseHistoryRequest({ id: props?.id }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props?.id]);
  // const history = useHistory();

  const columns: any = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      align: 'center',
      render: (index) => <b>{index}</b>,
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      align: 'center',
      key: 'description',
    },
    {
      title: 'Đơn giá (VNĐ)',
      dataIndex: 'price',
      key: 'price',
      align: 'center',
      render: (price: any) => {
        if (price === 0) {
          return '-';
        } else return convertPrice(price) + ' vn₫';
      },
    },
    {
      title: 'Ngày thực hiện',
      dataIndex: 'startDate',
      align: 'center',
      key: 'startDate',
      render: (startDate) => (
        <Moment format="DD/MM/YYYY HH:mm">{new Date(startDate)}</Moment>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status: any, data: any) => {
        if (status === 'CREATED') {
          return <Tag color="green">Thành công</Tag>;
        }
        if (
          status === 'CENSORED' &&
          moment(data.endDate) > moment() &&
          moment(data.startDate) < moment()
        ) {
          return <Tag color="green">Đang hiển thị</Tag>;
        }
        if (moment(data.endDate) <= moment()) {
          return <Tag color="red">Đã hết hạn</Tag>;
        }
        if (status === 'CENSORED' && moment(data.startDate) > moment()) {
          return <Tag color="blue">Chờ hiển thị</Tag>;
        }
        if (status === 'UNCENSORED') {
          return <Tag color="orange">Chờ kiểm duyệt</Tag>;
        }
        if (status === 'REJECTED') {
          return <Tag color="magenta">Đã bị huỷ</Tag>;
        }
      },
    },
  ];

  const state = useSelector(
    (state: RootState) => state?.houseDetailPageReducer
  );

  const dataSource =
    state?.dataHistotyResponse?.length > 0 ? state?.dataHistotyResponse : [];

  return (
    <Fragment>
      <div
        style={{
          // display: 'flex',
          // justifyContent: 'center',
          width: ' 100%',
        }}
      >
        <Table
          rowKey="_id"
          bordered
          className="mt-10 mb-10"
          columns={columns}
          // loading={state?.loading}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: false,
          }}
          dataSource={dataSource}
        />
      </div>
    </Fragment>
  );
};
