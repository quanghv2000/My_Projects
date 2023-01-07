import { Row, Col, Avatar, Button, Card, Select } from 'antd';
import React, { Fragment, useState, useEffect } from 'react';
import 'app/pages/landlord/landlord-house-page/base/house-data-table/style.scss';
import { useSelector } from 'react-redux';
import { RootState } from 'types/RootState';
import NumberCard from 'app/pages/landlord/host-dashboard/base/card-number';
import Sales from 'app/pages/admin/admin-dashboard-page/base/sale';
import RevenueStatistic from 'app/pages/admin/admin-dashboard-page/base/revenue-statistic';

const { Option } = Select;

export const Dashboard: React.FC<any> = () => {
  const [dataAdmin, setDataAdmin]: any = useState([]);
  const [currentYear, setCurrentYear]: any = useState(2022);
  const state = useSelector(
    (state: RootState) => state?.adminDashboardPageReducer
  );

  const handleChange = (value: any) => {
    setCurrentYear(value);
  };

  //useEffect
  useEffect(() => {
    if (state?.dataResponse) {
      const numbers: any = [
        {
          icon: 'pay-circle-o',
          color: '#64ea91',
          title: 'Doanh thu (VND)',
          number: state?.dataResponse?.totalAmount,
        },
        {
          icon: 'team',
          color: '#8fc9fb',
          title: 'Người dùng',
          number: state?.dataResponse?.totalUser,
        },
        {
          icon: 'HomeOutlined',
          color: '#d897eb',
          title: 'Tổng số bài đăng',
          number: state?.dataResponse?.totalPost,
        },
        {
          icon: 'InsertRowLeftOutlined',
          color: '#f69899',
          title: 'Tổng số nhà',
          number: state?.dataResponse?.totalHouse,
        },
      ];

      setDataAdmin(numbers);
    }
  }, [state?.dataResponse]);

  const numberCards = dataAdmin?.map((item, key) => (
    <Col key={key} md={12} xl={6} lg={12} sm={24}>
      <NumberCard {...item} />
    </Col>
  ));

  return (
    <Fragment>
      <Row gutter={24}>
        {numberCards}
        <Col lg={24} md={24}>
          <Card
            bordered={false}
            bodyStyle={{
              padding: '24px 36px 24px 0',
            }}
          >
            <div style={{ marginBottom: 10, display:'flex', justifyContent:'flex-end' }}>
              <Select
                defaultValue={currentYear}
                style={{ width: 120 }}
                onChange={handleChange}
              >
                <Option value={2019}>2019</Option>
                <Option value={2020}>2020</Option>
                <Option value={2021}>2021</Option>
                <Option value={2022}>2022</Option>
                <Option value={2023}>2023</Option>
                <Option value={2024}>2024</Option>
                <Option value={2025}>2025</Option>
                <Option value={2026}>2026</Option>
                <Option value={2027}>2027</Option>
                <Option value={2028}>2028</Option>
              </Select>
            </div>
            <Sales year={currentYear} />
            <div style={{ marginTop: 100 }}>
              <RevenueStatistic year={currentYear} />
            </div>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};
