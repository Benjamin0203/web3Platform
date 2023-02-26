import React, { useState, useEffect } from "react";
import { useStateContext } from "../context";

import { DisplayCampaigns } from "../components";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, getCampaigns, contract, getUserPosts } = useStateContext();

  const fetchUserPosts = async () => {
    setIsLoading(true);
    const data = await getUserPosts();
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchUserPosts();
  }, [address, contract]);

  return (
    <DisplayCampaigns
      title="All posts"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  );
};

export default Profile;
