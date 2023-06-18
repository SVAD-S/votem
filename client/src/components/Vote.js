import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ElectionContract from "../build/contracts/ElectionContract.json";
import { ethers } from "ethers";
import { useAuthContext } from "./custom/hooks/useAuthContext";
import { notifyError, notifySuccess } from "./Toast/Toasters";

function Vote() {
  let { electionId } = useParams();
  const [account, setAccount] = useState("");
  const [candidateList, setCandidateList] = useState([]);
  const { setLoading, clearLoading } = useAuthContext();
  const Address = ElectionContract.networks[5777].address;
  let provider = null;

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

  async function voteCandidate(candidate) {
    if (typeof window.ethereum !== "undefined") {
      const contract = await initializeProvider();
      setLoading();
      try {
        const transaction = await contract.vote(electionId, candidate);
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
  }, []);
  return (
    <div className="container py-12">
      <div className="flex flex-col justify-center">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {electionId}
        </h2>
        <span className="mt-3 mb-16 text-center text-sm font-extrabold text-green-500">
          Active
        </span>
      </div>

      <div className="px-16 sm:px-6 lg:px-8">
        <h2 className="mt-6 mb-16 text-center text-2xl font-bold text-gray-900">
          Candidates
        </h2>
        {candidateList.map((candidates, index) => (
          <>
            <div
              className="flex mt-4 px-4 py-1 items-center justify-between  border rounded-md hover:bg-zinc-100"
              key={candidates[0]}
            >
              <div>
                <p className="w-full text-grey-darkest font-bold">
                  {candidates[1]}
                </p>
              </div>
              <button
                onClick={() => voteCandidate(index + 1)}
                className="flex-no-shrink p-2 text-sm ml-2 border-2 rounded text-green-500 border-green-500 hover:text-white hover:bg-green-400"
              >
                Vote
              </button>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default Vote;
