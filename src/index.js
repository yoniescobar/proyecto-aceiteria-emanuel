import React from "react";
import ReactDOM from "react-dom";
import './index.css'
import ErrorPage from "./error-page";

import {
    createBrowserRouter,
    RouterProvider,
    Route,
  } from "react-router-dom";
  import Root from "./routes/root";
import Contenido from "./Layout/Contenido";
import AddVenta from "./routes/AddVenta";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Contenido /> },
        {
          path: "venta/add",
          element: <AddVenta />,
        },
      ],      
    },
  ]);


  ReactDOM.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
    document.getElementById('root')
  );