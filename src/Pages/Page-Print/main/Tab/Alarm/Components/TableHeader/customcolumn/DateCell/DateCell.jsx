// DateCell.js
import React from "react";
import { formatDate } from "../../../../../../../../../utils/formatCreateDate";

const DateCell = ({ value }) => {
  return (
    <div className="flex items-center justify-center w-full  rounded-3xl font-extrabold p-0.5">
      {formatDate(value)}
    </div>
  );
};

export default DateCell;
