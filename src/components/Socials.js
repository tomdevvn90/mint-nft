import React from "react";
import Discord from "../assets/discord.svg";
import Reddit from "../assets/reddit.svg";
import Instagram from "../assets/instagram.svg";
import Medium from "../assets/medium.svg";
import Telegram from "../assets/telegram.svg";
import Twitter from "../assets/twitter.svg";
import Youtube from "../assets/youtube.svg";
import NftCalendar from "../assets/nft-calendar-transparent.png";

export default function Socials() {
  return (
    <div className="flex md:flex-row flex-col-reverse -mt-4 md:mt-0">
      <div className="flex items-center space-x-3">
        <a
          href="https://discord.com/invite/kawakami"
          target="_blank"
          rel="noreferrer"
        >
          <div className="hover:border border-white p-2 rounded-full w-[40px] h-[40px] flex items-center justify-center">
            <img src={Discord} />
          </div>
        </a>
        <a
          href="https://www.reddit.com/r/kawatoken/"
          target="_blank"
          rel="noreferrer"
        >
          <div className="hover:border border-white p-2 rounded-full  w-[40px] h-[40px] flex items-center justify-center">
            <img src={Reddit} />
          </div>
        </a>
        <a
          href="https://www.instagram.com/kawakami_io/"
          target="_blank"
          rel="noreferrer"
        >
          <div className="hover:border border-white p-2 rounded-full w-[40px] h-[40px] flex items-center justify-center">
            <img src={Instagram} />
          </div>
        </a>
        <a
          href="https://kawatoken.medium.com/"
          target="_blank"
          rel="noreferrer"
        >
          <div className="hover:border border-white p-2 rounded-full w-[40px] h-[40px] flex items-center justify-center">
            <img src={Medium} />
          </div>
        </a>
        <a href="https://t.me/kawaportal" target="_blank" rel="noreferrer">
          <div className="hover:border border-white p-2 rounded-full w-[40px] h-[40px] flex items-center justify-center">
            <img src={Telegram} />
          </div>
        </a>
        <a
          href="https://twitter.com/KawakamiNFT"
          target="_blank"
          rel="noreferrer"
        >
          <div className="hover:border border-white p-2 rounded-full w-[40px] h-[40px] flex items-center justify-center">
            <img src={Twitter} />
          </div>
        </a>

        <a href="#" target="_blank" rel="noreferrer">
          <div className="hover:border border-white p-2 rounded-full  w-[40px] h-[40px] flex items-center justify-center">
            <img className="" src={Youtube} />
          </div>
        </a>
      </div>
      <a
        href="https://nftcalendar.io/event/kawakami-nft-minting/"
        target="_blank"
        rel="noreferrer"
      >
        <div className="flex md:justify-end justify-center">
          <img className="h-28" src={NftCalendar} />
        </div>
      </a>
    </div>
  );
}
