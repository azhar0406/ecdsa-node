import server from "./server";
// import * as secp from "ethereum-cryptography/secp256k1";

// import * as keccak from "ethereum-cryptography/keccak";

// import * as utils from "ethereum-cryptography/utils";


import { useWeb3React } from '@web3-react/core'

import { InjectedConnector } from "@web3-react/injected-connector";
import { useEffect } from "react";


const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] });

function Wallet({ address, setAddress, balance, setBalance, setPrivateKey }) {

  const { account, activate, deactivate } = useWeb3React();

  useEffect(() => {
    setAddress(account || "");
  }, [account, setAddress]);

  useEffect(() => {
    onChange();
  }, [address]);

  async function onChange() {
    setAddress(account);
    if (account) {
      const { data: { balance } } = await server.get(`balance/${account}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  function connect() {
    activate(injected);
  }

  function disconnect() {
    deactivate();
    setAddress("");
    setBalance(0);
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>
      {account ? (
        <button onClick={disconnect}>Disconnect</button>
      ) : (
        <button onClick={connect}>Connect Metamask</button>
      )}

      <label>
       Address
        <input value={address}  onChange={onChange} disabled></input>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
