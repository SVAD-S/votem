import React, { Component } from "react";
import Web3 from "web3";
import Election from "../../build/Election.json";

class NewCandidate extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockChain();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
    console.log(e.target.id + "have value" + e.target.value);
  };

  async loadBlockChain() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    const networkId = await web3.eth.net.getId();
    const networkData = Election.networks[networkId];
    if (networkData) {
      const election = new web3.eth.Contract(Election.abi, networkData.address);
      this.setState({ election });
    } else {
      window.alert("Election contract not deployed to detected network.");
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.addCandidates();
  };

  addCandidates() {
    console.log(this.state);
    this.setState({ loading: true });
    this.state.election.methods
      .addCandidate(
        this.state.candidate_name,
        this.state.candidate_details,
        this.state.id
      )
      .send({ from: this.state.account })
      .once("receipt", (receipt) => {
        console.log(receipt);
        this.setState({ loading: false });
        window.location.assign("/");
      });
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      election: null,
      candidate_name: null,
      candidate_details: null,
      id: null,
    };
    this.addCandidates = this.addCandidates.bind(this);
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    this.setState({
      id: id,
    });
  }

  render() {
    return (
      <div className="min-h-screen w-1/2 flex-row items-center justify-center bg-gray-50 py-12 px-16 sm:px-6 lg:px-8">
        <div className="w-full  space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Add a Candidate
            </h2>
          </div>
          <form onSubmit={this.handleSubmit}>
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
                    name="candidate_name"
                    id="candidate_name"
                    className="focus:ring-indigo-500 py-2 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Enter candidate's name"
                    onChange={this.handleInputChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute mt-2 left-0 pl-3 flex items-center pointer-events-none">
                    {/* <MdOutlineDescription
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                /> */}
                  </div>
                  <textarea
                    type="text"
                    rows="10"
                    name="candidate_details"
                    id="candidate_details"
                    className="focus:ring-indigo-500 py-2 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Add candidate's description. Max: 150 characters"
                    onChange={this.handleInputChange}
                    maxLength="150"
                    required
                  />
                </div>
              </div>
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

export default NewCandidate;
