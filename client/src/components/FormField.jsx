import React from "react";

const FormField = ({
  labelName,
  placeHolder,
  inputType,
  isTextArea,
  value,
  handleChange,
}) => {
  return (
    <label className="flex flex-col flex-1 w-full">
      {labelName && (
        <span className="text-[14px] leading-5 text-black mb-3">
          {labelName}
        </span>
      )}
      {isTextArea ? (
        <textarea
          required
          value={value}
          onChange={handleChange}
          placeholder={placeHolder}
          rows={10}
          className="py-[15px] px-[15px] outline-none border-[1px] border-[#e5e5e5] rounded-[10px] text-black text-[14px]"
        />
      ) : (
        <input
          required
          value={value}
          onChange={handleChange}
          type={inputType}
          placeholder={placeHolder}
          step="0.1"
          className="py-[15px] px-[15px] outline-none border-[1px] border-[#e5e5e5] rounded-[10px] text-black text-[14px]"
        />
      )}
    </label>
  );
};

export default FormField;
