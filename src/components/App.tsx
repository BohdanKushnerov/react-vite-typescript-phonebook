import { useAuth } from '@hooks/useAuth';
import AppRouter from '@routes/AppRouter';

const App = () => {
  console.log('app');
  useAuth();

  return <AppRouter />;
};

export default App;
