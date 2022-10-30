import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, Col, Row, Statistic } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Line } from '@ant-design/plots';

export const AdminDashboardPage: React.FC<any> = () => {
  const [data, setData] = React.useState([]);

  const asyncFetch = () => {
    fetch(
      'https://gw.alipayobjects.com/os/bmw-prod/e00d52f4-2fa6-47ee-a0d7-105dd95bde20.json',
    )
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => {
        console.log('fetch data failed', error);
      });
  };

  React.useEffect(() => {
    asyncFetch();
  }, []);

  const DemoLine = () => {
    const config: any = {
      data,
      xField: 'year',
      yField: 'gdp',
      seriesField: 'name',
      yAxis: {
        label: {
          formatter: v => `${(v / 10e8).toFixed(1)} B`,
        },
      },
      legend: {
        position: 'top',
      },
      smooth: true,
      // @TODO 后续会换一种动画方式
      animation: {
        appear: {
          animation: 'path-in',
          duration: 5000,
        },
      },
    };

    return <Line {...config} />;
  };

  return (
    <Fragment>
      <Helmet>
        <title>Admin - Trang chủ</title>
        <meta name="description" content="Admin - Dashboard Page" />
      </Helmet>
      <div className="site-statistic-demo-card">
        <Row gutter={16}>
          <Col span={6}>
            <Card>
              <Statistic
                title="Active"
                value={11.28}
                precision={2}
                valueStyle={{ color: '#3f8600' }}
                prefix={<ArrowUpOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Idle"
                value={9.3}
                precision={2}
                valueStyle={{ color: '#cf1322' }}
                prefix={<ArrowDownOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Active"
                value={11.28}
                precision={2}
                valueStyle={{ color: '#3f8600' }}
                prefix={<ArrowUpOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Idle"
                value={9.3}
                precision={2}
                valueStyle={{ color: '#cf1322' }}
                prefix={<ArrowDownOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
        </Row>
        <Row style={{ marginTop: 40 }}>
          <Col span={24}>{DemoLine()}</Col>
          {/* <Col span={6}>{DemoPie()}</Col> */}
        </Row>
      </div>
    </Fragment>
  );
};
