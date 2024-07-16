import type { FC } from 'react';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '@components/Header';

// import { useRefreshPagePhonebook } from '@hooks/useRefreshPagePhonebook';

const Layout: FC = () => {
  // useRefreshPagePhonebook();

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

export default Layout;
