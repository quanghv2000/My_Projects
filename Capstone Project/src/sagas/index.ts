import { all } from 'redux-saga/effects';
import homePageSagas from 'app/pages/user/home-page/screen/saga';
import authenticationSignInSagas from 'app/pages/authentication/signin-page/screen/saga';
import authenticationSignUpSagas from 'app/pages/authentication/signup-page/screen/saga';
import landlordPageSagas from 'app/pages/landlord/landlord-house-page/screen/saga';
import roomTenantPageSagas from 'app/pages/landlord/room-tenants-page/screen/saga';
import adminTypeOfRentalSagas from 'app/pages/admin/admin-type-of-rental-management-page/screen/saga';
import hostHouseCreateSagas from 'app/pages/landlord/house-create-page/screen/saga';
import adminRoomCategorySagas from 'app/pages/admin/admin-room-category-management-page/screen/saga';
import adminRoomTypeSagas from 'app/pages/admin/admin-room-type-management-page/screen/saga';
import adminAmenitySagas from 'app/pages/admin/admin-amenity-management-page/screen/saga';
import adminAccountSagas from 'app/pages/admin/admin-account-management-page/screen/saga';
import hostHouseGetDetailSagas from 'app/pages/landlord/host-house-detail-page/screen/saga';
import hostRoomCreateSagas from 'app/pages/landlord/room-create-page/screen/saga';
import hostRoomgetSagas from 'app/pages/landlord/landlord-room-page/screen/saga';
import verifyAccountSagas from 'app/pages/authentication/verify-account/saga';
import hostRoomDetailSagas from 'app/pages/landlord/host-room-detail-page/screen/saga';
import settingAccountSagas from 'app/pages/user/settings-account-page/screen/saga';
import adminBankAccountSagas from 'app/pages/admin/admin-bank-account-management-page/screen/saga';
import hostPosstPageSagas from 'app/pages/landlord/host-post-management-page/screen/saga';
import adminPostingCostSagas from 'app/pages/admin/admin-posting-cost-management-page/screen/saga';
import searchPageSagas from 'app/pages/user/suggestion-page/screen/saga';
import detailRoomSagas from 'app/pages/user/detail-room-page/screen/saga';
import adminPostManagmentSagas from 'app/pages/admin/admin-post-management-page/screen/saga';
import hostProfileSagas from 'app/pages/landlord/host-profile-page/screen/saga';
import adminTransactionSagas from 'app/pages/admin/admin-transaction-management-page/screen/saga';
import adminDashboardSagas from 'app/pages/admin/admin-dashboard-page/screen/saga';
import adminReportSagas from 'app/pages/admin/admin-report-management-page/screen/saga';
import hostDashboardSagas from 'app/pages/landlord/host-dashboard/screen/saga';
import adminMapPositonSagas from 'app/pages/admin/admin-map-position/screen/saga';
import adminFeedbackSagas from 'app/pages/admin/admin-feedback-management-page/screen/saga';

export default function* rootSaga() {
  yield all([
    homePageSagas(),
    landlordPageSagas(),
    roomTenantPageSagas(),
    authenticationSignInSagas(),
    authenticationSignUpSagas(),
    adminTypeOfRentalSagas(),
    hostHouseCreateSagas(),
    adminRoomCategorySagas(),
    adminRoomTypeSagas(),
    adminAmenitySagas(),
    adminAccountSagas(),
    hostHouseGetDetailSagas(),
    hostRoomCreateSagas(),
    hostRoomgetSagas(),
    verifyAccountSagas(),
    hostRoomDetailSagas(),
    settingAccountSagas(),
    adminBankAccountSagas(),
    hostPosstPageSagas(),
    adminPostingCostSagas(),
    searchPageSagas(),
    detailRoomSagas(),
    adminPostManagmentSagas(),
    hostProfileSagas(),
    adminTransactionSagas(),
    adminDashboardSagas(),
    adminReportSagas(),
    hostDashboardSagas(),
    adminMapPositonSagas(),
    adminFeedbackSagas(),
  ]);
}
