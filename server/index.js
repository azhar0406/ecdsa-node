const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const ethers = require('ethers');
// const secp = require("ethereum-cryptography/secp256k1");
// const { keccak256 } = require("ethereum-cryptography/keccak");
// const { utf8ToBytes } = require("ethereum-cryptography/utils");



app.use(cors());
app.use(express.json());

/* Dev Note: Test accounts private keys, so no problem. */
const balances = {
  "0x788373a150172AE6dd21F0e21DFC9E4F4cbBd142": 100, // private key: dcf49e1743cc1e8a3f349f7f4008044a67921f7bb36bbf9262dc5f6cf7ef4fb0
  "0x3805A5957d93E147C93CC3af8D332a5109e5a2fC": 50, // private key: 5a277bb1d2a4dd1ddab55d1982b9083714ba93e8ee9ea35c533a23050fec0455
  "0xe0f8126D1ec2B4672Dc0496D6533E9DD828390C9": 75, // private key: baff255fcd5d6149365642fdea1b62a07bdad2556b7d70fbd518cd70a60b1dca
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, signature } = req.body;

  const message = 'I want to transfer '+amount+' to '+recipient+'';


  const address = ethers.verifyMessage(message, signature);



  if(address == sender){
    setInitialBalance(sender);
    setInitialBalance(recipient);
    if (balances[sender] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else {
      balances[sender] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[sender] });
    }
  } else {
    res.status(400).send({ message: "Signature mismatch" });
  }


});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
