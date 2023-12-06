import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const AutocompleteComponent = ({
  options,
  selectedValue,
  onValueChange,
  getOptionLabelProp,
  labelProp,
}) => {
  return (
    <div>
      <Autocomplete
        options={options}
        getOptionLabel={getOptionLabelProp}
        value={selectedValue}
        onChange={onValueChange}
        sx={{ width: "100%" }}
        renderInput={(params) => (
          <TextField {...params} label={labelProp} variant="outlined" />
        )}
      />
    </div>
  );
};

export default AutocompleteComponent;
