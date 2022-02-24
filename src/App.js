import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import Web3 from "web3";
import { getTokenId } from "./contracts/web3";

function App() {
  const [account, setAccount] = useState();
  const [tokenIDs, setTokenIDs] = useState([]);
  const [showAccount, setShowAccount] = useState(null);

  useEffect(async () => {
    await loadWeb3().then((data) => {
      if (data != false) {
        console.log("");
      }
    });
  });

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      return false;
    }
  };

  const handleConnectWallet = async () => {
    if (window.ethereum) {
      await window.ethereum.enable();
      await callContract();
    } else {
      window.open("https://metamask.io/", "_blank");
    }
  };

  const callContract = async () => {
    const web3 = window.web3;
    let accounts = await web3.eth.getAccounts();
    var preAddress = accounts.toString();
    var firstAddress = preAddress.substr(0, 5);
    var lastAddress = preAddress.substr(-4, 4);
    var showAddress = firstAddress + "..." + lastAddress;
    const tokenIds = await getTokenId(accounts[0]);
    setAccount(accounts);
    setTokenIDs(tokenIds);
    setShowAccount(showAddress);
  };

  const TokenList = (res) => {
    return (
      <div className="col-sm-4">
        <div className="tokenImage">
          <video
            autoPlay
            loop
            muted
            style={{ width: "250px", height: "250px" }}
          >
            <source
              src="https://ipfs.io/ipfs/QmeZuBBBEMGEzRvLvMHjg7RHa95q6B4LieNzNqeK7vT8eX"
              type="video/mp4"
            />
          </video>
        </div>
        <div className="tokenID">
          <p>Token #{res.tokenId}</p>
          <p>2 messages</p>
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      <div className="container">
        <button className="btn" onClick={handleConnectWallet}>
          <span>{showAccount ? showAccount : "Connect Wallet"}</span>
        </button>
      </div>
      <div className="container">
        <div className="row">
          {tokenIDs &&
            tokenIDs.length > 0 &&
            tokenIDs.map((item, index) => {
              return <TokenList tokenId={item} key={index} />;
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
