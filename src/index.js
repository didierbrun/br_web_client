import React from 'react';
import './index.css';
import App from './App';
import DolbyOne2One from './pages/DolbyOne2One/DolbyOne2One';
import DolbyLive from './pages/DolbyLive/DolbyLive';
import reportWebVitals from './reportWebVitals';
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "dolbyone2one",
    element: <DolbyOne2One/>
  },
  {
    path: "dolbylive",
    element: <DolbyLive/>
  }
]);


ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
