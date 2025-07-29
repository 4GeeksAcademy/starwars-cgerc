// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppRoutes } from './routes.jsx'; // Importa AppRoutes en lugar de router
import './index.css'; // Si tienes estilos globales

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
);