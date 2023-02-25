import React from "react";
import { tagType, thirdweb } from "../assets";
import { daysLeft } from "../utils";

const PostDetail = ({
  owner,
  title,
  description,
  target,
  deadline,
  amountCollected,
  image,
  handleClick,
}) => {
  const remainingDays = daysLeft(deadline);

  return (
    <div className="cursor-pointer flex-1 flex-col" onClick={handleClick}>
      <img
        src={image}
        alt="fund"
        className="object-fill rounded-lg w-[400px] h-[400px]"
      />
      <div className="block mb-2">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="block">
        <h2>target: {target}</h2>
        <p>collected: {amountCollected}</p>
      </div>
    </div>
  );
};

export default PostDetail;
