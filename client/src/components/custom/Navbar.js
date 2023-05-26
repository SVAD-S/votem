import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";

class Navbar extends Component {
  state = {
    location: "",
  };

  componentWillReceiveProps() {
    console.log(this.props);
    this.setState({
      location: this.props.history.location.pathname,
    });
  }
  render() {
    if (
      this.state.location === "/" ||
      this.state.location === "/choose" ||
      this.state.location === "/vote" ||
      this.state.location === "/login"
    ) {
      return (
        <nav className="absolute font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-6 px-6 bg-indigo-500 shadow sm:items-baseline w-full">
          <div className="mb-2 sm:mb-0">
            <NavLink to="/">
              <span className="font-extrabold text-2xl text-white">Votem</span>
            </NavLink>
          </div>
        </nav>
      );
    } else {
      return (
        <nav className="fixed font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-6 px-6 bg-indigo-500 shadow sm:items-baseline w-full">
          <div className="mb-2 sm:mb-0">
            <NavLink to="/">
              <span className="font-extrabold text-2xl text-white">Votem</span>
            </NavLink>
          </div>
          <div>
            <NavLink to="/">
              <span className="text-white text-lg no-underline text-grey-darkest hover:text-blue-dark mx-4 p-2 font-bold">
                Home
              </span>
            </NavLink>

            <NavLink to="/newelection">
              <span className="text-white text-lg no-underline text-grey-darkest hover:text-blue-dark mx-4 p-2 font-bold">
                New Election
              </span>
            </NavLink>

            <NavLink to="/elections">
              <span className="text-white text-lg no-underline text-grey-darkest hover:text-blue-dark mx-4 p-2 font-bold">
                Elections
              </span>
            </NavLink>
          </div>
        </nav>
      );
    }
  }
}

export default withRouter(Navbar);
