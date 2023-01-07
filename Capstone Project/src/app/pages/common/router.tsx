import { Route } from 'react-router-dom';

import { SupportPage } from 'app/pages/common/support-page/screen/Loadable';

export const CommonRoute: React.FC<any> = (props) => {
  const { component: Component, ...restProps } = props;

  if (!Component) return null;

  return (
    <Route
      {...restProps}
      render={(routeRenderProps) => <Component {...routeRenderProps} />}
    />
  );
};

export const commonRouter = [
  { path: '/support', component: SupportPage, private: false },
];
