import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

console.log('Starting React app...');
console.log('Environment variables:', {
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  HAS_SUPABASE_KEY: !!import.meta.env.VITE_SUPABASE_ANON_KEY
});

const root = ReactDOM.createRoot(document.getElementById('root')!);

try {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log('React app rendered successfully');
} catch (error) {
  console.error('Error rendering React app:', error);
  document.body.innerHTML = `<h1>Error loading app: ${error}</h1>`;
}