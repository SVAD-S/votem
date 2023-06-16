import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import ElectionContract from "./build/contracts/ElectionContract.json";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  const [account, setAccount] = useState("");
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

  useEffect(() => {
    requestAccount();
  }, []);

  return (
    <div className="h-screen flex flex-col bg-gray-50 ">
      <Navbar
        initializeProvider={initializeProvider}
        requestAccount={requestAccount}
      />
      <Outlet />
    </div>
  );
}

export default App;
