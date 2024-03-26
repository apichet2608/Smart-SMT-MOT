import { useEffect, useState } from "react";
import { GridToolbar } from "@mui/x-data-grid";
import styled from "@mui/material/styles/styled";
import { DataGrid } from "@mui/x-data-grid";

//!Styles (with MUI)
const StyledDataGrid = styled(DataGrid)({
  border: "none", // Remove the border
  "& .MuiDataGrid-root": {
    border: "none", // Remove border from the root element
  },
  "& .MuiDataGrid-columnsContainer": {
    borderBottom: "none", // Remove the border at the bottom of columns
  },
  "& .MuiDataGrid-row": {
    border: "none", // Remove border around rows
  },

  "& .MuiDataGrid-columnHeaderTitle": {
    fontWeight: "bold",
    color: "#3371ff",
    fontSize: "15px",
    textAlign: "center",
    fontFace: "Poppins", // Note: Corrected property name to lowercase 'fontFace'
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  "& ::-webkit-scrollbar": {
    width: "8px",
    height: "8px",
  },
  "& ::-webkit-scrollbar-track": {
    backgroundColor: "#ffffff",
  },
  "& ::-webkit-scrollbar-thumb": {
    borderRadius: "4px",
    backgroundColor: "#3b82f6",
  },

  borderRadius: "16px", // Set the border radius for the entire DataGrid
});

export default function Datagrid({ rows, columns }) {
  return (
    <div className={`rounded-xl bg-white`}>
      <StyledDataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        slots={{ toolbar: GridToolbar }}
        slotProps={{ toolbar: { showQuickFilter: true } }}
        getRowHeight={(params) => 35}
        sx={{
          height: 400,
        }}
      />
    </div>
  );
}
