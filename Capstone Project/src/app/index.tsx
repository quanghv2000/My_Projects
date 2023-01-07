import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { commonRouter, CommonRoute } from 'app/pages/common/router';
import { userRouter, PrivateUserRoute } from 'app/pages/user/router';
import { adminRouter, PrivateAdminRoute } from 'app/pages/admin/router';
import { hostRouter, PrivateHostRoute } from 'app/pages/landlord/router';
import { NotFoundPage } from 'app/pages/common/not-found-page/screen/Loadable';

import 'antd/dist/antd.min.css';
import { GlobalStyle } from 'styles/global-styles';

export function App() {
  const userRouteComponents = userRouter?.map((item: any, key) => {
    return item?.private === true ? (
      <PrivateUserRoute
        path={item?.path}
        component={item?.component}
        key={key}
      />
    ) : (
      <Route exact path={item?.path} component={item?.component} key={key} />
    );
  });

  const routeHostComponents = hostRouter?.map(({ path, component }, key) => (
    <PrivateHostRoute exact path={path} component={component} key={key} />
  ));

  const routeAdminComponents = adminRouter?.map(({ path, component }, key) => (
    <PrivateAdminRoute exact path={path} component={component} key={key} />
  ));

  const routeCommonComponents = commonRouter?.map(
    ({ path, component }, key) => (
      <CommonRoute exact path={path} component={component} key={key} />
    )
  );

  return (
    <BrowserRouter>
      <Switch>
        {/* User Route */}
        {userRouteComponents}

        {/* Host Route */}
        {routeHostComponents}

        {/* Admin Route */}
        {routeAdminComponents}

        {/* Common Route */}
        {routeCommonComponents}

        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </BrowserRouter>
  );
}
