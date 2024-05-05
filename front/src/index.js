import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from correct location

import App from './App'; // Import or define App component

const root = document.getElementById('root');

// Use createRoot instead of ReactDOM.render
createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
