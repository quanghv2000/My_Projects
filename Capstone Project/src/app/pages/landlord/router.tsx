import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
// import { getCookie } from 'utils/request';
import { HostHousePage } from 'app/pages/landlord/landlord-house-page/screen/Loadable';
import { HostRoomPage } from 'app/pages/landlord/landlord-room-page/screen/Loadable';
import { HouseCreatePage } from 'app/pages/landlord/house-create-page/screen/Loadable';
import { RoomCreatePage } from 'app/pages/landlord/room-create-page/screen/Loadable';
import { HostRoomDetailPage } from 'app/pages/landlord/host-room-detail-page/screen/Loadable';
import { HostHouseDetailPage } from 'app/pages/landlord/host-house-detail-page/screen/Loadable';
import { HostProfilePage } from 'app/pages/landlord/host-profile-page/screen/Loadable';
import { HostDashboardPage } from 'app/pages/landlord/host-dashboard/screen/Loadable';
import { HostPostManagementPage } from 'app/pages/landlord/host-post-management-page/screen/Loadable';

export const PrivateHostRoute: React.FC<any> = (props) => {
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
        token && userInfo?.role?.id === 3 ? (
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

export const hostRouter = [
  { path: '/host/dashboard', component: HostDashboardPage },
  { path: '/host/house/create', component: HouseCreatePage },
  { path: '/host/house', component: HostHousePage },
  { path: '/host/house/:id', component: HostHouseDetailPage },
  { path: '/host/room/create', component: RoomCreatePage },
  { path: '/host/room', component: HostRoomPage },
  { path: '/host/room/:id', component: HostRoomDetailPage },
  { path: '/host/profile', component: HostProfilePage },
  { path: '/host/post-management', component: HostPostManagementPage },
];
