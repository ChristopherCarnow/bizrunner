import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

// The app can run in two modes:
// 1. React Mode (requires <div id="root">)
// 2. Vanilla/Static Mode (uses existing HTML content)
// We only initialize React if the root element exists to prevent runtime errors in Vanilla mode.
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.log("Running in Vanilla Static Mode (no #root detected). React initialization skipped.");
}