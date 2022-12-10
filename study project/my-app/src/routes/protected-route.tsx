import React, { FunctionComponent } from 'react';
import { ROUTES } from './constants';

type IProps = {
  page: FunctionComponent<any>;
  layout: FunctionComponent<any>;
};

export const ProtectedRoute: React.FC<IProps> = (props) => {
  /** @Props_Value */
  const { page: Page, layout: Layout } = props;

  const authed = true;
  const authorized = true;

  if (!authed) {
    window.location.href = ROUTES.UNAUTHORIZED_PAGE_ROUTE;
  } else if (!authorized) {
    window.location.href = ROUTES.FORBIDDEN_PAGE_ROUTE;
  }

  return <>{authed && authorized && <Layout content={Page} />}</>;
};
