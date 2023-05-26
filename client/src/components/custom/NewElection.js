import React, { Component } from "react";
import axios from "axios";

class NewElection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      election_name: "",
      election_organizer: "",
      election_password: "",
    };
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { election_name, election_organizer, election_password } = this.state;
    console.log(election_name);
    axios
      .post("http://localhost:8000/api/electionName", {
        election_name: election_name,
        election_organizer: election_organizer,
        election_password: election_password,
      })
      .then(function (response) {
        window.location.assign("/");
      })
      .catch(function (err) {
        console.error(err);
      });
  };

  render() {
    return (
      <div className="min-h-screen w-1/2 flex-row items-center justify-center bg-gray-50 py-12 px-16 sm:px-6 lg:px-8">
        <div className="w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              New Election
            </h2>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                {/* NAME */}
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Election name
                </label>

                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {/* <MdOutlineDriveFileRenameOutline
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      /> */}
                  </div>

                  <input
                    name="election_name"
                    id="election_name"
                    className="focus:ring-indigo-500 py-2 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Enter election name"
                    onChange={this.handleInputChange}
                    required
                  />
                </div>
              </div>
              {/* ORGANIZER */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Organizer
                </label>

                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {/* <MdOutlineDriveFileRenameOutline
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      /> */}
                  </div>

                  <input
                    name="election_organizer"
                    id="election_organizer"
                    className="focus:ring-indigo-500 py-2 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Enter election organizer"
                    onChange={this.handleInputChange}
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
                    name="election_password"
                    id="election_password"
                    className="focus:ring-indigo-500 py-2 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Enter election password"
                    onChange={this.handleInputChange}
                    required
                    type="password"
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
    );
  }
}

export default NewElection;
