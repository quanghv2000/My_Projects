import TEMPLATE00Layout from 'app/components/layouts/TEMPLATE00';

import {
  AboutMePageTEMPLATE00,
  ContactPageTEMPLATE00,
  ResumePageTEMPLATE00,
} from 'app/container/subsystem/TEMPLATE00/pages';

/** @Routes */
export const routes = [
  {
    path: '/resume',
    content: ResumePageTEMPLATE00,
    layout: TEMPLATE00Layout,
  },
  {
    path: '/about-me',
    content: AboutMePageTEMPLATE00,
    layout: TEMPLATE00Layout,
  },
  {
    path: '/contact',
    content: ContactPageTEMPLATE00,
    layout: TEMPLATE00Layout,
  },
];
