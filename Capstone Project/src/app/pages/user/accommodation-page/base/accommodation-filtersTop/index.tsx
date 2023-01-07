import { NumberOutlined, PictureOutlined } from '@ant-design/icons';
import { Button, Input, Row, Select, Typography } from 'antd';
import { Fragment, useEffect, useState } from 'react';
import './style.scss';

export interface AccommodationFilterTopProps {
  viewBy: string;
  onHandleAccommodationView: (value: string) => void;
}

const sortBy = [
  'Phù hợp nhất',
  'Giá tiền (thấp đên cao)',
  'Giá tiền (cao đến thấp)',
  'Cập nhật gần đây',
  'Thêm gần đây',
  'Đánh giá',
];

export default function AccommodationFilterTop({
  viewBy,
  onHandleAccommodationView,
}: AccommodationFilterTopProps) {
  const { Search } = Input;
  const { Option } = Select;
  const { Text } = Typography;
  const onSearch = (value: any) => {};

  const [filterBy, setFilterBy] = useState(sortBy[0]);

  const onSecondCityChange = (value: any) => {
    setFilterBy(value);
  };

  return (
    <Fragment>
      <Row className="filter-top__container">
        <Row className="filters">
          <Search
            placeholder="Nhập địa điểm tìm kiếm"
            onSearch={onSearch}
            style={{ width: 340 }}
            size="large"
          />

          <Select
            style={{ width: 160 }}
            value={filterBy}
            onChange={onSecondCityChange}
            size="large"
          >
            {sortBy.map((item, index) => (
              <Option key={index}>{item}</Option>
            ))}
          </Select>
        </Row>
        <Row className="view-by">
          <Button
            value="list"
            size="large"
            className={`list-item ${viewBy === 'list' ? 'active-viewBy' : ''}`}
            // className="list-item active-viewBy"
            onClick={() => onHandleAccommodationView('list')}
          >
            <PictureOutlined /> &nbsp; Danh sách
          </Button>
          <Button
            value="map"
            size="large"
            className={`map-item ${viewBy === 'map' ? 'active-viewBy' : ''}`}
            onClick={() => onHandleAccommodationView('map')}
          >
            <NumberOutlined /> &nbsp; Bản đồ
          </Button>
        </Row>
      </Row>
    </Fragment>
  );
}
