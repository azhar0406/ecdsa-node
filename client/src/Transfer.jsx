import { useState } from "react";
import server from "./server";
import { Web3Provider } from "@ethersproject/providers";
import * as keccak from "ethereum-cryptography/keccak";
import * as utils from "ethereum-cryptography/utils";
import * as secp from "ethereum-cryptography/secp256k1";
import { TextEncoder } from 'text-encoding-utf-8';
import { ethers } from "ethers";
// import { ethers } from "ethers";
// import { Web3Provider } from "@ethersproject/providers";


function Transfer({ address, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [signedMessage, setSignedMessage] = useState('');


  const setValue = (setter) => (evt) => setter(evt.target.value);


  async function signMessage(evt) {
    evt.preventDefault();
  
    if (!window.ethereum) {
      alert('Please install MetaMask to sign the message.');
      return;
    }
    // console.log(window.ethereum);
  
    try {
      const provider = new Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      console.log(address);
  
      const message = `I want to transfer ${sendAmount} to ${recipient}`;
  
      const signature = await signer.signMessage(message);
      setSignedMessage(signature);
    } catch (ex) {
      console.log(ex);
      alert('Error signing the message. Please try again.');
    }
  }
  

  async function transfer(evt) {
    evt.preventDefault();
  
    if (!signedMessage) {
      alert('Please sign the message before transferring funds.');
      return;
    }
  
    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
        signature: signedMessage,
      });
  
      setBalance(balance);
      setSignedMessage('');
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }
  

  return (
    <form className="container transfer" onSubmit={signMessage}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>
      
      <button type="submit" className="button">Sign Message</button>
      {signedMessage && (
        <label>
        Signed message
          <input value={signedMessage} disabled></input>
          </label>
 
      )}

<button type="button" className="button" onClick={transfer}>Transfer</button>
        
    </form>
  );
}

export default Transfer;
