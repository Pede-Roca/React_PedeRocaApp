import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import axios from 'axios'
import './index.css'

axios.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");

  if (token) config.headers.Authorization = sessionStorage.getItem("token");
  else delete config.headers.Authorization;

  return config;
}, (error) => {
  return Promise.reject(error);
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
