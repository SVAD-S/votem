import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ElectionContract from "../build/contracts/ElectionContract.json";
import { ethers } from "ethers";

function ElectionDetails() {
  let { electionId } = useParams();
  const [account, setAccount] = useState("");
  const [candidateList, setCandidateList] = useState([]);
  const [candidateName, setCandidateName] = useState("");
  const [candidateParty, setCandidateParty] = useState("");
  const [candidateID, setCandidateID] = useState(0);
  const Address = ElectionContract.networks[5777].address;
  const [electionStarted, setElectionStarted] = useState(false);
  const [electionEnded, setElectionEnded] = useState(false);
  const handleNameChange = (e) => {
    setCandidateName(e.target.value);
  };
  const handleIDChange = (e) => {
    setCandidateID(e.target.value);
  };
  const handlePartyChange = (e) => {
    console.log(e.target.value);
    setCandidateParty(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (typeof window.ethereum !== "undefined") {
      const contract = await initializeProvider();
      try {
        contract.addCandidate(
          electionId,
          candidateName,
          candidateID,
          candidateParty
        );
      } catch (error) {}
      console.log("Successfull");
    }
  };

  async function initializeProvider() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new ethers.Contract(Address, ElectionContract.abi, signer);
  }

  async function requestAccount() {
    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(account[0]);
  }

  async function startElection() {
    if (typeof window.ethereum !== "undefined") {
      const contract = await initializeProvider();
      try {
        await contract.startElection(electionId);
        console.log("thodangi ");
      } catch (error) {
        console.log(error);
      }
    }
  }
  async function endElection() {
    if (typeof window.ethereum !== "undefined") {
      const contract = await initializeProvider();
      try {
        await contract.stopElection(electionId);
        console.log("nirthi");
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function getElections() {
    if (typeof window.ethereum !== "undefined") {
      const contract = await initializeProvider();
      try {
        let a = await contract.getElectionNames();
        a.map((i) => {
          if (i[0] == electionId) {
            setElectionStarted(i[1]);
            setElectionEnded(i[2]);
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function getCandidates() {
    if (typeof window.ethereum !== "undefined") {
      const contract = await initializeProvider();
      try {
        let a = await contract.getCandidateList(electionId);
        setCandidateList(a);
      } catch (error) {
        console.log(error);
      }
    }
  }
  useEffect(() => {
    getCandidates();
    getElections();
  }, []);
  return (
    <div className="container py-12">
      <h2 className="mt-6 mb-16 text-center text-3xl font-extrabold text-gray-900">
        {electionId}
      </h2>
      Oii
      <br />
      {candidateList.map((i) => (
        <>
          Name:{i[1]}
          <br />
          ID :{parseInt(i[2])}
          <br />
        </>
      ))}
      {electionStarted === false ? (
        <>
          <div className="min-h-screen w-1/2 flex-row items-center justify-center bg-gray-50 py-12 px-16 sm:px-6 lg:px-8">
            <div className="w-full  space-y-8">
              <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                  Add a Candidate
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
                        name="candidate_name"
                        id="candidate_name"
                        className="focus:ring-indigo-500 py-2 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        placeholder="Enter candidate's name"
                        onChange={handleNameChange}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      VoterID
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
                        onChange={handleIDChange}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="candidate_party"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Party
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute mt-2 left-0 pl-3 flex items-center pointer-events-none">
                        {/* <MdOutlineDescription
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                /> */}
                      </div>
                      <select
                        data-te-select-init
                        name="candidate_party"
                        className="focus:ring-indigo-500 py-2 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        onChange={handlePartyChange}
                        required
                        id="candidate_party"
                      >
                        <option value="CPM">CPM</option>
                        <option value="BJP">BJP</option>
                        <option value="Congress">Congress</option>
                      </select>
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
          <button
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-sm text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
            name="action"
            onClick={startElection}
          >
            Start Election
          </button>
        </>
      ) : electionEnded === false ? (
        <>
          Election is currently Ongoing
          <button
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-sm text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
            name="action"
            onClick={endElection}
          >
            End Election
          </button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ElectionDetails;
