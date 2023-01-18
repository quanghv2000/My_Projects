import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import { ModalOpening, Header, LoadingSpinner } from 'components';
import { routes } from 'routes';

export const App: React.FC = () => {
  const renderRoutes = () =>
    routes.map((route, index) => {
      const { path, page: Page } = route;
      return <Route key={index} path={path} element={<Page />} />;
    });

  return (
    <>
      <Router>
        <Header />
        <Routes>{renderRoutes()}</Routes>
      </Router>
      <ModalOpening />
      <LoadingSpinner />
      <NotificationContainer />
    </>
  );
};
