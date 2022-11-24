/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { NotFoundPage } from 'app/pages/common';
import { PrivateUserRoute, userRoutes } from 'routes/user-routes';
import { adminRoutes, PrivateAdminRoute } from 'routes/admin-routes';

import 'antd/dist/antd.min.css';
import './global-style.scss';

export function App() {
  const { i18n } = useTranslation();

  /** Routes */
  const userRouteComponents = userRoutes?.map((item: any, key) => {
    return item?.private ? (
      <PrivateUserRoute
        path={item?.path}
        component={item?.component}
        key={key}
      />
    ) : (
      <Route exact path={item?.path} component={item?.component} key={key} />
    );
  });

  const adminRouteComponents = adminRoutes?.map((item: any, key) => {
    return item?.private ? (
      <PrivateAdminRoute
        path={item?.path}
        component={item?.component}
        key={key}
      />
    ) : (
      <Route exact path={item?.path} component={item?.component} key={key} />
    );
  });

  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s"
        defaultTitle="My Project Study"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="My Project Study" />
      </Helmet>

      <Switch>
        {/* User Router */}
        {userRouteComponents}

        {/* Admin Router */}
        {adminRouteComponents}

        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}
