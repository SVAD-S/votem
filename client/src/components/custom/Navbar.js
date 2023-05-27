import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-6 px-6 bg-indigo-500 shadow sm:items-baseline w-full">
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
          <span className="text-white text-lg no-underline text-grey-darkest hover:text-blue-dark mx-4 p-2 font-bold">
            New Election
          </span>
        </Link>

        <Link to="/election-list">
          <span className="text-white text-lg no-underline text-grey-darkest hover:text-blue-dark mx-4 p-2 font-bold">
            Elections
          </span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
