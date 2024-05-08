import React from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorProvider } from './context/error';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorProvider>
      <App />
    </ErrorProvider>
  </React.StrictMode>
)


