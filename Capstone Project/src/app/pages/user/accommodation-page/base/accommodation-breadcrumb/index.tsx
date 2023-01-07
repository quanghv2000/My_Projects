import { Breadcrumb, Row, Typography } from 'antd';
import { Fragment } from 'react';
import './style.scss';

export interface AccommodationBreadcrumbProps {}

export default function AccommodationBreadcrumb() {
  const { Text } = Typography;

  return (
    <Fragment>
      <Row className="filter-top__breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item>
            <a href="/">Trang Chủ</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="/">Phòng Trọ</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Thôn 6</Breadcrumb.Item>
        </Breadcrumb>
      </Row>

      <Row className="filter-top__title">
        <Text>Phòng, căn hộ và studios cho thuê tại `Thôn 6`</Text>
      </Row>
    </Fragment>
  );
}
