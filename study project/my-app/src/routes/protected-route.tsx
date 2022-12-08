import React, { FunctionComponent } from 'react';

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
    window.location.href = '/unauthenticated';
  } else if (!authorized) {
    window.location.href = '/unauthorized';
  }

  return <>{authed && authorized && <Layout content={Page} />}</>;
};
