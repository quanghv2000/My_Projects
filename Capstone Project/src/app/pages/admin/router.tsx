// ADMIN PAGE
import { AdminDashboardPage } from 'app/pages/admin/admin-dashboard-page/screen';
import { AdminAccountManagementPage } from 'app/pages/admin/admin-account-management-page/screen';
import { AdminHouseManagementPage } from 'app/pages/admin/admin-house-management-page/screen';
// import { AdminHouseCategoryManagementPage } from './pages/admin/admin-house-category-management-page/screen';
import { AdminTypeOfRentalManagementPage } from 'app/pages/admin/admin-type-of-rental-management-page/screen';
import { AdminRoomCategoryManagementPage } from 'app/pages/admin/admin-room-category-management-page/screen';
import { AdminRoomTypeManagementPage } from 'app/pages/admin/admin-room-type-management-page/screen';
import { AdminBankAccountManagementPage } from 'app/pages/admin/admin-bank-account-management-page/screen';
import { AdminAmenityManagementPage } from 'app/pages/admin/admin-amenity-management-page/screen';
import { AdminDestinationManagementPage } from 'app/pages/admin/admin-destination-management-page/screen';
import { AdminPostManagementPage } from 'app/pages/admin/admin-post-management-page/screen';
import { AdminPostingCostManagementPage } from 'app/pages/admin/admin-posting-cost-management-page/screen';
import { AdminTransactionManagementPage } from 'app/pages/admin/admin-transaction-management-page/screen';
import { AdminServiceManagementPage } from 'app/pages/admin/admin-service-management-page/screen';
import { AdminReportManagementPage } from 'app/pages/admin/admin-report-management-page/screen';
import { AdminMapPositonPage } from 'app/pages/admin/admin-map-position/screen';
import { AdminFeedbackManagementPage } from 'app/pages/admin/admin-feedback-management-page/screen/Loadable';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
// import { getCookie } from 'utils/request';

export const PrivateAdminRoute: React.FC<any> = (props) => {
  // const token = getCookie('token');
  const token = localStorage.getItem('token');
  const userInfoCookies = localStorage.getItem('user-info');
  // const userInfoCookies = getCookie('user-info');
  let userInfo: any;

  if (userInfoCookies) {
    userInfo = JSON.parse(userInfoCookies);
  }

  const { component: Component, ...restProps } = props;

  if (!Component) return null;

  return (
    <Route
      {...restProps}
      render={(routeRenderProps) =>
        token && userInfo?.role?.id === 1 ? (
          <Component {...routeRenderProps} />
        ) : (
          <Redirect
            to={{
              pathname: '/sign-in',
              state: { from: routeRenderProps.location },
            }}
          />
        )
      }
    />
  );
};

export const adminRouter = [
  { path: '/admin/dashboard', component: AdminDashboardPage },
  { path: '/admin/account-management', component: AdminAccountManagementPage },
  { path: '/admin/house-management', component: AdminHouseManagementPage },
  {
    path: '/admin/type-of-rental-management',
    component: AdminTypeOfRentalManagementPage,
  },
  {
    path: '/admin/room-category-management',
    component: AdminRoomCategoryManagementPage,
  },
  {
    path: '/admin/room-type-management',
    component: AdminRoomTypeManagementPage,
  },
  { path: '/admin/amenity-management', component: AdminAmenityManagementPage },
  {
    path: '/admin/destination-management',
    component: AdminDestinationManagementPage,
  },
  {
    path: '/admin/bank-account-management',
    component: AdminBankAccountManagementPage,
  },
  {
    path: '/admin/post-management',
    component: AdminPostManagementPage,
  },
  {
    path: '/admin/transaction-management',
    component: AdminTransactionManagementPage,
  },
  {
    path: '/admin/posting-cost-management',
    component: AdminPostingCostManagementPage,
  },
  {
    path: '/admin/service-management',
    component: AdminServiceManagementPage,
  },
  {
    path: '/admin/report-management',
    component: AdminReportManagementPage,
  },
  {
    path: '/admin/map-position',
    component: AdminMapPositonPage,
  },
  {
    path: '/admin/feedback-management',
    component: AdminFeedbackManagementPage,
  },
];
