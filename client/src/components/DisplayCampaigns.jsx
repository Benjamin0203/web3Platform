import React from "react";
import { useNavigate } from "react-router-dom";

import { loader } from "../assets";

const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
  return (
    <div>
      <h1 className="text-[18px] font-bold text-black text-left">
        {title} ({campaigns?.length ? campaigns.length : 0})
      </h1>

      <div className="flex flex-wrap mt-5 gap-7">
        {isLoading && (
          <img
            src={loader}
            alt="loader"
            className="w-24 h-24 object-contain "
          />
        )}
      </div>
    </div>
  );
};

export default DisplayCampaigns;
