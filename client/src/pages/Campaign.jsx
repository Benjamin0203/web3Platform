import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ethers } from "ethers";

import { useStateContext } from "../context";
import { CustomButton } from "../components";
import { thirdweb } from "../assets";

const Campaign = () => {
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
      {isLoading && <Loader />}
      <div>
        Author: <span className="font-bold text-red-500">{state.owner}</span>
      </div>
      <div>
        <h3>Support</h3>
        <div className="mt-10">
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
      </div>
    </div>
  );
};

export default Campaign;
