import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Import global styles if you have any
import App from './App'; // Import the root App component
import reportWebVitals from './reportWebVitals'; // Optional: For measuring performance
import '@fortawesome/fontawesome-free/css/all.min.css';

// Render the App component into the root div in the public/index.html file
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Optional: Measure performance and log results
reportWebVitals(console.log);
