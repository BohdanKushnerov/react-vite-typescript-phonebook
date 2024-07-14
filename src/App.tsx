import AppRouter from '@router/AppRouter';

import { useAuth } from '@hooks/useAuth';

const App = () => {
  useAuth();

  return <AppRouter />;
};

export default App;
