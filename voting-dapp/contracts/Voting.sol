// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        string name;
        uint voteCount;
    }

    mapping(uint => Candidate) public candidates;
    mapping(address => bool) public voters;
    uint public candidatesCount;
    uint public totalVotes;

    event votedEvent(uint indexed candidateId);

    constructor() {
        addCandidate("Alice");
        addCandidate("Bob");
    }

    function addCandidate(string memory name) private {
        candidates[candidatesCount] = Candidate(name, 0);
        candidatesCount++;
    }

    function vote(uint candidateId) public {
        require(!voters[msg.sender], "You have already voted.");
        require(candidateId >= 0 && candidateId < candidatesCount, "Invalid candidate ID.");

        voters[msg.sender] = true;
        candidates[candidateId].voteCount++;
        totalVotes++;

        emit votedEvent(candidateId);
    }

    function getCandidate(uint candidateId) public view returns (string memory name, uint voteCount) {
        require(candidateId >= 0 && candidateId < candidatesCount, "Invalid candidate ID.");
        Candidate memory candidate = candidates[candidateId];
        return (candidate.name, candidate.voteCount);
    }
}
