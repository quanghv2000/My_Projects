import { Row, Typography } from 'antd';
import React, { Fragment } from 'react';
import { CheckOutlined } from '@ant-design/icons';
import './style.scss';

export interface AccountTypeProps {
  type: string;
  name?: string;
}

const tenant_desc: any = [
  [
    'Thêm phòng trọ vào danh sách yêu thích',
    'Thiết lập hồ sơ và sử dụng trang tổng quan của bạn để theo dõi (các) yêu cầu đặt phòng của bạn',
    'Thêm thông tin cá nhân để tăng cơ hội chủ nhà chấp nhận yêu cầu đặt phòng',
    'Tìm kiếm chỗ ở một cách dễ dàng, thuận tiện',
  ],
];

const landlord_desc: any = [
  [
    'Tạo phòng và đăng lên nền tảng một cách dễ dàng',
    'Có trang quản lý để theo dõi tổng quan và chi tiết',
    'Hỗ trợ chủ nhà nhiều tính năng',
  ],
];

export const AccountType = ({ type, name }: AccountTypeProps) => {
  const { Title, Paragraph } = Typography;

  return (
    <Fragment>
      <Row className="account-type">
        <Row className="account-type-title">
          <Title className="signup__form-title" level={2}>
            {type === 'Tenant' ? 'Tạo tài khoản người thuê' : 'Tạo tài khoản chủ nhà'}
          </Title>

          <Row className="account-type-text">
            {type === 'Tenant' ? (
              <Paragraph>Tìm kiếm chỗ ở</Paragraph>
            ) : (
              <Paragraph>Đăng phòng và quản lý </Paragraph>
            )}
          </Row>
        </Row>

        {type === 'Tenant'
          ? tenant_desc.map((items: string[]) =>
              items.map((item: string, idx: number) => (
                <Row className="account-type-desc" key={idx}>
                  <Row className="desc-mln">
                    <CheckOutlined />
                  </Row>
                  <Row className="desc-item">
                    <Typography>{item}</Typography>
                  </Row>
                </Row>
              ))
            )
          : landlord_desc.map((items: string[]) =>
              items.map((item: string, idx: number) => (
                <Row className="account-type-desc" key={idx}>
                  <Row className="desc-mln">
                    <CheckOutlined />
                  </Row>
                  <Row className="desc-item">
                    <Typography>{item}</Typography>
                  </Row>
                </Row>
              ))
            )}
      </Row>
    </Fragment>
  );
};
