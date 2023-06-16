import React, { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import ElectionContract from "./build/contracts/ElectionContract.json";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import { Toaster } from "react-hot-toast";
import { notifyError, notifySuccess } from "./components/Toast/Toasters";

function App() {
  const [account, setAccount] = useState("");
  const Address = ElectionContract.networks[5777].address;

  async function initializeProvider() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    console.log(signer);
    return new ethers.Contract(Address, ElectionContract.abi, signer);
  }

  const requestAccount = useCallback(async () => {
    try {
      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(account);
      setAccount(account[0]);
      notifySuccess(`Successfully connected  ${account[0]}`);
    } catch (error) {
      console.log(error.message);
      notifyError(error.message);
    }
  }, []);

  useEffect(() => {
    requestAccount();
  }, [requestAccount]);

  return (
    <div className="h-screen flex flex-col bg-gray-50 ">
      <Loader />
      <Toaster
        toastOptions={{
          style: {
            maxWidth: "1000px",
          },
        }}
      />
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
