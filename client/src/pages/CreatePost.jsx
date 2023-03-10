import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { money } from "../assets";
import { CustomButton, FormField } from "../components";
import { checkIfImage } from "../utils";
import { useStateContext } from "../context";

const CreatePost = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createCampaign } = useStateContext();
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
  });

  const handleFormChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(form);
    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true);
        await createCampaign({
          ...form,
          target: ethers.utils.parseUnits(form.target, 18),
        });
        console.log("");
        setIsLoading(false);
        navigate("/");
      } else {
        alert("Please enter a valid image url");
        setForm({ ...form, image: "" });
      }
    });
  };

  return (
    <div className="flex flex-col justify-center items-center sm:p-10 p-4 rounded-[10px] bg-white">
      {isLoading && "is loading..."}
      <div className="flex justify-center items-center p-[16px] rounded-[10px] sm:min-w-[380px] bg-[#6bf8fb]">
        <h1 className="font-bold sm:text-[25px] text-[18px] leading-[38px] text-red-700">
          Create New
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-7 w-full mt-8">
        <div className=" flex flex-wrap gap-10">
          <FormField
            labelName="Your Name"
            placeHolder="Enter name here"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormChange("name", e)}
          />
          <FormField
            labelName="Item Title"
            placeHolder="Title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormChange("title", e)}
          />
        </div>
        <FormField
          labelName="content"
          placeHolder="Write something about your post..."
          isTextArea
          inputType="text"
          value={form.description}
          handleChange={(e) => handleFormChange("description", e)}
        />
        <div className="flex flex-wrap gap-10">
          <FormField
            labelName="Maximun Support"
            placeHolder="ETH (numbers only)"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormChange("target", e)}
          />
          <FormField
            labelName="Post Expire Date"
            placeHolder=""
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormChange("deadline", e)}
          />
        </div>
        <FormField
          labelName="Insert image"
          placeHolder="Image url"
          inputType="url"
          value={form.image}
          handleChange={(e) => handleFormChange("image", e)}
        />
        <div className="flex justify-center items-center">
          <CustomButton btnType="submit" title="Submit" />
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
