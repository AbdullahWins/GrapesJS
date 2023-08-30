import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'grapesjs/dist/css/grapes.min.css'; // Import GrapesJS styles
import './index.css'; // Your project's styles
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/Router";

const Router = routes;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <RouterProvider router={Router}>
    <App /></RouterProvider>
  </React.StrictMode>,
)
