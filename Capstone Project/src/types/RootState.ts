import { ThemeState } from 'styles/theme/slice/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
  Properties are optional because they are injected when the components are mounted sometime in your application's life. 
  So, not available always
*/
export interface RootState {
  theme?: ThemeState;
  homePageReducer?: any;
  roomTenantReducer?: any;
  signInReducer?: any;
  signUpReducer?: any;
  verifyAccountReducer?: any;
  settingAccountReducer?: any;
  searchPageReducer?: any;
  detailRoomReducer?: any;

  houseListPageReducer?: any;
  houseDetailPageReducer?: any;
  hostRoomCreatePageReducer?: any;
  hostRoomListReducer?: any;
  hostRoomDetailReducer?: any;
  hostProfileReducer?: any;
  hostPostPageReducer?: any;
  hostDashboardPageReducer?: any;

  // ADMIN
  adminTypeOfRentalPageReducer?: any;
  hostHouseCreatePageReducer?: any;
  adminRoomCategoryPageReducer?: any;
  adminRoomTypePageReducer?: any;
  adminAmenityPageReducer?: any;
  adminAccountPageReducer?: any;
  adminBankAccountPageReducer?: any;
  adminPostingCostPageReducer?: any;
  adminPostManagmentReducer?: any;
  adminTransactionReducer?: any;
  adminDashboardPageReducer?: any;
  adminReportReducer?: any;
  adminMapPositonPageReducer?: any;
  adminFeedbackReducer?: any;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
