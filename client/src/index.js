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
import ElectionResult from "./components/ElectionResult";

import { AuthContextProvider } from "./components/custom/context/AuthContext";
import ElectionDetails from "./components/ElectionDetails";
import VotableElections from "./components/VotableElections";

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
      {
        path: "/election-details/:electionId",
        element: <ElectionDetails />,
      },
      {
        path: "/election-results/:electionId",
        element: <ElectionResult />,
      },
      {
        path: "/votable-elections",
        element: <VotableElections />,
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </>
);
