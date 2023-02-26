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
    <div className="cursor-pointer h-full items-center" onClick={handleClick}>
      <h2 className="font-bold">{title}</h2>
      <img
        src={image}
        alt="postdetailImage"
        className="object-fill rounded-lg w-[400px] h-[400px] sm:w-[200px] sm:h-[200px]"
      />
      <div className="block mb-2">
        <p>{description}</p>
      </div>
      <div className="block">
        {/* <h2>
          target: <span className="text-green-400 font-semibold">ETH</span>
          {target}
        </h2> */}
        <p>
          Supports: {amountCollected}
          <span className="text-green-800 font-semibold"> ETH</span>{" "}
        </p>
      </div>
      <div className="flex items-center mt-3 gap-2">
        <p className="flex-1">
          {" "}
          author: <span className="text-red-500 text-ellipsis">{owner}</span>
        </p>
      </div>
    </div>
  );
};

export default PostDetail;
