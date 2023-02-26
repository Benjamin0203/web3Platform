import React, { useContext, createContext } from "react";
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0x8e64c40Fd4Ae4263d69a63408cc969149a27Fd7F"
  );
  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );

  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign([
        address,
        form.title,
        form.description,
        form.target,
        new Date(form.deadline).getTime(),
        form.image,
      ]);
      console.log("contract write", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  const getCampaigns = async () => {
    try {
      const campaigns = await contract.call("getCampaigns");
      // console.log("contract read", campaigns);
      const parsedCampaigns = campaigns.map((campaign, index) => {
        return {
          pId: index,
          owner: campaign.owner,
          title: campaign.title,
          description: campaign.description,
          target: ethers.utils.formatEther(campaign.target.toString()),
          deadline: campaign.deadline.toNumber(),
          image: campaign.image,
          amountCollected: ethers.utils.formatEther(
            campaign.amountCollected.toString()
          ),
        };
      });

      console.log("parsedCampaigns: ", parsedCampaigns);
      return parsedCampaigns;
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  const getUserPosts = async () => {
    const allPosts = await getCampaigns();
    const filteredPosts = allPosts.filter((post) => post.owner === address);
    return filteredPosts;
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserPosts,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
