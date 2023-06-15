import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ElectionData = () => {
  const [electionList, setElectionList] = useState([]);

  const handleInputChange = (e) => {};

  async function getElections() {
    // if (typeof window.ethereum !== "undefined") {
    //   const contract = await initializeProvider();
    // try {
    //   let a = await contract.getElectionNames();
    //   console.log(a.toString());
    // } catch (error) {
    //   console.log(error);
    // }
    //  }
  }

  useEffect(() => {
    getElections();
  }, []);

  return (
    <div className="container py-12">
      <h2 className="mt-6 mb-16 text-center text-3xl font-extrabold text-gray-900">
        Active Elections
      </h2>
      {electionList.map((election) => (
        <>
          <div
            className="flex mt-4 px-4 py-1 items-center  border rounded-md hover:bg-zinc-100"
            key={election.election_id}
          >
            <p className="w-full text-grey-darkest">{election.election_name}</p>
            <Link
              to={`/candidates/${election.election_id}`}
              className="title"
              onClick={handleInputChange}
            >
              <button className="flex-no-shrink p-2 text-sm ml-4 mr-2 border-2 rounded hover:text-white text-green-600 border-green-500 hover:bg-green-400">
                Add candidate
              </button>
            </Link>
            <Link
              to={`/voteCount/${election.election_id}`}
              className="title"
              onClick={handleInputChange}
            >
              <button className="flex-no-shrink p-2 text-sm ml-2 border-2 rounded text-yellow-500 border-yellow-500 hover:text-white hover:bg-yellow-400">
                View vote count
              </button>
            </Link>
          </div>
        </>
      ))}
    </div>
  );
};

export default ElectionData;
