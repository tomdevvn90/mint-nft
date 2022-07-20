import Wallet from './Wallet';
import Navigation from './Navigation';
import React, { useState } from "react";
import WalletConnect from "../assets/walletconnect.svg";
import  Button  from "./Button";
import  Footer  from "./Footer";
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import ProgressBar from "@ramonak/react-progress-bar";
import Countdown from 'react-countdown';


const abi = require("./abi.json");
const saleConfigAbi = require('./saleConfigAbi.json');

const ABI = abi;
const saleConfigABI = saleConfigAbi;

const ADDRESS = "0x5552e5a89a70cb2ef5adbbc45a6be442fe7160ec";       //Need to update for mainnet - production
const saleConfigADDRESS = "0xafc52644017dd1Df4DD531178Ec86E78dd8019a2"; // Sale Config address
var account = null;
var contract = null;
var provider = null;
var saleConfig = null;
var minted = null;
var timeStamp = null;
const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: "23cceccdbd454ab38acdb049b3ccee59" // Works for all network
    }
  },
  coinbasewallet: { // Need to update for mainnet - production
      package: CoinbaseWalletSDK, //
      options: {
        appName: "Rinkeby Endpoint", // Required
        infuraId: "23cceccdbd454ab38acdb049b3ccee59", // Required
        chainId: 4 // Optional. It defaults to 1 if not provided
      }
    }
};
const web3Modal = new Web3Modal({
  network: "rinkeby", // Need to be updated for mainnet - production
  cacheProvider: true, // optional
  providerOptions // required
});

async function changeAccount(setWhiteLoad,web3,setLoad,setCountdown){
	var accounts = await web3.eth.getAccounts();
	console.log(accounts)
	account = accounts[0];
  setCountdown(false);
  timeStamp = await saleConfig.methods.getPublicSaleStartTime().call();
  var whitelistStarted = await saleConfig.methods.getWhitelistPrice().call();
	var currentTime = Math.floor(Date.now() / 1000);
	if(whitelistStarted != 0 ){
		if(timeStamp > currentTime ){	//Whitelist Mintint
		  console.log("Mint Whitelist");
		  if(checkIfWhitelisted()){
			  setWhiteLoad(true);
        document.getElementById('statusMint').innerText = "0.07 ETH/NFT";
		  }
		  else{
			  document.getElementById('statusMint').innerHTML = "You are not on whitelist, wait for public mint to start in";
        setCountdown(true);
			  setWhiteLoad(false);
		  }
		}
		else{	//Public minting
		  console.log("Mint public");
      document.getElementById('statusMint').innerText = "0.09 ETH/NFT";
		  setLoad(true);
		}
	}
    document.getElementById('qwe').innerText = account;
}

async function connectwallet(setLoad,setWhiteLoad,setDisconnect,setCountdown) {
    provider = await web3Modal.connect();
    if(provider != null){

		  var web3 = new Web3(provider);
		//   await window.ethereum.send('eth_requestAccounts');
		  var accounts = await web3.eth.getAccounts();
		  account = accounts[0];
		  var chainId = await web3.eth.getChainId();
		  document.getElementById('qwe').textContent = account;
		  contract = new web3.eth.Contract(ABI, ADDRESS);
		  saleConfig = new web3.eth.Contract(saleConfigABI,saleConfigADDRESS);

		  setDisconnect(false);
		   timeStamp = await saleConfig.methods.getPublicSaleStartTime().call();
		  var whitelistStarted = await saleConfig.methods.getWhitelistPrice().call();

		  minted = await contract.methods.totalSupply().call();

		  var currentTime = Math.floor(Date.now() / 1000);
      if(minted < 4446){
        if(whitelistStarted != 0 ){
          if(timeStamp > currentTime ){	//Whitelist Mintint
          console.log("Mint Whitelist");
          if(checkIfWhitelisted()){
            setWhiteLoad(true);
            document.getElementById('statusMint').innerText = "0.07 ETH/NFT";
          }
          else{
            document.getElementById('statusMint').innerHTML = "You are not on whitelist, wait for public mint to start in ";
            setCountdown(true);
          }
          }
          else{	//Public minting
          console.log("Mint public");
          document.getElementById('statusMint').innerText = "0.09 ETH/NFT";
          setLoad(true);
          }
        }
        else{	//Nothing started yet
          console.log("Whitelist Mint not started");
          document.getElementById('statusMint').innerText = "Whitelist Minting Hasn't started";
        }
      }
      else{
        document.getElementById('statusMint').innerText = "All NFTs Minted, Please Buy on OpenSea";
      }

  // Subscribe to accounts change
  provider.on("accountsChanged", (accounts: string[]) => {
	changeAccount(setWhiteLoad,web3,setLoad,setCountdown);
  });

  // Subscribe to chainId change
  provider.on("chainChanged", (chainId: number) => {
    console.log(chainId);
  });

  // Subscribe to provider connection
  provider.on("connect", (info: { chainId: number }) => {
    console.log(info);
  });

  // Subscribe to provider disconnection
  provider.on("disconnect", (error: { code: number; message: string }) => {
    console.log(error);
  });
      }

}

async function mint() {
  var _mintAmount = Number(document.querySelector("[id=amount]").value);
  var mintRate = await saleConfig.methods.getPublicPrice().call();
  var totalAmount = mintRate * _mintAmount;
  contract.methods.publicMint(_mintAmount).send({ from: account, value: String(totalAmount) });

}
function checkIfWhitelisted(){

	const whitelistAddresses = require('./whitelist.json');
	if(whitelistAddresses.includes(account)){
		return true;		//return true
	}
	else{
		return false	// return false
	}
}

async function whitelisMint() {
	const { MerkleTree } = require('merkletreejs');
	const keccak256 = require('keccak256');
	const whitelistAddresses = require('./whitelist.json');
	const leafNodes = whitelistAddresses.map(addr => keccak256(addr));
	const tree = new MerkleTree(leafNodes, keccak256, { sortPairs: true});
	const root = tree.getRoot();

	const claimingAddress = keccak256(account);

	const hexProof = tree.getHexProof(claimingAddress);
	// console.log(hexProof)
	// console.log(root.toString('hex'))
	// console.log(tree.verify(hexProof, claimingAddress, root))
	if(tree.verify(hexProof,claimingAddress,root)){
		var _mintAmount = Number(document.querySelector("[id=amount]").value);
		var mintRate = await saleConfig.methods.getWhitelistPrice().call();
		var totalAmount = mintRate * _mintAmount;
		contract.methods.whitelistMint(hexProof,_mintAmount).send({ from: account, value: String(totalAmount) });
	}
	else{
		console.log("You are not on whitelist"); //Throw error, not on whitelist
	}

}
async function disconnectWallet(setLoad,setWhiteLoad,setDisconnect,load,whiteLoad) {
    // reset everything back to login page
	web3Modal.clearCachedProvider();
	window.localStorage.clear();
	setDisconnect(true);
	account = null;
	contract = null;
	provider = null;
  minted = null;
	if(load){
		setLoad(false);	}
	if(whiteLoad){
		setWhiteLoad(false); }


}


export default function Mint() {
  const [isConnected, setIsConnected] = useState(false);
  const [quantity] = useState(0);
  const [load,setLoad] = useState(false);
	const [whiteLoad,setWhiteLoad] = useState(false);
	const [disconnect,setDisconnect] = useState(true);
  const [countdown,setCountdown] = useState(false);
  return (
    <>
    <Navigation disconnect={disconnect} />

    <div className=" text-center md:text-left mb-[-33px] m-auto min-body-custom">
      <div className="mt-10 pt-[8rem] pr-[12px] pl-[12px] xl:pt-[12.5rem] md:pr-[0px] md:pl-[0px] mx-auto max-w-screen-sm pb-[90px] pb-[5rem] xl:pb-[19rem]">

        {disconnect?
        <div className="mt-8 border-[#505050] border text-white flex" onClick={() => connectwallet(setLoad,setWhiteLoad,setDisconnect,setCountdown)}>
          <div className="w-[100%] text-center group cursor-pointer">
            <div className="border-[#505050] border-b md:py-14 py-6">
              <img
                className="block group-hover:hidden mx-auto"
                src={WalletConnect}
              />
              <img
                className="scale-up-anim hidden group-hover:block mx-auto"
                src={WalletConnect}
              />
                 <div className="wallet-custom uppercase">
              <button className="w-[100%] uppercase relative transition duration-500 tracking-wider  py-6 font-simplon-bp font-bold md:text-[20px] border-[#505050]">Connect Wallet</button>
              </div>
            </div>
            <div className="relative transition duration-500  group-hover:bg-white tracking-wider  font-simplon-bp font-bold md:text-[20px]"></div>
          </div>
        </div>:
        whiteLoad?
        <div>
          <div className="mb-8 tracking-wider text-white font-simplon-bp font-bold md:text-[32px] mt-4 md:mt-14 text-[20px] leading-[100%]">
            WHITELIST MINT
          </div>
          <div className="text-white font-simplon-bp flex items-center text-32px font-light space-x-6">
            <div className="w-1/2 flex text-center h-input items-center h-12 md:h-input border-[#505050] border">

              <div className="border-r border-l border-[#505050] h-12 md:h-input w-8/12 flex items-center justify-center">
                <input id="amount" min="1" max="2"
                  className="bg-transparent outline-none h-12 md:h-input text-base md:text-[20px] w-10/12 text-center"
                />
              </div>

            </div>
          </div>
          <div className="mt-5 text-gray text-base md:text-xl">Max 2</div>
          <div className="mt-4 md:mt-14">
          <Button text="MINT" isFull isFit onClick={() => whitelisMint()} size="lg"/>
          </div>
        </div>:
        load?
        <div>
        <div className="mb-8 tracking-wider text-white font-simplon-bp font-bold md:text-[32px] mt-4 md:mt-14 text-[20px] leading-[100%]">
            SELECT QUANTITY
        </div>
        <div className="text-white font-simplon-bp flex items-center text-32px font-light space-x-6">
          <div className="w-1/2 flex text-center h-input items-center h-12 md:h-input border-[#505050] border">

            <div className="border-r border-l border-[#505050] h-12 md:h-input w-8/12 flex items-center justify-center">
              <input id="amount" min="1" max="5"
                className="bg-transparent outline-none h-12 md:h-input text-base md:text-[20px] w-10/12 text-center"
              />
            </div>

          </div>
        </div>
        <div className="mt-5 text-gray text-base md:text-xl">Max "5"</div>
        <div className="mt-4 md:mt-14">
        <Button text="MINT" isFull isFit onClick={() => mint()} size="lg"/>
        </div>

      </div>:null
      }

      {minted?
      <ProgressBar completed={minted} maxCompleted={4446} baseBgColor="black" animateOnRender={true} bgColor="white" labelColor="black" labelAlignment="center"/>:null}
        <div className="w-[100%] text-center group">
          <div className="mb-8 tracking-wider text-white font-simplon-bp font-bold md:text-[32px] mt-4 md:mt-14 text-[20px] leading-[100%]" id="statusMint">
            Connect Wallet to Start Minting
          </div>
          {countdown?<Countdown date={ Date.now() + (timeStamp*1000 - Date.now()) } className="text-white"/>:null}
          </div>
      </div>
    </div>

    <div className="m-auto  min-body-custom">
      <Footer />
    </div>
    </>
  )
}
