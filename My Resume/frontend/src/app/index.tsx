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
import { routes } from 'routes';

import 'antd/dist/antd.min.css';
import './global-style.css';

export function App() {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s"
        defaultTitle="My Resume"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="My Resume" />
      </Helmet>

      <Switch>
        {routes.map((route, index) => {
          const Content = route.content;
          return (
            <Route
              exact
              key={index}
              path={route.path}
              render={props =>
                route.layout ? (
                  <route.layout {...props} content={<Content />} />
                ) : (
                  <route.content />
                )
              }
            />
          );
        })}
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}
