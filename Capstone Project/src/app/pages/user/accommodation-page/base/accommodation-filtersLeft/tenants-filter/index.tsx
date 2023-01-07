import { TeamOutlined } from '@ant-design/icons';
import { Col, Row, Slider } from 'antd';
import Text from 'antd/lib/typography/Text';
import { useState } from 'react';
import './style.scss';

export interface TenantsFilterProps {
  width?: any;
}

export const TenantsFilter = ({ width }: TenantsFilterProps) => {
  const [tenants, setTenants] = useState(1);

  return (
    <Row className="tenants-filter__wrap" style={{ width: `${width}px` }}>
      <Row className="tenants-people">
        <TeamOutlined />
        <Text>(+{tenants}) Người</Text>
      </Row>
      <Row className="tenants-slider">
        <Col style={{ width: '100%' }}>
          <Slider
            defaultValue={tenants}
            min={0}
            max={10}
            step={1}
            onChange={(e) => setTenants(e)}
          />
        </Col>
      </Row>
    </Row>
  );
};
