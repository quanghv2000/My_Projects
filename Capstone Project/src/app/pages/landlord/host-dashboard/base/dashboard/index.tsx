import { Card, Col, Row, Select } from 'antd';
import NumberCard from 'app/pages/landlord/host-dashboard/base/card-number';
import Sales from 'app/pages/landlord/host-dashboard/base/sale';
import 'app/pages/landlord/landlord-house-page/base/house-data-table/style.scss';
import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'types/RootState';

const { Option } = Select;

export const Dashboard: React.FC<any> = () => {
  const [dataHost, setDataHost]: any = useState([]);
  const [currentYear, setCurrentYear]: any = useState(2022);
  const state = useSelector(
    (state: RootState) => state?.hostDashboardPageReducer
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
          title: 'Tổng chi (VND)',
          number: state?.dataResponse?.totalAmount,
        },
        {
          icon: 'edit',
          color: '#d897eb',
          title: 'Tổng số bài đăng',
          number: state?.dataResponse?.totalPost,
        },
        {
          icon: 'HomeOutlined',
          color: '#f69899',
          title: 'Tổng số nhà',
          number: state?.dataResponse?.totalHouse,
        },
        {
          icon: 'InsertRowLeftOutlined',
          color: '#8fc9fb',
          title: 'Tổng số phòng',
          number: state?.dataResponse?.totalRoom,
        },
      ];

      setDataHost(numbers);
    }
  }, [state?.dataResponse]);

  const numberCards = dataHost.map((item, key) => (
    <Col key={key} lg={6} md={12}>
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
            <div
              style={{
                marginBottom: 10,
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
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
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};
