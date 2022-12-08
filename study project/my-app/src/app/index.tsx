import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import { routes } from 'routes';

const App: React.FC = () => {
  const renderRoutes = () =>
    routes.map((route, index) => {
      const { path, page: Element, layout: Layout } = route;

      return <Route key={index} path={path} element={<Layout content={Element} />} />;
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
