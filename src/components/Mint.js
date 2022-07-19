import Wallet from './Wallet';
import Navigation from './Navigation';
import React, { useState,useEffect } from "react";
import sx from "classnames";
import Metamask from "../assets/metamask.svg";
import WalletConnect from "../assets/walletconnect.svg";
import Iconbitcoin from "../assets/icon-bitcoin.svg";
import  Button  from "./Button";
import  Footer  from "./Footer";
export default function Mint() {
  const [isConnected, setIsConnected] = useState(false);
  const [quantity] = useState(0);
  return (
    <>
    <Navigation />
    <div className=" text-center md:text-left mb-[-33px] m-auto min-body-custom">
      <div className="mt-10 pt-[8rem] pr-[12px] pl-[12px] xl:pt-[12.5rem] md:pr-[0px] md:pl-[0px] mx-auto max-w-screen-sm pb-[90px] pb-[5rem] xl:pb-[19rem]">
        <div className="tracking-wider text-white font-simplon-bp font-bold  text-[20px] leading-[100%] md:text-[32px] border-[#505050] border-b pb-2 md:pb-4 border-dashed">
          1. CONNECT YOUR WALLET
        </div>
        <div className="mt-8 border-[#505050] border text-white flex">
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
            </div>
            <div className="relative transition duration-500 group-hover:text-black group-hover:bg-white tracking-wider  font-simplon-bp font-bold md:text-[20px]">
               <Wallet/>
            </div>
          </div>
        </div>
        <div
          className={sx({
            "opacity-30": !isConnected
          })}
        >
          <div className="mb-8 tracking-wider text-white font-simplon-bp font-bold md:text-[32px] mt-4 md:mt-14 text-[20px] leading-[100%]">
            2. SELECT QUANTITY
          </div>
          <div className="text-white font-simplon-bp flex items-center text-32px font-light space-x-6">
            <div className="w-1/2 flex text-center h-input items-center h-12 md:h-input border-[#505050] border">
              <div className="w-3/12">-</div>
              <div className="border-r border-l border-[#505050] h-12 md:h-input w-8/12 flex items-center justify-center">
                <input
                  value={quantity}
                  className="bg-transparent outline-none h-12 md:h-input text-base md:text-[20px] w-10/12 text-center"
                />
              </div>
              <div className="w-3/12">+</div>
            </div>
            <div className="w-1/2 flex text-center h-input items-center h-12 md:h-input border-[#505050] border">
              <div className="w-5/12 font-simplon-bp text-base md:text-[20px] font-bold tracking-widest border-[#505050] border-r h-12 md:h-input flex items-center text-center justify-center">
                TOTAL
              </div>
              <div className="w-7/12 font-simplon-bp text-base md:text-xl font-bold tracking-widest flex flex-col items-end pr-3 md:pr-6">
                <div className="text-right">
                  <div className="flex justify-center items-center text-base leading-[100%]">
                    <img className="mr-[5px] mb-[2px]" src={Iconbitcoin} />
                    0.3 ETH
                  </div>
                  <div className="font-light text-light-gray  text-xs leading-[100%] mt-[3px]">
                    =$803.99
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 text-gray text-base md:text-xl">Max 10</div>
          <div className="mt-4 md:mt-14">
          <Button
            disabled={!isConnected}
            text="MINT"
            type={isConnected ? "primary" : "dark"}
            isFull
            isFit
            onClick={() => {}}
            size="lg"
          />
          </div>
        </div>
      </div>
    </div>
    <div className="m-auto  min-body-custom">
      <Footer />
    </div>
    </>
  )
}
