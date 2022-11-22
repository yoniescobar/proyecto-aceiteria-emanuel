import React from "react";
import ReactDOM from "react-dom";
import './index.css'

import {
    createBrowserRouter,
    RouterProvider,
    Route,
  } from "react-router-dom";
  import Root from "./routes/root";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
    },
  ]);


  ReactDOM.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
    document.getElementById('root')
  );