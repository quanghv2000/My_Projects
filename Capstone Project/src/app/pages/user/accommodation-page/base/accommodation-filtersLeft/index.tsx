import { Row, Typography } from 'antd';
import { BudgetFilter } from 'app/pages/user/accommodation-page/base/accommodation-filtersLeft/buget-filter';
import { CheckBoxFilter } from 'app/pages/user/accommodation-page/base/accommodation-filtersLeft/checkbox-filter';
import { HalfCheckboxFilter } from 'app/pages/user/accommodation-page/base/accommodation-filtersLeft/halfcheckbox-filter';
import { TenantsFilter } from 'app/pages/user/accommodation-page/base/accommodation-filtersLeft/tenants-filter';
import { Fragment } from 'react';
import './style.scss';

export interface AccommodationFilterLeftProps {}

export default function AccommodationFilterLeft(
  props: AccommodationFilterLeftProps
) {
  const { Text } = Typography;

  function onChangeFilters(e: any) {
  }
  return (
    <Fragment>
      <Row className="filter-left__container">
        {/* Type Filter */}
        <Row className="filter__types">
          <Row className="filter__types__name filterTitle">
            <Text type="secondary" strong={true}>
              Loại hình
            </Text>
          </Row>

          <Row className="filter__types__types">
            <HalfCheckboxFilter
              checkboxName="Trọ chung chủ"
              width="170"
              onChange={onChangeFilters}
            />
            <HalfCheckboxFilter
              checkboxName="Trọ tự quản lý"
              width="170"
              onChange={onChangeFilters}
            />
            <HalfCheckboxFilter
              checkboxName="Studio"
              width="170"
              onChange={onChangeFilters}
            />
            <HalfCheckboxFilter
              checkboxName="Chung cư mini"
              width="170"
              onChange={onChangeFilters}
            />
            <HalfCheckboxFilter
              checkboxName="Homestay"
              width="170"
              onChange={onChangeFilters}
            />
            <HalfCheckboxFilter
              checkboxName="Nhà nghỉ"
              width="170"
              onChange={onChangeFilters}
            />
            <HalfCheckboxFilter
              checkboxName="Khách sạn"
              width="170"
              onChange={onChangeFilters}
            />
            <HalfCheckboxFilter
              checkboxName="Nhà nguyên căn"
              width="170"
              onChange={onChangeFilters}
            />
          </Row>
        </Row>

        {/* TypeRoom Filter */}
        <Row className="filter__places">
          <Row className="filter__places__name filterTitle">
            <Text type="secondary" strong={true}>
              Loại Phòng
            </Text>
          </Row>

          <Row className="filter__places__types">
            <CheckBoxFilter
              checkboxName="Phòng Đơn"
              width="345"
              onChange={onChangeFilters}
            />

            <CheckBoxFilter
              checkboxName="Phòng Đôi"
              width="345"
              onChange={onChangeFilters}
            />

            <CheckBoxFilter
              checkboxName="Phòng Ghép"
              width="345"
              onChange={onChangeFilters}
            />
          </Row>
        </Row>

        {/* Budget Filter */}
        <Row className="filter__budget">
          <Row className="filter__places__name filterTitle">
            <Text type="secondary" strong={true}>
              Giá Phòng
            </Text>
          </Row>
          <Row className="filter__places__types">
            <BudgetFilter width="345" />
          </Row>
        </Row>

        {/* Demands Filter */}
        <Row className="filter__demand">
          <Row className="filter__demand__name filterTitle">
            <Text type="secondary" strong={true}>
              Nhu cầu
            </Text>
          </Row>
          <Row className="filter__demand__types">
            <HalfCheckboxFilter
              checkboxName="Ở riêng"
              width="170"
              onChange={onChangeFilters}
            />
            <HalfCheckboxFilter
              checkboxName="Ở chung"
              width="170"
              onChange={onChangeFilters}
            />
          </Row>
        </Row>

        {/* Tenants Filter */}
        <Row className="filter__tenants">
          <Row className="filter__tenants__name filterTitle">
            <Text type="secondary" strong={true}>
              Người thuê
            </Text>
          </Row>
          <Row className="filter__tenants__types">
            <TenantsFilter width="345" />
          </Row>
        </Row>

        {/* Landlord Filter */}
        <Row className="filter__landlord">
          <Row className="filter__landlord__name filterTitle">
            <Text type="secondary" strong={true}>
              Chủ nhà
            </Text>
          </Row>
          <Row className="filter__landlord__types">
            <CheckBoxFilter
              checkboxName="Được đánh giá cao"
              width="345"
              onChange={onChangeFilters}
            />
            <CheckBoxFilter
              checkboxName="Thân thiện, dễ tính"
              width="345"
              onChange={onChangeFilters}
            />
            <CheckBoxFilter
              checkboxName="Không chung chủ"
              width="345"
              onChange={onChangeFilters}
            />
          </Row>
        </Row>

        {/* Furniture Filters */}
        <Row className="filter__furniture">
          <Row className="filter__furniture__name filterTitle">
            <Text type="secondary" strong={true}>
              Nội Thất
            </Text>
          </Row>
          <Row className="filter__furniture__types">
            <HalfCheckboxFilter
              checkboxName="Tủ quần áo"
              width="172"
              onChange={onChangeFilters}
            />
            <HalfCheckboxFilter
              checkboxName="Điều hòa"
              width="172"
              onChange={onChangeFilters}
            />
            <HalfCheckboxFilter
              checkboxName="Bàn học"
              width="172"
              onChange={onChangeFilters}
            />
            <HalfCheckboxFilter
              checkboxName="Wi-fi"
              width="172"
              onChange={onChangeFilters}
            />
            <HalfCheckboxFilter
              checkboxName="Giường ngủ"
              width="172"
              onChange={onChangeFilters}
            />
            <HalfCheckboxFilter
              checkboxName="Bình nóng lạnh"
              width="172"
              onChange={onChangeFilters}
            />
            <HalfCheckboxFilter
              checkboxName="Ti-vi"
              width="172"
              onChange={onChangeFilters}
            />
            <HalfCheckboxFilter
              checkboxName="Cửa sổ"
              width="172"
              onChange={onChangeFilters}
            />
            <HalfCheckboxFilter
              checkboxName="Khu bếp"
              width="172"
              onChange={onChangeFilters}
            />
            <HalfCheckboxFilter
              checkboxName="Nhà vệ sinh"
              width="172"
              onChange={onChangeFilters}
            />
            <HalfCheckboxFilter
              checkboxName="Máy giặt"
              width="172"
              onChange={onChangeFilters}
            />
            <HalfCheckboxFilter
              checkboxName="Nhà để xe"
              width="172"
              onChange={onChangeFilters}
            />
            <HalfCheckboxFilter
              checkboxName="Khóa vân tay"
              width="172"
              onChange={onChangeFilters}
            />
            <HalfCheckboxFilter
              checkboxName="Khu phơi đồ"
              width="172"
              onChange={onChangeFilters}
            />
          </Row>
        </Row>

        {/* Bedroom Filters */}
        <Row className="filter__bedroom">
          <Row className="filter__bedroom__name filterTitle">
            <Text type="secondary" strong={true}>
              Loại giường
            </Text>
          </Row>
          <Row className="filter__bedroom__types">
            <CheckBoxFilter
              checkboxName="Giường đơn"
              width="345"
              onChange={onChangeFilters}
            />
            <CheckBoxFilter
              checkboxName="Giường đôi"
              width="345"
              onChange={onChangeFilters}
            />
            <CheckBoxFilter
              checkboxName="Giường tầng"
              width="345"
              onChange={onChangeFilters}
            />
          </Row>
        </Row>

        {/* Rules Filters */}
        <Row className="filter__rulues">
          <Row className="filter__rulues__name filterTitle">
            <Text type="secondary" strong={true}>
              Nội quy
            </Text>
          </Row>
          <Row className="filter__rulues__types">
            <CheckBoxFilter
              checkboxName="Khóa cổng vào buổi đêm"
              width="345"
              onChange={onChangeFilters}
            />
            <CheckBoxFilter
              checkboxName="Cho phép hút thuốc"
              width="345"
              onChange={onChangeFilters}
            />
            <CheckBoxFilter
              checkboxName="Cho phép nuôi động vật"
              width="345"
              onChange={onChangeFilters}
            />
            <CheckBoxFilter
              checkboxName="Cho phép bạn bè qua đêm"
              width="345"
              onChange={onChangeFilters}
            />
          </Row>
        </Row>
      </Row>
    </Fragment>
  );
}
