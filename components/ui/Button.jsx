import React from "react";

const Button = ({ type = "button", className = "", children, onClick }) => {
  return (
    <button
      type={type}
      className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
