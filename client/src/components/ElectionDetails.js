import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ElectionContract from "../build/contracts/ElectionContract.json";
import { ethers } from "ethers";
import { useAuthContext } from "./custom/hooks/useAuthContext";
import { notifyError, notifySuccess } from "./Toast/Toasters";

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
  const { setLoading, clearLoading } = useAuthContext();
  let provider = null;
  let navigate = useNavigate();

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
      setLoading();
      try {
        const transaction = await contract.addCandidate(
          electionId,
          candidateName,
          candidateID,
          candidateParty
        );
        const recipt = await provider.waitForTransaction(transaction?.hash);
        if (recipt?.status === 1) {
          console.log("Candidate added successfully");
          notifySuccess("Candidate added successfully");
        } else {
          console.log("Candidate addition failed");
        }
      } catch (error) {
        notifyError(
          error.message
            ? error.message
            : error.info.error.message
            ? error.info.error.message
            : "Election creation failed"
        );
      } finally {
        clearLoading();
        getCandidates();
      }
      console.log("Successfull");
    }
  };

  async function initializeProvider() {
    provider = new ethers.BrowserProvider(window.ethereum);
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
      setLoading();
      try {
        const transaction = await contract.startElection(electionId);
        console.log("Election start requested");
        const recipt = await provider.waitForTransaction(transaction?.hash);
        if (recipt?.status === 1) {
          console.log("Election start confirmed");
          notifySuccess("Election start confirmed");
        } else {
          console.log("Election start failed");
        }
      } catch (error) {
        notifyError(
          error.message
            ? error.message
            : error.info.error.message
            ? error.info.error.message
            : "Election Starting request failed"
        );
      } finally {
        clearLoading();
        navigate("/election-list");
      }
    }
  }
  async function endElection() {
    if (typeof window.ethereum !== "undefined") {
      const contract = await initializeProvider();
      setLoading();
      try {
        const transaction = await contract.stopElection(electionId);
        console.log("Election stop requested");
        const recipt = await provider.waitForTransaction(transaction?.hash);
        if (recipt?.status === 1) {
          console.log("Election ending confirmed");
          notifySuccess("Election ended successfully");
        } else {
          console.log("Election ending failed");
        }
      } catch (error) {
        notifyError(
          error.message
            ? error.message
            : error.info.error.message
            ? error.info.error.message
            : "Election Ending request failed"
        );
      } finally {
        clearLoading();
        navigate("/election-list");
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
        notifyError(
          error.message
            ? error.message
            : error.info.error.message
            ? error.info.error.message
            : "Election list Fetch failed"
        );
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
        notifyError(
          error.message
            ? error.message
            : error.info.error.message
            ? error.info.error.message
            : "Election list Fetch failed"
        );
      }
    }
  }
  useEffect(() => {
    getCandidates();
    getElections();
  }, []);
  return (
    <div className="container py-12">
      <div className="flex flex-col justify-center">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {electionId}
        </h2>
        {electionStarted === false ? (
          <span className="mt-3 mb-16 text-center text-sm font-extrabold text-yellow-500">
            Not started
          </span>
        ) : electionEnded === false ? (
          <span className="mt-3 mb-16 text-center text-sm font-extrabold text-green-500">
            Ongoing
          </span>
        ) : (
          <span className="mt-3 mb-16 text-center text-sm font-extrabold text-red-500">
            Ended
          </span>
        )}
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2">
        <div class="border-r border-gray-300">
          {electionStarted === false ? (
            <>
              <div className="w-full flex-row items-center justify-center bg-gray-50 px-16 sm:px-6 lg:px-8">
                <div className="w-full  space-y-8">
                  <div>
                    <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
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
                            <option value="" selected disabled>
                              Select an option
                            </option>
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
                <div className="py-8">
                  <button
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-sm text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
                    name="action"
                    onClick={startElection}
                  >
                    Start Election
                  </button>
                </div>
              </div>
            </>
          ) : electionEnded === false ? (
            <>
              <div className="py-12 px-16 sm:px-6 lg:px-8">
                <button
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-sm text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
                  name="action"
                  onClick={endElection}
                >
                  End Election
                </button>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="px-16 sm:px-6 lg:px-8">
          <h2 className="mt-6 mb-16 text-center text-2xl font-bold text-gray-900">
            Current Candidates
          </h2>
          {candidateList.map((candidates) => (
            <>
              <div
                className="flex mt-4 px-4 py-1 items-center justify-between  border rounded-md hover:bg-zinc-100"
                key={candidates[0]}
              >
                <div>
                  <p className="w-full text-grey-darkest font-bold">
                    {candidates[1]}
                  </p>
                  <p className="text-zinc-500 italic">{candidates.details}</p>
                </div>
                <button className="text-green-500 text-xl font-bold m-2">
                  {candidates[3]}
                </button>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ElectionDetails;
