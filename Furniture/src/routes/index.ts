import { lazyLoad } from 'utils/loadable';

export interface IRoutes {
  path: string;
  page: (props: any) => JSX.Element;
  layout: (props: any) => JSX.Element;
  isPrivate: boolean;
  roles?: string[];
}

/** @Layout_Page */
const AdminLayout = lazyLoad(
  () => import('app/layouts/admin-layout'),
  module => module.AdminLayout,
);
const UserLayout = lazyLoad(
  () => import('app/layouts/user-layout'),
  module => module.UserLayout,
);
const FragmentLayout = lazyLoad(
  () => import('app/layouts/fragment-layout'),
  module => module.FragmentLayout,
);

/** @Common_Page */
const NotFoundPage = lazyLoad(
  () => import('app/pages/common/not-found-page'),
  module => module.NotFoundPage,
);

/** @User_Page */
const HomePage = lazyLoad(
  () => import('app/pages/user/home-page'),
  module => module.HomePage,
);
const IntroPage = lazyLoad(
  () => import('app/pages/user/intro-page'),
  module => module.IntroPage,
);
const OrderingGuidePage = lazyLoad(
  () => import('app/pages/user/ordering-guide-page'),
  module => module.OrderingGuidePage,
);
const InfoPage = lazyLoad(
  () => import('app/pages/user/info-page'),
  module => module.InfoPage,
);
const WarrantyPage = lazyLoad(
  () => import('app/pages/user/warranty-page'),
  module => module.WarrantyPage,
);
const ContactPage = lazyLoad(
  () => import('app/pages/user/contact-page'),
  module => module.ContactPage,
);

/** @Admin_Page */
const DashboardPage = lazyLoad(
  () => import('app/pages/admin/dashboard-page'),
  module => module.DashboardPage,
);
const UserMgmtPage = lazyLoad(
  () => import('app/pages/admin/user-mgmt-page'),
  module => module.UserMgmtPage,
);
const SystemMgmtPage = lazyLoad(
  () => import('app/pages/admin/system-mgmt-page'),
  module => module.SystemMgmtPage,
);

export const routes: IRoutes[] = [
  {
    path: '/',
    page: HomePage,
    layout: UserLayout,
    isPrivate: false,
  },
  {
    path: '/trang-chu',
    page: HomePage,
    layout: UserLayout,
    isPrivate: false,
  },
  {
    path: '/gioi-thieu',
    page: IntroPage,
    layout: UserLayout,
    isPrivate: false,
  },
  {
    path: '/huong-dan-mua-hang',
    page: OrderingGuidePage,
    layout: UserLayout,
    isPrivate: false,
  },
  {
    path: '/thong-tin',
    page: InfoPage,
    layout: UserLayout,
    isPrivate: false,
  },
  {
    path: '/bao-hanh',
    page: WarrantyPage,
    layout: UserLayout,
    isPrivate: false,
  },
  {
    path: '/lien-he',
    page: ContactPage,
    layout: UserLayout,
    isPrivate: false,
  },
  {
    path: '/admin/dashboard',
    page: DashboardPage,
    layout: AdminLayout,
    isPrivate: true,
    roles: ['ROLE_ADMIN'],
  },
  {
    path: '/admin/quan-ly-nguoi-dung',
    page: UserMgmtPage,
    layout: AdminLayout,
    isPrivate: true,
    roles: ['ROLE_ADMIN'],
  },
  {
    path: '/admin/quan-ly-he-thong',
    page: SystemMgmtPage,
    layout: AdminLayout,
    isPrivate: true,
    roles: ['ROLE_ADMIN'],
  },
  {
    path: '*',
    page: NotFoundPage,
    layout: FragmentLayout,
    isPrivate: false,
  },
];
