// import Web3 from "web3";
// import React, { useState} from 'react';
// import Web3Modal from "web3modal";
// import WalletConnectProvider from "@walletconnect/web3-provider";
// import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
// const abi = require("./abi.json");

// const ABI = abi;

// const ADDRESS = "0x7b6fe2a63259d5f578a8c1bf552768177f980255"       //Need to update for mainnet - production
// var account = null;
// var contract = null;
// var provider = null;
// var saleConfig = null;
// const providerOptions = {
//   walletconnect: {
//     package: WalletConnectProvider, // required
//     options: {
//       infuraId: "23cceccdbd454ab38acdb049b3ccee59" // Works for all network
//     }
//   },
//   coinbasewallet: { // Need to update for mainnet - production
//       package: CoinbaseWalletSDK, //
//       options: {
//         appName: "Rinkeby Endpoint", // Required
//         infuraId: "23cceccdbd454ab38acdb049b3ccee59", // Required
//         chainId: 4 // Optional. It defaults to 1 if not provided
//       }
//     }
// };
// const web3Modal = new Web3Modal({
//   network: "rinkeby", // Need to be updated for mainnet - production
//   cacheProvider: true, // optional
//   providerOptions // required
// });

// async function changeAccount(setWhiteLoad,web3,setLoad){
// 	var accounts = await web3.eth.getAccounts();
// 	console.log(accounts)
// 	account = accounts[0];
// 	var timeStamp = saleConfig["publicSaleStartTime"];
// 	var whitelistStarted = saleConfig["whitelistPrice"];
// 	var currentTime = Math.floor(Date.now() / 1000);
// 	if(whitelistStarted != 0 ){
// 		if(timeStamp > currentTime ){	//Whitelist Mintint
// 		  console.log("Mint Whitelist");
// 		  if(checkIfWhitelisted()){
// 			  setWhiteLoad(true);
// 		  }
// 		  else{
// 			  document.getElementById('statusMint').textContent = "You are not on whitelist, wait for public mint to start at unix timestamp "+timeStamp;
// 			  setWhiteLoad(false);
// 		  }
// 		}
// 		else{	//Public minting
// 		  console.log("Mint public");
// 		  setLoad(true);
// 		}
// 	}
//     document.getElementById('wallet-address-connect').textContent = account;
// }

// async function connectwallet(setLoad,setWhiteLoad,setDisconnect) {
//     provider = await web3Modal.connect();
//       if(provider != null){

// 		  var web3 = new Web3(provider);
// 		  var accounts = await web3.eth.getAccounts();
// 		  account = accounts[0];
// 		  var chainId = await web3.eth.getChainId();
// 		  console.log(chainId);
// 		  contract = new web3.eth.Contract(ABI, ADDRESS);
// 		  setDisconnect(false);
// 		  saleConfig = await contract.methods.saleConfig().call();
// 		  var timeStamp = saleConfig["publicSaleStartTime"];
// 		  var whitelistStarted = saleConfig["whitelistPrice"];
// 		  var currentTime = Math.floor(Date.now() / 1000);
// 		  if(whitelistStarted != 0 ){   // Decide if its whitelist minting/public minting/no minting
// 			  if(timeStamp > currentTime ){
// 				console.log("Mint Whitelist");
// 				if(checkIfWhitelisted()){
// 					setWhiteLoad(true);
// 				}
// 				else{
// 					document.getElementById('statusMint').textContent = "You are not on whitelist, wait for public mint to start at unix timestamp "+timeStamp;
//                     // Add a countdown till timestamp
// 				}
// 			  }
// 			  else{	//Public minting
// 				console.log("Mint public");
// 				setLoad(true);
// 			  }
// 		  }
// 		  else{	//Nothing started yet
// 			  console.log("Whitelist Mint not started");
// 			  document.getElementById('statusMint').textContent = "Whitelist Minting Hasn't started";
// 		  }

//   // Subscribe to accounts change
//   provider.on("accountsChanged", (accounts: string[]) => {
// 	changeAccount(setWhiteLoad,web3,setLoad);
//   });

//   // Subscribe to chainId change
//   provider.on("chainChanged", (chainId: number) => {
//     console.log(chainId);
//   });

//   // Subscribe to provider connection
//   provider.on("connect", (info: { chainId: number }) => {
//     console.log(info);
//   });

//   // Subscribe to provider disconnection
//   provider.on("disconnect", (error: { code: number; message: string }) => {
//     console.log(error);
//   });
//       }

// }

// async function mint() {     // Add suggested gas fee
//       var _mintAmount = Number(document.querySelector("[id=amount]").value);
//       var mintRate = await contract.methods.saleConfig().call();
//       var totalAmount = mintRate["publicPrice"] * _mintAmount;
//       contract.methods.publicMint(_mintAmount).send({ from: account, value: String(totalAmount) });

// }
// function checkIfWhitelisted(){

// 	const whitelistAddresses = require('./whitelist.json');
// 	if(whitelistAddresses.includes(account)){
// 		return true;		//return true
// 	}
// 	else{
// 		return false	// return false
// 	}
// }

// async function whitelisMint() {
// 	const { MerkleTree } = require('merkletreejs');
// 	const keccak256 = require('keccak256');
// 	const whitelistAddresses = require('./whitelist.json');
// 	const leafNodes = whitelistAddresses.map(addr => keccak256(addr));
// 	const tree = new MerkleTree(leafNodes, keccak256, { sortPairs: true});
// 	const root = tree.getRoot();

// 	const claimingAddress = keccak256(account);

// 	const hexProof = tree.getHexProof(claimingAddress);

// 	if(tree.verify(hexProof,claimingAddress,root)){
// 		var _mintAmount = Number(document.querySelector("[id=whitelistAmount]").value);
// 		var mintRate = await contract.methods.saleConfig().call();
// 		var totalAmount = mintRate["whitelistPrice"] * _mintAmount;
// 		contract.methods.whitelistMint(hexProof,_mintAmount).send({ from: account, value: String(totalAmount) });
// 	}
// 	else{
// 		console.log("You are not on whitelist"); //Throw error on page, not on whitelist
// 	}

// }
// async function disconnectWallet(setLoad,setWhiteLoad,setDisconnect,load,whiteLoad) {
//     // reset everything back to login page
// 	web3Modal.clearCachedProvider();
// 	window.localStorage.clear();
// 	setDisconnect(true);
// 	account = null;
// 	contract = null;
// 	provider = null;
// 	if(load){
// 		setLoad(false);	}
// 	if(whiteLoad){
// 		setWhiteLoad(false); }


// }
// export default function Wallet() {
// 	const [load,setLoad] = useState(false);
// 	const [whiteLoad,setWhiteLoad] = useState(false);
// 	const [disconnect,setDisconnect] = useState(true);
// 	return (

//     <div className="wallet-custom uppercase">
// 		{disconnect?
//     	<div>
// 			<button onClick={() => connectwallet(setLoad,setWhiteLoad,setDisconnect)} className="uppercase relative transition duration-500 group-hover:text-black  tracking-wider  py-6 font-simplon-bp font-bold md:text-[20px] border-[#505050]">Connect Wallet</button>
// 			<h6 id="wallet-address" >Wallet not connected</h6>
// 		</div>:
// 		<div>
// 			<button onClick={() => disconnectWallet(setLoad,setWhiteLoad,setDisconnect,load,whiteLoad)}  className="uppercase relative transition duration-500 group-hover:text-black py-6 tracking-wider  font-simplon-bp font-bold md:text-[20px] border-[#505050]">Disconnect</button>
// 			<h6 id="wallet-address-connect">{account}</h6>
// 			<h5 id="statusMint"></h5>
// 		</div>}


//       {load?
// 	  <div>
// 		<input id="amount" type="number" placeholder="Enter Number of NFT to be minted" min="1" max="10"/>
//         <button onClick={mint}>Test</button>
//       </div>:null}

//       {whiteLoad?
// 		<div>
// 			<input id="whitelistAmount" type="number" placeholder='whitelist number' min='1' max='5' />
// 			<button onClick={whitelisMint}>Whitelist mint</button>
// 		</div>
// 	:null}

//     </div>
//   );
// }
