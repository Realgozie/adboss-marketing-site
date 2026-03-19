// src/index.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import "./styles/tailwind.css";

const rootEl = document.getElementById('root');
rootEl.textContent = 'Mounting...';

try {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </React.StrictMode>
  );
} catch (e) {
  rootEl.textContent = 'Mount failed: ' + (e?.stack || e);
}

window.addEventListener('error', e => {
  rootEl.textContent = 'Error: ' + (e?.error?.stack || e.message);
});

window.addEventListener('unhandledrejection', e => {
  rootEl.textContent = 'Promise: ' + (e?.reason?.stack || e.reason);
});