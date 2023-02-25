import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { money } from "../assets";
import { CustomButton, FormField } from "../components";
import { checkIfImage } from "../utils";

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
  });

  const handleSubmit = () => {};

  return (
    <div className="flex flex-col justify-center items-center sm:p-10 p-4 rounded-[10px] bg-white">
      {isLoading && "is loading..."}
      <div className="flex justify-center items-center p-[16px] rounded-[10px] sm:min-w-[380px] bg-[#8ff286]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-red-700">
          Create New
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-7 w-full mt-8">
        <div className=" flex flex-wrap gap-10">
          <FormField
            labelName="Item Title"
            placeHolder="Enter item title"
            inputType="text"
            value={form.title}
            handleChange={() => {}}
          />
          <FormField
            labelName="Item Title"
            placeHolder="Enter item title"
            inputType="text"
            value={form.title}
            handleChange={() => {}}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
