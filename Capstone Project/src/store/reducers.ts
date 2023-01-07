/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from '@reduxjs/toolkit';

import { InjectedReducersType } from 'utils/types/injector-typings';
import { homePageReducer } from 'app/pages/user/home-page/screen/reducer';
import { roomTenantReducer } from 'app/pages/landlord/room-tenants-page/screen/reducer';
import { signInReducer } from 'app/pages/authentication/signin-page/screen/reducer';
import { signUpReducer } from 'app/pages/authentication/signup-page/screen/reducer';
import { adminTypeOfRentalPageReducer } from 'app/pages/admin/admin-type-of-rental-management-page/screen/reducer';
import { hostHouseCreatePageReducer } from 'app/pages/landlord/house-create-page/screen/reducer';
import { adminRoomCategoryPageReducer } from 'app/pages/admin/admin-room-category-management-page/screen/reducer';
import { adminRoomTypePageReducer } from 'app/pages/admin/admin-room-type-management-page/screen/reducer';
import { adminAmenityPageReducer } from 'app/pages/admin/admin-amenity-management-page/screen/reducer';
import { adminAccountPageReducer } from 'app/pages/admin/admin-account-management-page/screen/reducer';
import { houseListPageReducer } from 'app/pages/landlord/landlord-house-page/screen/reducer';
import { houseDetailPageReducer } from 'app/pages/landlord/host-house-detail-page/screen/reducer';
import { hostRoomCreatePageReducer } from 'app/pages/landlord/room-create-page/screen/reducer';
import { hostRoomListReducer } from 'app/pages/landlord/landlord-room-page/screen/reducer';
import { verifyAccountReducer } from 'app/pages/authentication/verify-account/reducer';
import { hostRoomDetailReducer } from 'app/pages/landlord/host-room-detail-page/screen/reducer';
import { settingAccountReducer } from 'app/pages/user/settings-account-page/screen/reducer';
import { adminPostingCostPageReducer } from 'app/pages/admin/admin-posting-cost-management-page/screen/reducer';
import { hostPostPageReducer } from 'app/pages/landlord/host-post-management-page/screen/reducer';
import { adminBankAccountPageReducer } from 'app/pages/admin/admin-bank-account-management-page/screen/reducer';
import { searchPageReducer } from 'app/pages/user/suggestion-page/screen/reducer';
import { detailRoomReducer } from 'app/pages/user/detail-room-page/screen/reducer';
import { adminPostManagmentReducer } from 'app/pages/admin/admin-post-management-page/screen/reducer';
import { hostProfileReducer } from 'app/pages/landlord/host-profile-page/screen/reducer';
import { adminTransactionReducer } from 'app/pages/admin/admin-transaction-management-page/screen/reducer';
import { adminDashboardPageReducer } from 'app/pages/admin/admin-dashboard-page/screen/reducer';
import { adminReportReducer } from 'app/pages//admin/admin-report-management-page/screen/reducer';
import { hostDashboardPageReducer } from 'app/pages/landlord/host-dashboard/screen/reducer';
import { adminMapPositonPageReducer } from 'app/pages/admin/admin-map-position/screen/reducer';
import { adminFeedbackReducer } from 'app/pages/admin/admin-feedback-management-page/screen/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export function createReducer(injectedReducers: InjectedReducersType = {}) {
  // Initially we don't have any injectedReducers, so returning identity function to avoid the error
  if (Object.keys(injectedReducers).length === 0) {
    return (state) => state;
  } else {
    return combineReducers({
      ...injectedReducers,
      homePageReducer,
      roomTenantReducer,
      signInReducer,
      signUpReducer,
      verifyAccountReducer,
      settingAccountReducer,
      searchPageReducer,
      detailRoomReducer,

      // Host
      houseListPageReducer,
      houseDetailPageReducer,
      hostRoomCreatePageReducer,
      hostRoomListReducer,
      hostRoomDetailReducer,
      hostProfileReducer,
      hostPostPageReducer,
      hostDashboardPageReducer,

      // ADMIN
      adminTypeOfRentalPageReducer,
      hostHouseCreatePageReducer,
      adminRoomCategoryPageReducer,
      adminRoomTypePageReducer,
      adminAmenityPageReducer,
      adminAccountPageReducer,
      adminPostingCostPageReducer,
      adminBankAccountPageReducer,
      adminPostManagmentReducer,
      adminTransactionReducer,
      adminDashboardPageReducer,
      adminReportReducer,
      adminMapPositonPageReducer,
      adminFeedbackReducer,
    });
  }
}
