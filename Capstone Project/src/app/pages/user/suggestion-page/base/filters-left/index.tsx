import { Row, Typography } from 'antd';
import { BudgetFilter } from 'app/pages/user/accommodation-page/base/accommodation-filtersLeft/buget-filter';
import { CheckBoxFilter } from 'app/pages/user/accommodation-page/base/accommodation-filtersLeft/checkbox-filter';
import { HalfCheckboxFilter } from 'app/pages/user/accommodation-page/base/accommodation-filtersLeft/halfcheckbox-filter';
import { TenantsFilter } from 'app/pages/user/accommodation-page/base/accommodation-filtersLeft/tenants-filter';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'types/RootState';
import './style.scss';

export interface AccommodationFilterLeftProps {}

export default function AccommodationFilterLeft(
  props: AccommodationFilterLeftProps
) {
  const { Text } = Typography;

  const stateTypeOfRental = useSelector(
    (state: RootState) => state?.adminTypeOfRentalPageReducer
  );

  const stateAmenity = useSelector(
    (state: RootState) => state?.adminAmenityPageReducer
  );

  const stateRoomCategory = useSelector(
    (state: RootState) => state?.adminRoomCategoryPageReducer
  );

  function onChangeFilters(e: any) {
    return e.target.checked;
  }

  let typeOfRentalComp: any = '';
  let amenityComp: any = '';
  let roomCategoryComp: any = '';

  if (stateTypeOfRental?.dataResponse?.length > 0) {
    typeOfRentalComp = stateTypeOfRental?.dataResponse?.map(
      (item: any, key: any) => {
        return (
          <HalfCheckboxFilter
            key={key}
            checkboxName={item?.name}
            width="170"
            onChange={onChangeFilters}
          />
        );
      }
    );
  }

  if (stateAmenity?.dataResponse?.length > 0) {
    amenityComp = stateAmenity?.dataResponse?.map((item: any, key: any) => {
      return (
        <HalfCheckboxFilter
          key={key}
          checkboxName={item?.name}
          width="170"
          onChange={onChangeFilters}
        />
      );
    });
  }

  if (stateRoomCategory?.dataResponse?.length > 0) {
    roomCategoryComp = stateRoomCategory?.dataResponse?.map(
      (item: any, key: any) => {
        return (
          <HalfCheckboxFilter
            key={key}
            checkboxName={item?.name}
            width="170"
            onChange={onChangeFilters}
          />
        );
      }
    );
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

          <Row className="filter__types__types">{typeOfRentalComp}</Row>
        </Row>

        {/* TypeRoom Filter */}
        {/* <Row className="filter__places">
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
        </Row> */}

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
          <Row className="filter__demand__types">{roomCategoryComp}</Row>
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
        {/* <Row className="filter__landlord">
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
        </Row> */}

        {/* Furniture Filters */}
        <Row className="filter__furniture">
          <Row className="filter__furniture__name filterTitle">
            <Text type="secondary" strong={true}>
              Nội Thất
            </Text>
          </Row>
          <Row className="filter__furniture__types">{amenityComp}</Row>
        </Row>

        {/* Bedroom Filters */}
        {/* <Row className="filter__bedroom">
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
        </Row> */}

        {/* Rules Filters */}
        {/* <Row className="filter__rulues">
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
          </Row> */}
        {/* </Row> */}
      </Row>
    </Fragment>
  );
}
