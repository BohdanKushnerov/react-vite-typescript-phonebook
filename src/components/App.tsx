import { useAuth } from '@hooks/useAuth';
import AppRouter from '@routes/AppRouter';

const App = () => {
  useAuth();

  return <AppRouter />;
};

export default App;
