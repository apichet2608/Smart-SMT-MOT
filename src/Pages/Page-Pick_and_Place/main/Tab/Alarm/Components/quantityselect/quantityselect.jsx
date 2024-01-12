import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function quantityselect({
  quantity,
  handleQuantityChange,
  handleDecrement,
  handleIncrement,
}) {
  return (
    <div>
      <TextField
        type="number"
        value={quantity}
        onChange={handleQuantityChange}
        label="Hr"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton onClick={handleDecrement}>
                <RemoveIcon />
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleIncrement}>
                <AddIcon />
              </IconButton>
            </InputAdornment>
          ),
          inputProps: {
            style: {
              textAlign: "center",
            },
          },
        }}
        sx={{ width: "100%" }}
      />
    </div>
  );
}

export default quantityselect;
