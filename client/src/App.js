import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import ElectionContract from "./build/contracts/ElectionContract.json";

function App() {
  const [account, setAccount] = useState("");
  const [greeting, setGreeting] = useState("");
  const Address = ElectionContract.networks[5777].address;

  async function initializeProvider() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new ethers.Contract(Address, ElectionContract.abi, signer);
  }

  async function requestAccount() {
    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(account[0]);
  }

  async function fetchData() {
    if (typeof window.ethereum !== "undefined") {
      const contract = await initializeProvider();
      try {
        const temp = await contract.greet();
        setGreeting(temp);
      } catch (e) {
        console.log("error fetching owner: ", e);
      }
    }
  }

  async function setGreeter() {
    if (typeof window.ethereum !== "undefined") {
      const contract = await initializeProvider();

      try {
        console.log(await contract.greeter("Im Vipi"));
      } catch (error) {}
    }
  }
  useEffect(() => {
    requestAccount();
  }, []);

  useEffect(() => {
    if (account) {
      fetchData();
    }
  }, [account]);
  return (
    <>
      <div className="text-orange-500">
        Account is {account} and greeting is {greeting}
      </div>
      <button onClick={setGreeter}>Thomas</button>
    </>
  );
}

export default App;
