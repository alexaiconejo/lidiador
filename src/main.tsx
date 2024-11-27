import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import Crear from './Crear.tsx';
import Root from './routes/Root.tsx';
import { createHashRouter, RouterProvider } from "react-router-dom";


import './index.css'

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <App />},
      { path: "/crear", element: <Crear /> },
      { path: "/conoceme", element: <Crear /> },
      { path: "/creemos", element: <Crear /> },
      { path: "/crear", element: <Crear /> }

    ],
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
