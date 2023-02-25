import React, { useState, useEffect } from "react";
import { useStateContext } from "../context";

import { DisplayCampaigns } from "../components";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, getCampaigns, contract } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [contract, address]);

  return (
    <DisplayCampaigns
      title="All posts"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  );
};

export default Home;
