import React, { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';

type IProps = {
  page: FunctionComponent<any>;
  layout: FunctionComponent<any>;
};

export const ProtectedRoute: React.FC<IProps> = (props) => {
  /** @Props_Value */
  const { page: Page, layout: Layout } = props;

  /** @Router */
  const navigate = useNavigate();

  const authed = true;
  const authorized = true;

  if (!authed) {
    navigate('/unauthenticated');
  }

  if (!authorized) {
    navigate('/unauthorized');
  }

  return <Layout content={Page} />;
};
