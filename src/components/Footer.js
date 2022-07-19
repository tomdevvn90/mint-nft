import React from "react";

import KawaText from "../assets/kawa-text.png";
import KawaLogo from "../assets/kawa-logo.png";
import  Socials  from "./Socials";

export default function Footer() {
  return (
    <footer className="relative md:flex md:h-40 items-center border-[#505050] border-t  justify-between md:px-12 px-6 text-center md:text-left ">
      <div className="md:flex items-center justify-center md:justify-start mt-8 md:mt-0">
        <div className="flex items-center justify-center md:justify-start h-14 mr-8">
          <img src={KawaLogo} alt="Kawakami NFT" className="h-8 pr-2" />
          <img src={KawaText} alt="Kawakami NFT" className="h-4" />
        </div>
        <div className="font-simplon-bp" style={{ color: "#505050" }}>
          Kawakami© 2022
        </div>
      </div>
      <div className="mt-6 pb-8 md:pb-0 md:mt-0 flex justify-center">
        <Socials />
      </div>
    </footer>
  );
}
