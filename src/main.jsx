import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store.js';
import './index.css';
import Auth0ProviderNavigate from './auth/Auth0ProviderNavigate.jsx';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Auth0ProviderNavigate>
          <Toaster visibleToasts={1} position='top-right' richColors/>
          <CssBaseline />
          <App />
        </Auth0ProviderNavigate>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
