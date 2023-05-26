import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Choose = () => {
  const [election_name, setElectionName] = useState([]);
  const [election_organizer, setElectionOrganizer] = useState([]);
  const [election_id, setElectionId] = useState([]);
  const [final, setFinal] = useState([]);
  const [id, setId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/electionName", {})
      .then(function (response) {
        var data = response.data;
        setFinal(data);
      })
      .catch(function (err) {
        console.error(err);
      });
  }, []);

  const handleInputChange = (e) => {
    // console.log(e.target.innerHTML);
    var name = e.target.innerHTML;
    var index = 0;
    for (let i = 0; i < election_name.length; i++) {
      if (name === election_name[i]) {
        index = i;
        break;
      }
    }
    var id = election_id[index];
    setId(id);
  };

  const electionList = final.map((election) => {
    return (
      <>
        <div
          className="flex mt-4 px-4 py-1 items-center  border rounded-md hover:bg-zinc-100"
          key={election.election_id}
        >
          <p className="w-full text-grey-darkest">{election.election_name}</p>
          <Link
            to={"/vote/" + election.election_id}
            className="title"
            onClick={handleInputChange}
          >
            <button className="flex-no-shrink py-2 px-4 text-sm ml-4 mr-2 border-2 rounded hover:text-white text-green-600 border-green-500 hover:bg-green-400">
              Vote
            </button>
          </Link>
        </div>
      </>
    );
  });

  return (
    <div className="container py-10">
      <ul className="collection">
        <li className="collection-item avatar">
          <h3 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Elections
          </h3>
        </li>
        {electionList}
      </ul>
    </div>
  );
};

export default Choose;
