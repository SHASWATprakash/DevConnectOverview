import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import { Provider } from 'react-redux'; // Import Provider
import { store } from './redux/store'; // Import the Redux store
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}> {/* Keep Provider */}
      <Router> {/* Wrap with Router */}
        <App />
      </Router> {/* Close Router */}
    </Provider> {/* Close Provider */}
  </React.StrictMode>
);
