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
import './global-style.scss';

export function App() {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s"
        defaultTitle="Hola Market"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="Hola Market" />
      </Helmet>

      <Switch>
        {routes.map((route, index) => {
          const Content = route.content;
          const breadcrumbs = route.breadcrumbs ?? null;
          return (
            <Route
              exact
              key={index}
              path={route.path}
              render={props =>
                route.layout ? (
                  <route.layout
                    {...props}
                    content={<Content />}
                    breadcrumbs={breadcrumbs}
                  />
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
