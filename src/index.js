import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Import Tailwind CSS
import App from './App'; // Pastikan ini mengimpor App.js dengan huruf kapital 'A'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
// reportWebVitals() dihapus karena file tidak ditemukan dan tidak esensial untuk aplikasi ini.
