import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export default function FilterSelect({ label, options, value, setValue }) {
  return (
    <div className="bg-white p-2 rounded-xl shadow-md">
      <Autocomplete
        id={label}
        options={options || []}
        value={value}
        getOptionLabel={(option) => option}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            placeholder="All"
            variant="standard"
          />
        )}
        onChange={(event, newValue) => {
          setValue(newValue ? newValue : "");
        }}
      />
    </div>
  );
}
