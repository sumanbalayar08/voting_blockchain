import React, { useEffect, useState } from "react";
import { ethers } from "ethers"; // Correct import
import './App.css'

const contractAddress = "0x34992b171D4717E25A68f971b41F782195aB2E42"; // Replace with your deployed contract address
const abi = [
  "function vote(uint candidateId)",
  "function getCandidate(uint candidateId) view returns (string memory name, uint voteCount)",
  "event votedEvent(uint indexed candidateId)",
];

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [aliceVotes, setAliceVotes] = useState(0);
  const [bobVotes, setBobVotes] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum); // Use BrowserProvider
        const signer = await provider.getSigner(); // Await the signer
        const contract = new ethers.Contract(contractAddress, abi, signer);

        setProvider(provider);
        setSigner(signer);
        setContract(contract);
        await updateVoteCounts(contract);
      } else {
        setMessage("Please install MetaMask!");
      }
    };
    init();
  }, []);

  const updateVoteCounts = async (contract) => {
    try {
      const aliceData = await contract.getCandidate(0);
      const bobData = await contract.getCandidate(1);
      setAliceVotes(aliceData.voteCount.toString());
      setBobVotes(bobData.voteCount.toString());
    } catch (error) {
      console.error(error);
    }
  };

  const vote = async (candidateId) => {
    if (!contract) return;

    try {
      const tx = await contract.vote(candidateId);
      await tx.wait();
      setMessage("Vote cast successfully!");
      updateVoteCounts(contract);
    } catch (error) {
      console.error(error);
      setMessage("Error casting vote: " + error.message);
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Voting DApp</h1>
      <div className="button-container">
        <button className="vote-button" onClick={() => vote(0)}>
          Vote for Alice
        </button>
        <button className="vote-button" onClick={() => vote(1)}>
          Vote for Bob
        </button>
      </div>
      <div id="message" className="message">
        {message}
      </div>
      <h2 className="vote-count-title">Current Vote Counts</h2>
      <div className="vote-counts">
        <p className="vote-count">
          Alice: <span className="vote-count-number">{aliceVotes}</span>
        </p>
        <p className="vote-count">
          Bob: <span className="vote-count-number">{bobVotes}</span>
        </p>
      </div>
    </div>
  );
}

export default App;
