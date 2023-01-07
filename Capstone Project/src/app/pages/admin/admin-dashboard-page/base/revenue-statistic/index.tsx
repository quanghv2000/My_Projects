import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Color } from 'utils/color';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'types/RootState';
import { getDashboardAdminDataRequest } from 'app/pages/admin/admin-dashboard-page/screen/action';
import { data } from 'app/pages/admin/admin-dashboard-page/base/revenue-statistic/template';
import { convertPrice } from 'helper/convert-price-to-vnd';
import './style.scss';
import { Spin } from 'antd';

const RevenueStatistic: React.FC<any> = (props: any) => {
  const dispatch = useDispatch();
  const [dataAdmin, setDataAdmin]: any = useState([]);
  //useEffect
  //useEffect
  useEffect(() => {
    if (props?.year) {
      dispatch(getDashboardAdminDataRequest({ year: props?.year }));
    }
  }, [dispatch, props?.year]);

  const convertDataMapping = (data: any, dataRevenue: any) => {
    let newData: any = data;
    newData?.map((item: any) => {
      dataRevenue?.map((itemChild: any) => {
        if (itemChild?.month === item?.month) {
          item.revenue = itemChild?.number;
        }
      });
      item.month = `Tháng ${item?.month}`;
    });
    return newData;
  };

  const stateDataRevenue = useSelector(
    (state: RootState) =>
      state?.adminDashboardPageReducer?.dataResponseYear?.dataRevenue
  );

  const loading = useSelector(
    (state: RootState) =>
      state?.adminDashboardPageReducer?.loadingData
  );

  useEffect(() => {
    if (stateDataRevenue?.length >= 0) {
      const newData = convertDataMapping(data(), stateDataRevenue);
      setDataAdmin(newData);
    }
  }, [stateDataRevenue]);

  return (
    <div className={'sales'}>
      <div className={'title'}>Thống kê doanh thu theo năm</div>
      <Spin spinning={loading} delay={100}>
      <ResponsiveContainer minHeight={360}>
        <LineChart data={dataAdmin}>
          <Legend
            verticalAlign="top"
            content={(prop) => {
              const { payload }: any = prop;
              return (
                <ul
                  className={classnames({
                    // eslint-disable-next-line no-useless-computed-key
                    ['legend']: true,
                    clearfix: true,
                  })}
                >
                  {payload.map((item, key) => (
                    <li key={key}>
                      <span
                        className={'radiusdot'}
                        style={{ background: item.color }}
                      />
                      {item.value}
                    </li>
                  ))}
                </ul>
              );
            }}
          />
          <XAxis
            dataKey="month"
            axisLine={{ stroke: Color.borderBase, strokeWidth: 1 }}
            tickLine={false}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            width={100}
            tickFormatter={(values) => convertPrice(values)}
          />
          <CartesianGrid
            vertical={false}
            stroke={Color.borderBase}
            strokeDasharray="3 3"
          />
          <Tooltip
            wrapperStyle={{
              border: 'none',
              boxShadow: '4px 4px 40px rgba(0, 0, 0, 0.05)',
            }}
            content={(content: any) => {
              const list = content?.payload?.map((item, key) => (
                <li key={key} className={'tipitem'}>
                  <span
                    className={'radiusdo'}
                    style={{ background: item.color }}
                  />
                  {`${item.name}: ${convertPrice(item.value)} VND`}
                </li>
              ));
              return (
                <div className={'tooltip'}>
                  <p className={'tiptitle'}>{content.label}</p>
                  {content.payload && <ul>{list}</ul>}
                </div>
              );
            }}
          />
          <Line
            type="monotone"
            name="Doanh thu"
            dataKey="revenue"
            stroke={Color.yellow}
            strokeWidth={3}
            dot={{ fill: Color.yellow }}
            activeDot={{ r: 5, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
      </Spin>
    </div>
  );
};

export default RevenueStatistic;
