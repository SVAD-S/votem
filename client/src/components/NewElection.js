import React, { useState } from "react";
import ElectionContract from "../build/contracts/ElectionContract.json";
import { ethers } from "ethers";
import { useAuthContext } from "./custom/hooks/useAuthContext";
import { notifyError, notifySuccess } from "./Toast/Toasters";

function NewElection() {
  const [account, setAccount] = useState("");
  const [electionName, setElectionName] = useState("");
  const [electionDesc, setElectionDesc] = useState("");
  const Address = ElectionContract.networks[5777].address;
  const { setLoading, clearLoading } = useAuthContext();

  let provider = null;

  const handleNameChange = (e) => {
    setElectionName(e.target.value);
  };
  const handleDescChange = (e) => {
    setElectionDesc(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createElection();
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

  async function createElection() {
    if (typeof window.ethereum !== "undefined") {
      const contract = await initializeProvider();

      console.log(electionName, electionDesc);
      setLoading();
      try {
        const transaction = await contract.createElection(
          electionName,
          electionDesc
        );
        const recipt = await provider.waitForTransaction(transaction?.hash);
        if (recipt?.status === 1) {
          console.log("Election creation confirmed");
          notifySuccess("Election creation confirmed");
        } else {
          console.log("Election creation failed");
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
      }
    }
  }

  return (
    <div className="flex flex-row items-center justify-center bg-gray-50 py-12 px-16 sm:px-6 lg:px-8">
      <div className="w-1/3 space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            New Election
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
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
                  onChange={handleNameChange}
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
                Description
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
                  onChange={handleDescChange}
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

export default NewElection;
