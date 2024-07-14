import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App';

import { persistor, store } from '@redux/store';

import GlobalStyles from '@assets/styles/globalStyles';
import ColorMode from '@assets/styles/theme';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ColorMode.ToggleColorMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <GlobalStyles />
          <App />
          <ToastContainer autoClose={3000} position="top-right" />
        </PersistGate>
      </Provider>
    </ColorMode.ToggleColorMode>
  </React.StrictMode>
);
