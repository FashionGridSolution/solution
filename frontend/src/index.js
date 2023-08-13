import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import authContext from './components/Context/authContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <authContext>
            <App />
    </authContext>
);
