import { LayoutHost } from 'app/components/host-layout';
import { getDataAmenityRequest } from 'app/pages/admin/admin-amenity-management-page/screen/action';
import { getDataTypeOfRentalRequest } from 'app/pages/admin/admin-type-of-rental-management-page/screen/action';
import { HouseDetailTab } from 'app/pages/landlord/host-house-detail-page/base/house-detail-tab';
import { hostHouseGetDetailRequest } from 'app/pages/landlord/host-house-detail-page/screen/action';
import {
  hostHouseGetCityRequest,
  hostHouseGetDistrictRequest,
  hostHouseGetVillageRequest,
  clearStateHostHouseCreate
} from 'app/pages/landlord/house-create-page/screen/action';
import React, { Fragment, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { RootState } from 'types/RootState';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollToTop } from 'hooks/scroll-to-top';

export const HostHouseDetailPage: React.FC<any> = (props: any) => {
  const dispatch = useDispatch();

  const state = useSelector(
    (state: RootState) => state?.houseDetailPageReducer
  );
  //useEffect
  useEffect(() => {
    if (props?.match?.params?.id) {
      dispatch(hostHouseGetDetailRequest(props?.match?.params?.id));
    }
    dispatch(getDataAmenityRequest(''));
    dispatch(hostHouseGetCityRequest(''));
    dispatch(getDataTypeOfRentalRequest(''));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, props?.match?.params?.id]);

  useEffect(() => {
    if (state?.dataResponse?.address?.phuongXa?.quanHuyen?.thanhPho?.id) {
      dispatch(
        hostHouseGetDistrictRequest(
          state?.dataResponse?.address?.phuongXa?.quanHuyen?.thanhPho?.id
        )
      );
    }
    if (state?.dataResponse?.address?.phuongXa?.quanHuyen?.id) {
      dispatch(
        hostHouseGetVillageRequest(
          state?.dataResponse?.address?.phuongXa?.quanHuyen?.id
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  useEffect(() => {
    return () => {
      dispatch(clearStateHostHouseCreate(''));
    };
  }, []);

  return (
    <Fragment>
      <Helmet>
        <title>Hola Houses Map</title>
        <meta name="description" content="Hola Houses" />
      </Helmet>
      <ScrollToTop />
      <React.StrictMode>
        <LayoutHost
          content={<HouseDetailTab id={props?.match?.params?.id} />}
        />
      </React.StrictMode>
    </Fragment>
  );
};
