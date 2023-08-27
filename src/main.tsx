import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import App from '@components/App';
import { Provider } from 'react-redux';
import { persistor, store } from '@redux/store';
import { ToggleColorMode } from '@assets/styles/theme';
import { ToastContainer } from 'react-toastify';
import GlobalStyles from '@assets/styles/globalStyles';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToggleColorMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter basename="/react-vite-typescript-phonebook">
            <GlobalStyles />
            <App />
            <ToastContainer autoClose={3000} position="top-right" />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </ToggleColorMode>
  </React.StrictMode>
);
