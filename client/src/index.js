import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ErrorPage from "./components/Error-page";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import UserLogin from "./components/Login/UserLogin";
import SignUp from "./components/SignUp/SignUp";
import NewElection from "./components/NewElection";
import ElectionData from "./components/ElectionData";
import ViewResult from "./components/ViewResult";


import { AuthContextProvider } from "./components/custom/context/AuthContext";

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
        path: "/newelection",
        element: <NewElection />,
      },
      {
        path: "/new-election",
        element: <NewElection />,
      },
      {
        path: "/election-list",
        element: <ElectionData />,
      },
      {
        path: "/view-results",
        element: <ViewResult />,
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);
