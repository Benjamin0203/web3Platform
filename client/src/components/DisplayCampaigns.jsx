import React from "react";
import { useNavigate } from "react-router-dom";

import { loader } from "../assets";
import { PostDetail } from "../components";

const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate();
  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };
  console.log("--fetched all campaigns: ", campaigns);
  return (
    <div>
      <h1 className="text-[18px] font-bold text-black text-left">
        {title} ({campaigns?.length})
      </h1>
      {/* <PostDetail /> */}
      <div className="flex flex-wrap mt-5 gap-7">
        {isLoading && (
          <img
            src={loader}
            alt="loader"
            className="w-24 h-24 object-contain "
          />
        )}
        {!isLoading && campaigns?.length === 0 && <div> nothing here</div>}
        {!isLoading &&
          campaigns?.length > 0 &&
          campaigns.map((campaign, index) => {
            return (
              <PostDetail
                key={index}
                {...campaign}
                handleClick={() => {
                  handleNavigate(campaign);
                  console.log("clicked");
                }}
              />
            );
          })}
      </div>
    </div>
  );
};

export default DisplayCampaigns;
