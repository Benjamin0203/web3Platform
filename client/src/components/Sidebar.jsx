import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { logo, sun, happyEmoji } from "../assets";
import { navlinks } from "../constants";

const Icon = ({ styles, name, imageUrl, isActive, disabled, handleClick }) => {
  return (
    <div
      className={`w-[60px] rounded-[10px] 
      ${isActive && isActive === name && "bg-[#c1c2c5]"}
      flex justify-center items-center
      ${!disabled && "cursor-pointer"}
      ${styles}`}
      onClick={handleClick}
    >
      {!isActive ? (
        <img src={imageUrl} alt="fund_logo" className="w-1/2 h-1/2" />
      ) : (
        <img
          src={imageUrl}
          alt="fund_logo"
          className={`w-1/2 h-1/2 ${isActive !== name && "grayscale"}`}
        />
      )}
    </div>
  );
};

const Sidebar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");
  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      <Link to="/">
        <Icon styles="w-[52px] h-[52px] bg-[#FAF9F6]" imageUrl={happyEmoji} />
      </Link>

      <div className=" flex flex-1 flex-col justify-between items-center bg-[#FAF9F6] rounded-[10px] w-[80px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link, index) => (
            <Icon
              key={link.name}
              styles="w-[52px] h-[52px] shadow-lg"
              {...link}
              isActive={isActive}
              handleClick={() => {
                if (!link.disabled) {
                  setIsActive(link.name);
                  navigate(link.link);
                }
              }}
            />
          ))}
        </div>
        <Icon styles="bg-[#FAF9F6] shadow-lg" imageUrl={sun} />
      </div>
    </div>
  );
};

export default Sidebar;
