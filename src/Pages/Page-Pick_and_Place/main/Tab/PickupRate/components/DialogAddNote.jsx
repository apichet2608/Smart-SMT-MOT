import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function DialogAddNote({
  open,
  setOpen,
  note,
  setNote,
  handleAddNote,
}) {
  return (
    <div className="">
      <Dialog fullWidth maxWidth="xl" open={open}>
        <DialogTitle>Add Note</DialogTitle>
        <DialogContent>
          <TextField
            type="text"
            value={note}
            onChange={(e) => {
              setNote(e.target.value);
            }}
            variant="standard"
            label="Note"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <button
            onClick={() => {
              handleAddNote();
            }}
            className="btn btn-success"
          >
            Add
          </button>

          <button
            onClick={() => {
              setOpen(false);
              setNote("");
            }}
            className="btn btn-error"
          >
            X
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
