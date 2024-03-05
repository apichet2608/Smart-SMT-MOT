// StatusChip.js
import React from "react";

const StatusChip = ({ status }) => {
  let backgroundColor = "";
  let hoverBackgroundColor = "";

  switch (status) {
    case "FAIL":
      backgroundColor = "bg-red-400";
      hoverBackgroundColor = "hover:bg-red-500";
      break;
    case "PASS":
      backgroundColor = "bg-green-400";
      hoverBackgroundColor = "hover:bg-green-500";
      break;
    default:
      // Set default styles or handle other cases
      break;
  }

  return (
    <div
      className={`${backgroundColor} ${hoverBackgroundColor} border-2 border-gray-200 rounded-2xl text-black text-center w-full font-bold`}
    >
      {status}
    </div>
  );
};

export default StatusChip;
