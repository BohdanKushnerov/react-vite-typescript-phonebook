import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';

import App from '@components/App';
import { persistor, store } from '@redux/store';
import ColorMode from '@assets/styles/theme';
import GlobalStyles from '@assets/styles/globalStyles';
import React from 'react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ColorMode.ToggleColorMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter basename="/react-vite-typescript-phonebook">
            <GlobalStyles />
            <App />
            <ToastContainer autoClose={3000} position="top-right" />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </ColorMode.ToggleColorMode>
  </React.StrictMode>
);
