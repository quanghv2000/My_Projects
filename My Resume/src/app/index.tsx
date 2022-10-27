/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from '../styles/global-styles';
import { NotFoundPage } from 'app/container/common/not-found-page/Loadable';
import { useTranslation } from 'react-i18next';
import { routes } from 'routes';

import './style.scss';

export function App() {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s"
        defaultTitle=""
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="My Resume" />
      </Helmet>
      <Switch>
        {routes.map((route, index) => {
          const Content = route.content;
          return (
            <Route
              key={index}
              path={route.path}
              render={props => (
                <route.layout {...props} content={<Content />} />
              )}
            />
          );
        })}
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </BrowserRouter>
  );
}
