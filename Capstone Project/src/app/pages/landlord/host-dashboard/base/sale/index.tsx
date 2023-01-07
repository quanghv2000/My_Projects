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
import { getDashboardHostDataRequest } from 'app/pages/landlord/host-dashboard/screen/action';
import { data } from 'app/pages/admin/admin-dashboard-page/base/sale/template';
import './style.scss';
import { Spin } from 'antd';
import { convertPrice } from 'helper/convert-price-to-vnd';

const Sales: React.FC<any> = (props: any) => {
  const dispatch = useDispatch();
  const [dataAdmin, setDataAdmin]: any = useState([]);
  //useEffect
  useEffect(() => {
    if (props?.year) {
      dispatch(getDashboardHostDataRequest({ year: props?.year }));
    }
  }, [dispatch, props?.year]);

  const convertDataMapping = (data: any, postingArr: any, userArr: any) => {
    let newData: any = data;
    newData?.map((item: any) => {
      postingArr?.map((itemPost: any) => {
        if (itemPost?.month === item?.month) {
          item.numOfPost = itemPost?.number;
        }
      });
      userArr?.map((itemUser: any) => {
        if (itemUser?.month === item?.month) {
          item.numOfUser = itemUser?.number;
        }
      });
      item.month = `Tháng ${item?.month}`;
    });
    return newData;
  };

  const statedDataDeposit = useSelector(
    (state: RootState) =>
      state?.hostDashboardPageReducer?.dataResponseYear?.dataDeposit
  );
  const stateDataPostingExtend = useSelector(
    (state: RootState) =>
      state?.hostDashboardPageReducer?.dataResponseYear?.dataPostingExtend
  );

  useEffect(() => {
    if (statedDataDeposit?.length >= 0 && stateDataPostingExtend?.length >= 0) {
      const newData = convertDataMapping(
        data(),
        statedDataDeposit,
        stateDataPostingExtend
      );
      setDataAdmin(newData);
    }
  }, [stateDataPostingExtend, statedDataDeposit]);

  const loading = useSelector(
    (state: RootState) => state?.hostDashboardPageReducer?.loadingData
  );

  return (
    <div className={'sales'}>
      <div className={'title'}>
        Thống kê số tiền nạp và số tiền đăng tin & gia hạn
      </div>
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
              name="Số tiền nạp"
              type="monotone"
              dataKey="numOfPost"
              stroke={Color.red}
              strokeWidth={3}
              dot={{ fill: Color.red }}
              activeDot={{ r: 5, strokeWidth: 0 }}
            />
            <Line
              type="monotone"
              name="Số tiền đăng tin & gia hạn"
              dataKey="numOfUser"
              stroke={Color.green}
              strokeWidth={3}
              dot={{ fill: Color.green }}
              activeDot={{ r: 5, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Spin>
    </div>
  );
};

Sales.propTypes = {
  data: PropTypes.array,
};

export default Sales;
