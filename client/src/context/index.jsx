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
  //this is the address of the contract
  const { contract } = useContract(
    "0x7Abf98A1b7c43C8656326D55A69520c9d67E3378"
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

  const donate = async (pId, amount) => {
    const data = await contract.call("donateToCampaign", pId, {
      value: ethers.utils.parseEther(amount),
    });
    return data;
  };

  const getDonations = async (pId) => {
    const donations = await contract.call("getDonators", pId);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];
    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donation: ethers.utils.formatEther(donations[1][i].toString()),
        donator: donations[0][i],
      });
    }
    return parsedDonations;
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
        donate,
        getDonations,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
