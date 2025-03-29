import React from "react";

const Input = ({
  type = "text",
  name,
  value,
  onChange,
  placeholder = "",
  className = "",
  required = false,
}) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={`border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-300 focus:border-blue-500 focus:outline-none ${className}`}
    />
  );
};

export default Input;
