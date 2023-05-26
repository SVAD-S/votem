import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ElectionData = () => {
  const [electionList, setElectionList] = useState([]);
  const [id, setId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/electionName", {})
      .then((response) => {
        const data = response.data;
        setElectionList(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleInputChange = (e) => {
    const name = e.target.innerHTML;
    const index = electionList.findIndex(
      (election) => election.election_name === name
    );
    setId(electionList[index].election_id);
  };

  return (
    <div className="container py-8">
      <h2 className="mt-3 mb-16 text-center text-3xl font-extrabold text-gray-900">
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
