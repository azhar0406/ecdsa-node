import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from "@ethersproject/providers";
import { InjectedConnector } from "@web3-react/injected-connector";
// import { ConnectWallet } from "@thirdweb-dev/react";
// import { Web3ReactProvider } from '@web3-react/core'
// import { Web3Provider } from "@ethersproject/providers";


const injectedConnector = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] });

function getLibrary(provider) {
  const web3Provider = new Web3Provider(provider);
  web3Provider.pollingInterval = 12000;
  return web3Provider;
}


function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");


  return (
    <div className="app">
   <Web3ReactProvider getLibrary={getLibrary}>
   <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
      />
      <Transfer setBalance={setBalance} address={address} />
  </Web3ReactProvider>
    </div>
  );
}

export default App;
