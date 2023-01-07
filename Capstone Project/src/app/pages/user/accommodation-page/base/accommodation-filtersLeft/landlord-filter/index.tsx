import { TeamOutlined } from '@ant-design/icons';
import { Col, Row, Slider } from 'antd';
import Text from 'antd/lib/typography/Text';
import { useState } from 'react';
import './style.scss';

export interface LandlordFilterProps {
  width?: any;
}

export const LandlordFilter = ({ width }: LandlordFilterProps) => {
  const [lanlord, setLanlord] = useState(1);

  return (
    <Row className="lanlord-filter__wrap" style={{ width: `${width}px` }}>
      <Row className="lanlord-people">
        <TeamOutlined />
        <Text>(+{lanlord}) Người</Text>
      </Row>
      <Row className="lanlord-slider"></Row>
    </Row>
  );
};
