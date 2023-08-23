import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

export const Layout = () => {
  return (
    <div>
      <Header position="sticky" />
      <div
        style={{
          marginTop: 64,
          padding: 16,
        }}
      >
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};
