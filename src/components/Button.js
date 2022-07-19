import React from "react";
import sx from "classnames";
import Arrow from "../assets/arrow.svg";

export default function Button({
  text,
  onClick,
  size = "md",
  type = "primary",
  isFit = false,
  disabled = false,
  isFull = false
}: {
  text: string;
  onClick: () => void;
  size?: "md" | "lg";
  type?: "primary" | "outline" | "dark" | "light-dark";
  isFit?: boolean;
  isFull?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={sx(
        "group h-14 tracking-[-0.015em] w-32 flex justify-center items-center text-white font-simplon-bp font-medium text-[14px] leading-[28px] md:text-[18px] md:leading-[100%]",
        {
          "md:w-48": size === "md",
          "md:w-64": size === "lg",
          "hover:bg-primary-red bg-outrageous-orange": type === "primary",
          "border border-white": type === "outline",
          "w-full": isFit,
          "bg-gray": type === "dark",
          "md:w-full": isFull
        }
      )}
    >
      <span
        className={sx("", {
          "group-hover:hidden block back-to-place-anim": !disabled
        })}
      >
        {text}
      </span>
      {!disabled && (
        <span
          className={sx("", {
            "group-hover:block hidden backward-anim": !disabled
          })}
        >
          {text}
        </span>
      )}
      <img
        src={Arrow}
        className={sx("h-6", {
          "hidden group-hover:block forward-anim": !disabled
        })}
      />
    </button>
  );
}
