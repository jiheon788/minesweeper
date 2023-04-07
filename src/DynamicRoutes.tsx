import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import RouterMeta from '@/meta/RouterMeta';
import Layout from './components/Layout';

const lazyImport = (pageName: string) => lazy(() => import(`@/pages/${pageName}`));

const pages = Object.keys(RouterMeta).map((componentKey: string) => {
  return {
    Component: lazyImport(componentKey),
    path: RouterMeta[componentKey].path,
  };
});

const DynamicRoutes = () => (
  <Routes>
    <Route element={<Layout />}>
      {pages.map(({ Component, path }) => (
        <Route
          key={path}
          path={path}
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Component />
            </Suspense>
          }
        />
      ))}
    </Route>
  </Routes>
);

export default DynamicRoutes;
