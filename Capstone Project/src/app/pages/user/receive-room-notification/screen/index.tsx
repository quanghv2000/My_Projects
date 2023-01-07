import { Fragment, useEffect } from 'react';
import { ScrollToTop } from 'hooks/scroll-to-top';
import { Helmet } from 'react-helmet-async';
import { NavBar } from 'app/components/navbar';
import { Footer } from 'app/components/footer';
import { RoomReceiveForm } from 'app/pages/user/receive-room-notification/base/room-receive-form';
import { useDispatch } from 'react-redux';
import { hostHouseGetCityRequest } from 'app/pages/landlord/house-create-page/screen/action';
import { getDataAmenityRequest } from 'app/pages/admin/admin-amenity-management-page/screen/action';
import { getDataTypeOfRentalRequest } from 'app/pages/admin/admin-type-of-rental-management-page/screen/action';
import { getDataRoomCategoriesRequest } from 'app/pages/admin/admin-room-category-management-page/screen/action';

export const ReceiveRoomNotification: React.FC<any> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDataAmenityRequest(''));
    dispatch(getDataRoomCategoriesRequest(''));
    dispatch(hostHouseGetCityRequest(''));
    dispatch(getDataTypeOfRentalRequest(''));
  }, [dispatch]);

  return (
    <Fragment>
      <Helmet>
        <title>Nhận thông báo về phòng</title>
        <meta name="description" content="Wish list page" />
      </Helmet>
      <ScrollToTop />
      <NavBar navbarfixed={true} />
      <RoomReceiveForm />
      <Footer />
    </Fragment>
  );
};
