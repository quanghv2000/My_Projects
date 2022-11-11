import { AppLayout } from 'app/layouts/app-layout';
import { AboutMePage } from 'app/pages/about-me';
import { ContactPage } from 'app/pages/contact';
import { MyProjectsPage } from 'app/pages/my-projects';
import { ResumePage } from 'app/pages/resume';

/** @Routes */
export const routes = [
  {
    path: '/',
    content: ResumePage,
    layout: AppLayout,
  },
  {
    path: '/resume',
    content: ResumePage,
    layout: AppLayout,
  },
  {
    path: '/my-projects',
    content: MyProjectsPage,
    layout: AppLayout,
  },
  {
    path: '/about-me',
    content: AboutMePage,
    layout: AppLayout,
  },
  {
    path: '/contact',
    content: ContactPage,
    layout: AppLayout,
  },
];
