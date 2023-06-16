// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract ElectionContract {
    // Struct to store candidate details
    struct Candidate {
        uint id;
        string name;
        uint voterId;
        string partyName;
        uint voteCount;
    }

    // Struct to store election details
    struct ElectionDetails {
        string name;
        string description;
        bool isActive;
        mapping(uint => Candidate) candidates;
        uint candidateCount;
        address admin;
        bool status;
    }

    mapping(address => bool) public admins;
    mapping(string => ElectionDetails) public elections;
    mapping(address => bool) public voters;
    string[] public electionNames;

    event ElectionCreated(string name, string description);
    event CandidateAdded(
        string electionName,
        uint candidateId,
        string candidateName
    );
    event VoteCast(
        string electionName,
        uint candidateId,
        string candidateName,
        address voter
    );
    event CandidateRemoved(
        string electionName,
        string candidateName,
        uint voterId
    );
    event ElectionStarted(string electionName);
    event ElectionStopped(string electionName);

    modifier onlyAdmin() {
        require(admins[msg.sender], "Only admin can perform this action");
        _;
    }

    function createElection(
        string memory name,
        string memory description
    ) public {
        require(
            bytes(name).length > 0 && bytes(description).length > 0,
            "Invalid election details"
        );
        require(
            elections[name].candidateCount == 0,
            "Election with the same name already exists"
        );

        elections[name].name = name;
        elections[name].description = description;
        elections[name].isActive = true;
        elections[name].candidateCount = 0;
        elections[name].admin = msg.sender;
        elections[name].status = false;
        electionNames.push(name);
        emit ElectionCreated(name, description);
        admins[msg.sender] = true;
    }

    function addCandidate(
        string memory electionName,
        uint id,
        string memory name,
        uint voterId,
        string memory partyName
    ) public onlyAdmin {
        ElectionDetails storage election = elections[electionName];
        require(election.isActive, "Election is not active");
        require(!election.status, "Election is started");
        require(
            election.admin == msg.sender,
            "Only the admin can add candidates"
        );

        election.candidateCount++;
        election.candidates[id] = Candidate(id, name, voterId, partyName, 0);
        emit CandidateAdded(electionName, id, name);
    }

    function vote(string memory electionName, uint candidateId) public {
        ElectionDetails storage election = elections[electionName];
        require(election.status, "Election is not started");
        require(election.isActive, "Election is not active");
        require(!voters[msg.sender], "Voter has already voted");
        require(
            election.admin != msg.sender,
            "Admin is not allowed to vote in the election"
        );
        voters[msg.sender] = true;

        Candidate storage candidate = election.candidates[candidateId];
        require(candidate.id != 0, "Invalid candidate");

        candidate.voteCount++;
        emit VoteCast(electionName, candidateId, candidate.name, msg.sender);
    }

    function getElectionCandidateCount(
        string memory electionName
    ) public view returns (uint) {
        return elections[electionName].candidateCount;
    }

    function getCandidateDetails(
        string memory electionName,
        uint candidateId
    ) public view returns (uint, string memory, uint, string memory, uint) {
        ElectionDetails storage election = elections[electionName];
        require(
            election.admin == msg.sender,
            "Only the admin can access candidate details"
        );
        Candidate memory candidate = elections[electionName].candidates[
            candidateId
        ];
        return (
            candidate.id,
            candidate.name,
            candidate.voterId,
            candidate.partyName,
            candidate.voteCount
        );
    }

    function getWinnerDetails(
        string memory electionName
    ) public view returns (string memory, uint, string memory) {
        ElectionDetails storage election = elections[electionName];
        require(!election.status, "Election is not ended");
        require(
            election.admin == msg.sender,
            "Only the admin can access winner details"
        );
        Candidate memory winner;
        uint maxVotes = 0;
        for (uint i = 1; i <= election.candidateCount; i++) {
            Candidate memory candidate = election.candidates[i];
            if (candidate.voteCount > maxVotes) {
                maxVotes = candidate.voteCount;
                winner = candidate;
            }
        }
        return (winner.name, winner.voterId, winner.partyName);
    }

    function removeCandidate(
        string memory electionName,
        string memory candidateName,
        uint voterId
    ) public onlyAdmin {
        ElectionDetails storage election = elections[electionName];
        require(!election.status, "Election is started");
        require(election.isActive, "Election is not active");
        require(
            election.admin == msg.sender,
            "Only the admin can remove candidates"
        );

        uint candidateId = 0;
        bool candidateFound = false;
        for (uint i = 1; i <= election.candidateCount; i++) {
            Candidate storage candidate = election.candidates[i];
            if (
                keccak256(bytes(candidate.name)) ==
                keccak256(bytes(candidateName)) &&
                candidate.voterId == voterId
            ) {
                candidateId = i;
                candidateFound = true;
                break;
            }
        }
        require(candidateFound, "Candidate not found");

        delete election.candidates[candidateId];
        election.candidateCount--;
        emit CandidateRemoved(electionName, candidateName, voterId);
    }

    function startElection(string memory electionName) public onlyAdmin {
        ElectionDetails storage election = elections[electionName];
        require(!election.status, "Election is started");
        require(election.isActive, "Election is already active");
        require(
            election.admin == msg.sender,
            "Only the admin can remove candidates"
        );

        election.status = true;
        emit ElectionStarted(electionName);
    }

    function stopElection(string memory electionName) public onlyAdmin {
        ElectionDetails storage election = elections[electionName];
        require(election.status, "Election is not started");
        require(election.isActive, "Election is not active");
        require(
            election.admin == msg.sender,
            "Only the admin can remove candidates"
        );

        election.status = false;
        emit ElectionStopped(electionName);
    }

    function getElectionNames() public view returns (string[] memory) {
        return electionNames;
    }
}
