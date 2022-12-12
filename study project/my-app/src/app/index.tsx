import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import { routes } from 'routes';
import { ProtectedRoute } from 'routes/protected-route';

const App: React.FC = () => {
  const renderRoutes = () =>
    routes.map((route, index) => {
      const { path, page: Page, layout: Layout, authorities } = route;

      return route.isProtected ? (
        <Route
          key={index}
          path={path}
          element={<ProtectedRoute page={Page} layout={Layout} authorities={authorities} />}
        />
      ) : (
        <Route key={index} path={path} element={<Layout content={Page} />} />
      );
    });

  return (
    <>
      <Router>
        <Routes>{renderRoutes()}</Routes>
      </Router>
      <NotificationContainer />
    </>
  );
};

export default App;
