import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./custom/context/AuthContext";
import { useContext } from "react";
import { useAuthContext } from "./custom/hooks/useAuthContext";

function Navbar() {
  const { user, loading, error, dispatch } = useContext(AuthContext);
  //{loading ? ():()
  console.log(user);

  const handleClick = () => {
    console.log("admin logout");
    dispatch({ type: "LOGOUT" });
    sessionStorage.removeItem("user");
  };

  //console.log(user.isAdmin);
  return (
    <nav className="font-sans flex flex-col flex-grow-0 text-center sm:flex-row sm:text-left sm:justify-between py-6 px-6 bg-indigo-500 shadow sm:items-baseline w-full">
      <div className="mb-2 sm:mb-0">
        <Link to="/">
          <span className="font-extrabold text-2xl text-white">Votem</span>
        </Link>
      </div>
      <div>
        <Link to="/">
          <span className="text-white text-lg no-underline text-grey-darkest hover:text-blue-dark mx-4 p-2 font-bold">
            Home
          </span>
        </Link>

        <Link to="/new-election">
          {user ? (
            <span className="text-white text-lg no-underline text-grey-darkest hover:text-blue-dark mx-4 p-2 font-bold">
              New Election
            </span>
          ) : (
            <span></span>
          )}
        </Link>

        <Link to="/election-list">
          {user ? (
            <span className="text-white text-lg no-underline text-grey-darkest hover:text-blue-dark mx-4 p-2 font-bold">
              Elections
            </span>
          ) : (
            <span></span>
          )}
        </Link>

        <Link to="/view-results">
          <span className="text-white text-lg no-underline text-grey-darkest hover:text-blue-dark mx-4 p-2 font-bold">
            View Results
          </span>
        </Link>


        <Link to="/" onClick={handleClick}>
          {user ? (
            <span className="text-white text-lg no-underline text-grey-darkest hover:text-blue-dark mx-4 p-2 font-bold">
              Logout
            </span>
          ) : (
            <span></span>
          )}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
