import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ErrorPage from "./components/custom/Error-page";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/custom/Login";
import Home from "./components/custom/Home";
import UserLogin from "./components/Login/UserLogin";
import SignUp from "./components/SignUp/SignUp";
import NewElection from "./components/custom/NewElection";
import ElectionData from "./components/custom/ElectionData";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/admin-login",
        element: <Login />,
      },
      {
        path: "/user-login",
        element: <SignUp />,
      },
      {
        path: "/new-election",
        element: <NewElection />,
      },
      {
        path: "/election-list",
        element: <ElectionData />,
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
