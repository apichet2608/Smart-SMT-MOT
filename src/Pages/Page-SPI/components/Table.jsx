import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import styled from "@emotion/styled";

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

export default function Table({ rows, columns }) {
  return (
    <div className="bg-white p-4 rounded-xl">
      <StyledDataGrid
        rows={rows}
        columns={columns}
        slots={{ toolbar: GridToolbar }}
        slotProps={{ toolbar: { showQuickFilter: true } }}
        getRowHeight={() => 35}
        sx={{
          height: 600,
        }}
      />
    </div>
  );
}
