import React from "react";
import { TextField } from "@mui/material";

export default function FilterDate({
  idLabel,
  value,
  setValue,
  formattedDate,
}) {
  return (
    <>
      <div className="bg-white p-2 rounded-xl shadow-md">
        <TextField
          id={idLabel}
          label={idLabel}
          type="date"
          variant="standard"
          sx={{
            width: "100%",
            '& input[type="date"]::-webkit-calendar-picker-indicator': {
              filter: "invert(1)", // This inverts the color to black
            },
          }}
          value={value}
          onChange={(e) =>
            setValue(e.target.value ? e.target.value : formattedDate)
          }
        />
      </div>
    </>
  );
}
