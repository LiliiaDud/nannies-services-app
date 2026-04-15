import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { BrowserRouter } from "react-router-dom";
import { ModalProvider } from './components/ModalContext/ModalProvider.tsx'

import './index.css';
import App from './app/App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ModalProvider>
        <App />
      </ModalProvider>
    </BrowserRouter>
  </StrictMode>
);
