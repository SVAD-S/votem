import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ElectionContract from "../build/contracts/ElectionContract.json";
import { ethers } from "ethers";
import { useAuthContext } from "./custom/hooks/useAuthContext";
import { notifyError, notifySuccess } from "./Toast/Toasters";

function ElectionResult() {
  let { electionId } = useParams();
  const [account, setAccount] = useState("");
  const [candidateList, setCandidateList] = useState([]);
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

  async function getCandidates() {
    if (typeof window.ethereum !== "undefined") {
      const contract = await initializeProvider();
      try {
        let a = await contract.getCandidateList(electionId);
        let b = [...a].sort((b, a) => (a[4] > b[4] ? 1 : a[4] < b[4] ? -1 : 0));
        setCandidateList(b);
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
        <span className="mt-3 mb-16 text-center text-sm font-extrabold text-red-500">
          Ended
        </span>
      </div>

      <div className="px-16 sm:px-6 lg:px-8">
        <h2 className="mt-6 mb-16 text-center text-2xl font-bold text-gray-900">
          Vote Statistics
        </h2>
        {candidateList.map((candidates, index) => (
          <div
            className="flex mt-4 px-4 py-1 items-center justify-between  border rounded-md hover:bg-zinc-100"
            key={index}
          >
            <div className="w-full flex">
              <p className=" text-grey-darkest font-bold">{candidates[1]}</p>
              {index == 0 ? (
                <span className="text-green-500 px-2 font-bold">
                  ( Winner )
                </span>
              ) : (
                <></>
              )}
            </div>
            <button className="text-green-500 text-xl font-bold m-2">
              {parseInt(candidates[4])}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ElectionResult;
