import Web3 from "web3";

let web3;
if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  //we are in the browser and metamask is running;
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  //we are on the server OR user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/49365133728c45fd9f0d64f45c920125"
  );

  web3 = new Web3(provider);
}

export default web3;
