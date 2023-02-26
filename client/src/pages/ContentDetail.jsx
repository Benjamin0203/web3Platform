import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ethers } from "ethers";

import { useStateContext } from "../context";
import { CustomButton } from "../components";
import { thirdweb } from "../assets";

const ContentDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { donate, getDonations, contract, address } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [donators, setDonators] = useState([]);

  const fetchDonators = async () => {
    const data = await getDonations(state.id);
    setDonators(data);
  };
  const handleDonate = async () => {
    setIsLoading(true);
    await donate(state.pId, amount);
    navigate("/");
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchDonators();
  }, [contract, address]);

  return (
    <div>
      {isLoading && "Loading..."}
      <div>
        <h2 className="font-bold uppercase text-[40px] hover:text-green-400">
          {state.title}
        </h2>
      </div>
      <div>
        Author:{" "}
        <span className="font-bold text-red-500 hover:text-yellow-300">
          {state.owner}
        </span>
      </div>

      <div>
        {/* <p>target: {state.target}</p> */}
        <p>Supports: {state.amountCollected} ETH</p>
      </div>
      <div className="border-4 border-red-600/[.55] rounded-lg text-[18px] leading-5">
        {state.description}
      </div>

      <div>
        <h3 className="my-2 text-xl">
          Like this post? Consider supporting the author!😍{" "}
        </h3>
        <div className="mt-5">
          <input
            type="number"
            placeholder="ETH 0.1"
            step="0.01"
            min="0"
            className="py-2 mx-4 w-full sm:px-4 outline-none rounded-lg"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <CustomButton
          btnType="button"
          title="Support this post"
          handleClick={handleDonate}
          styles="mt-5"
        />
      </div>
    </div>
  );
};

export default ContentDetail;
