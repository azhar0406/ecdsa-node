const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { bytesToHex, toHex } = require("ethereum-cryptography/utils");

const privateKey = secp.secp256k1.utils.randomPrivateKey();

console.log('private key:', toHex(privateKey));
const publicKey = secp.secp256k1.getPublicKey(toHex(privateKey));

const array1 = publicKey.slice(1);

    // console.log(array1);


    const hash=keccak256(array1);

    const array2 = hash.slice(-20);
console.log('public key:', toHex(array2));