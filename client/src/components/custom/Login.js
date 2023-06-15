import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "./hooks/useAuthContext"

import { useContext } from "react";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { user, loading, error, dispatch } = useAuthContext();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
//added context api
  const handleSubmit = (e) => {
    e.preventDefault();
    try{
    dispatch({ type: "LOGIN_START" });
    axios.post("http://localhost:8000/api/adminLogin", {
        username,
        password,
      })
      .then(function (response) {
        if (response.data) {
          dispatch({ type: "LOGIN_SUCCESS", payload: response.data.details });
         // console.log('Authcontext state new:')
          // console.log('payload', response.data.details)
          // console.log('response data' , response)
         
          window.location.assign("/newelection");
        } else {
          dispatch({type:"LOGIN_FAILURE",payload:{message:"Invalid credentials"}})
          alert("Incorrect Username or Password");
        }
      })
      .catch(function (err) {
        dispatch({ type: "LOGIN_FAILURE", payload: {message:" "} });
        console.error(err);
      });
  }
  catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: {message:" "} });}
};
  //added context api
 
 
  

  return (
    <div className="container w-full bg-gray-50 flex items-center justify-center">
      <div className=" w-1/3 flex-row items-center justify-center bg-gray-50 py-12 px-16 sm:px-6 lg:px-8">
        <div className="w-full space-y-8">
          <div className="my-12">
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
              Admin Login
            </h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>

                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {/* <MdOutlineDriveFileRenameOutline
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      /> */}
                  </div>

                  <input
                    name="name"
                    id="name"
                    className="focus:ring-indigo-500 py-2 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Enter username"
                    onChange={handleUsernameChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>

                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {/* <MdOutlineDriveFileRenameOutline
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      /> */}
                  </div>

                  <input
                    name="password"
                    id="password"
                    type="password"
                    className="focus:ring-indigo-500 py-2 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Enter password"
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
              </div>
              <br></br>
              <button
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-sm text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
                type="submit"
                name="action"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
