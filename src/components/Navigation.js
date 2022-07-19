/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect,useState } from "react";
import KawaText from "../assets/kawa-text.png";
import KawaLogo from "../assets/kawa-logo.png";
import Menu from "../assets/menu.svg";
import Arrow from "../assets/arrow.svg";
import Close from "../assets/close.svg";
import WalletNotConnected from "../assets/wallet-not-connected.svg";
import  Socials  from "./Socials";

export default function Navigation() {
  const [showMenu,setShowmenu] = useState(false);
  const setMenu = () =>{
    setShowmenu(!showMenu)
  }
  return (
    <nav className="w-[100%] md:top-[40px] top-[0] md:bg-[#ffffff00] bg-[#000] z-[100] left-0 right-0 h-14 flex justify-between items-center w-screen border-b border-[#505050]">
      <div
        className="flex items-center border-[#505050] md:border-r h-14 px-2 md:px-6 cursor-pointer"
      >
        <img src={KawaLogo} alt="Kawakami NFT" className="h-6 md:h-8 pr-2" />
        <img src={KawaText} alt="Kawakami NFT" className="h-3 md:h-4" />
      </div>
      <div className="hidden lg:flex text-white text font-simplon-bp-mono font-medium">
        <a href="https://nft.kawakami.io/#about"
          className="hover:bg-white uppercase transition duration-500 hover:text-black cursor-pointer md:h-14 flex items-center justify-center md:w-28"
        >
          ABOUT
        </a>
        <a href="https://nft.kawakami.io/#team"
          className="hover:bg-white uppercase transition duration-500 hover:text-black cursor-pointer md:h-14 flex items-center justify-center md:w-28"
        >
          TEAM
        </a>
        <a href="https://nft.kawakami.io/#roadmap"
          className="hover:bg-white uppercase transition duration-500 hover:text-black cursor-pointer md:h-14 flex items-center justify-center md:w-28"
        >
          ROADMAP
        </a>
        <a
          href="https://kawakami.io/"
          target="_blank"
          className="hover:bg-white uppercase transition duration-500 hover:text-black cursor-pointer md:h-14 flex items-center justify-center px-[20px]"
          rel="noreferrer"
        >
          ABOUT $KAWA
        </a>
      </div>
      <div className="flex">
        <div className="bg-black-alt h-14 flex items-center px-4 border-[#505050] border opacity-70 border-r-0 border-b-0 border-t-0">
          <img src={WalletNotConnected} className="h-4 -mt-1 mr-2" />
          <span className="font-simplon-bp text-white">NOT CONNECTED</span>
        </div>
        <button
          onClick={setMenu}
          className="lg:hidden bg-black h-14 w-14 md:w-48 flex justify-center items-center text-white font-simplon-bp font-medium text-lg border-[#505050] border-b"
        >
          <img src={showMenu ? Close : Menu} />
        </button>
      </div>
      {showMenu && (
        <div className="lg:hidden  flex flex-col justify-between fixed top-[96px] left-0 w-screen h-screen h-full bg-black overflow-hidden text-white font-simplon-bp text-lg z-20">
          <div>
            <a href="https://nft.kawakami.io/#about"
              className="h-20 flex items-center justify-between px-4 border-[#505050] border-b"
            >
              <span>ABOUT</span>
              <img src={Arrow} className="h-5" />
            </a>
            <a href="https://nft.kawakami.io/#team"
              className="h-20 flex items-center justify-between px-4 border-[#505050] border-b"
            >
              <span>TEAM</span>
              <img src={Arrow} className="h-5" />
            </a>
            <a
              href="https://nft.kawakami.io/#roadmap"
              className="h-20 flex items-center justify-between px-4 border-[#505050] border-b"
            >
              <span>ROADMAP</span>
              <img src={Arrow} className="h-5" />
            </a>
            <a
              href="https://kawakami.io/"
              target="_blank"
              className="h-20 flex items-center justify-between px-4 border-[#505050] border-b"
              rel="noreferrer"
            >
              <span>ABOUT $KAWA</span>
              <img src={Arrow} className="h-5" />
            </a>
          </div>
          <div className="fixed bottom-12 -mt-36 custom-footer-mobile">
            <Socials />
          </div>
        </div>
      )}
    </nav>
  );
}
