import { SignIn } from 'app/pages/authentication/signin-page/screen/Loadable';
import { SignUp } from 'app/pages/authentication/signup-page/screen/Loadable';
import { AboutUser } from 'app/pages/user/about-user-page/Loadable';
import { AccommodationPage } from 'app/pages/user/accommodation-page/screen/Loadable';
import { BlogPage } from 'app/pages/user/blog-page/Loadable';
import { DetailRoomPage } from 'app/pages/user/detail-room-page/screen/Loadable';
import { HomePage } from 'app/pages/user/home-page/screen/Loadable';
import { SuggestionPage } from 'app/pages/user/suggestion-page/screen/Loadable';
import { Redirect, Route } from 'react-router-dom';
// import { getCookie } from 'utils/request';
import { UserProfile } from 'app/pages/user/user-profile-page/screen/Loadable';
import { VerifyAccount } from 'app/pages/authentication/verify-account/Loadable';
import { ReceiveRoomNotification } from 'app/pages/user/receive-room-notification/screen/Loadable';

export const PrivateUserRoute: React.FC<any> = (props) => {
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
        token && userInfo?.role ? (
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

export const userRouter = [
  { path: '/', component: HomePage, private: false },
  { path: '/sign-in', component: SignIn, private: false },
  { path: '/sign-up', component: SignUp, private: false },
  { path: '/blog', component: BlogPage, private: false },
  { path: '/accommodation', component: AccommodationPage, private: false },
  { path: '/post/:id', component: DetailRoomPage, private: false },
  { path: '/post/:id/:roomId', component: DetailRoomPage, private: false },
  { path: '/suggesstion', component: SuggestionPage, private: false },
  { path: '/user-profile', component: UserProfile, private: true },
  { path: '/user', component: AboutUser, private: true },
  { path: '/user/:selected', component: AboutUser, private: true },
  { path: '/verify-account', component: VerifyAccount, private: false },
  {
    path: '/receive-room-notification',
    component: ReceiveRoomNotification,
    private: false,
  },
];
