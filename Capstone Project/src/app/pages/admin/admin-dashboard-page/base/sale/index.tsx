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
import { data } from 'app/pages/admin/admin-dashboard-page/base/sale/template';
import './style.scss';
import { Spin } from 'antd';

const Sales: React.FC<any> = (props: any) => {
  const dispatch = useDispatch();
  const [dataAdmin, setDataAdmin]: any = useState([]);
  //useEffect
  useEffect(() => {
    if (props?.year) {
      dispatch(getDashboardAdminDataRequest({ year: props?.year }));
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

  const statePosting = useSelector(
    (state: RootState) =>
      state?.adminDashboardPageReducer?.dataResponseYear?.dataPosting
  );

  const stateUser = useSelector(
    (state: RootState) =>
      state?.adminDashboardPageReducer?.dataResponseYear?.dataUser
  );

  useEffect(() => {
    if (statePosting?.length >= 0 && stateUser?.length >= 0) {
      const newData = convertDataMapping(data(), statePosting, stateUser);
      setDataAdmin(newData);
    }
  }, [statePosting, stateUser]);

  const loading = useSelector(
    (state: RootState) =>
      state?.adminDashboardPageReducer?.loadingData
  );

  return (
    <div className={'sales'}>
      <div className={'title'}>Thống kê số bài đăng và số người dùng</div>
      <Spin spinning={loading} delay={100}>
      <ResponsiveContainer minHeight={360} >
        <LineChart data={dataAdmin} >
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
          <YAxis axisLine={false} tickLine={false} />
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
                  {`${item.name}:${item.value}`}
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
            name="Số bài đăng"
            type="monotone"
            dataKey="numOfPost"
            stroke={Color.red}
            strokeWidth={3}
            dot={{ fill: Color.red }}
            activeDot={{ r: 5, strokeWidth: 0 }}
          />
          <Line
            type="monotone"
            name="Số người Dùng"
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
