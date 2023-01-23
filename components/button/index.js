import React from "react";

const Button = ({ text, onClick, image }) => {
  return (
    <button
      className={`rounded-lg  bg-purple-700 px-6 py-3 text-xl font-medium capitalize text-white ${
        !image && "hidden"
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
