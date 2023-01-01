/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routes } from 'routes';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => {
          const { path, page, layout: Layout } = route;

          return <Route key={index} path={path} element={<Layout content={page} />} />;
        })}
      </Routes>
    </BrowserRouter>
  );
}
