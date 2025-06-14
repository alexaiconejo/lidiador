import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import Crear from './Crear.tsx';
import Tecnobiblia from './Tecnobiblia.tsx'
import Root from './routes/Root.tsx';  // Asegúrate de que esta ruta esté bien configurada
import { createHashRouter, RouterProvider } from 'react-router-dom';
import './index.css';

// Configuración de las rutas
const router = createHashRouter([
  {
    path: "/",
    element: <Root />,  // Componente raíz que contiene el outlet para rutas hijas
    children: [
      { path: "/", element: <App /> },      // Ruta principal de la aplicación
      { path: "/crear", element: <Crear /> },  // Ruta para la página "Crear"
      { path: "/conoceme", element: <Crear /> }, // Ruta para "Conóceme"
      { path: "/creemos", element: <Crear /> }, // Ruta para "Creemos"
      { path: "/tecnobiblia", element: <Tecnobiblia /> }

      
    ],
  },
]);

// Renderizar el componente con el RouterProvider
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
