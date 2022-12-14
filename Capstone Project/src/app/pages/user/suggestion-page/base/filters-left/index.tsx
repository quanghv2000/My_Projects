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
              Lo???i h??nh
            </Text>
          </Row>

          <Row className="filter__types__types">{typeOfRentalComp}</Row>
        </Row>

        {/* TypeRoom Filter */}
        {/* <Row className="filter__places">
          <Row className="filter__places__name filterTitle">
            <Text type="secondary" strong={true}>
              Lo???i Ph??ng
            </Text>
          </Row>

          <Row className="filter__places__types">
            <CheckBoxFilter
              checkboxName="Ph??ng ????n"
              width="345"
              onChange={onChangeFilters}
            />

            <CheckBoxFilter
              checkboxName="Ph??ng ????i"
              width="345"
              onChange={onChangeFilters}
            />

            <CheckBoxFilter
              checkboxName="Ph??ng Gh??p"
              width="345"
              onChange={onChangeFilters}
            />
          </Row>
        </Row> */}

        {/* Budget Filter */}
        <Row className="filter__budget">
          <Row className="filter__places__name filterTitle">
            <Text type="secondary" strong={true}>
              Gi?? Ph??ng
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
              Nhu c???u
            </Text>
          </Row>
          <Row className="filter__demand__types">{roomCategoryComp}</Row>
        </Row>

        {/* Tenants Filter */}
        <Row className="filter__tenants">
          <Row className="filter__tenants__name filterTitle">
            <Text type="secondary" strong={true}>
              Ng?????i thu??
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
              Ch??? nh??
            </Text>
          </Row>
          <Row className="filter__landlord__types">
            <CheckBoxFilter
              checkboxName="???????c ????nh gi?? cao"
              width="345"
              onChange={onChangeFilters}
            />
            <CheckBoxFilter
              checkboxName="Th??n thi???n, d??? t??nh"
              width="345"
              onChange={onChangeFilters}
            />
            <CheckBoxFilter
              checkboxName="Kh??ng chung ch???"
              width="345"
              onChange={onChangeFilters}
            />
          </Row>
        </Row> */}

        {/* Furniture Filters */}
        <Row className="filter__furniture">
          <Row className="filter__furniture__name filterTitle">
            <Text type="secondary" strong={true}>
              N???i Th???t
            </Text>
          </Row>
          <Row className="filter__furniture__types">{amenityComp}</Row>
        </Row>

        {/* Bedroom Filters */}
        {/* <Row className="filter__bedroom">
          <Row className="filter__bedroom__name filterTitle">
            <Text type="secondary" strong={true}>
              Lo???i gi?????ng
            </Text>
          </Row>
          <Row className="filter__bedroom__types">
            <CheckBoxFilter
              checkboxName="Gi?????ng ????n"
              width="345"
              onChange={onChangeFilters}
            />
            <CheckBoxFilter
              checkboxName="Gi?????ng ????i"
              width="345"
              onChange={onChangeFilters}
            />
            <CheckBoxFilter
              checkboxName="Gi?????ng t???ng"
              width="345"
              onChange={onChangeFilters}
            />
          </Row>
        </Row> */}

        {/* Rules Filters */}
        {/* <Row className="filter__rulues">
          <Row className="filter__rulues__name filterTitle">
            <Text type="secondary" strong={true}>
              N???i quy
            </Text>
          </Row>
          <Row className="filter__rulues__types">
            <CheckBoxFilter
              checkboxName="Kh??a c???ng v??o bu???i ????m"
              width="345"
              onChange={onChangeFilters}
            />
            <CheckBoxFilter
              checkboxName="Cho ph??p h??t thu???c"
              width="345"
              onChange={onChangeFilters}
            />
            <CheckBoxFilter
              checkboxName="Cho ph??p nu??i ?????ng v???t"
              width="345"
              onChange={onChangeFilters}
            />
            <CheckBoxFilter
              checkboxName="Cho ph??p b???n b?? qua ????m"
              width="345"
              onChange={onChangeFilters}
            />
          </Row> */}
        {/* </Row> */}
      </Row>
    </Fragment>
  );
}
