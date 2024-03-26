import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

export default function Print_posTable({ datafromAPIpos }) {
  const [DataTableAPIpos, setDataTableAPIpos] = useState([]);

  useEffect(() => {
    // Make an API request and fetch dataz
    console.log(datafromAPIpos);
    if (datafromAPIpos && datafromAPIpos.length > 0) {
      setDataTableAPIpos(datafromAPIpos);
    } else {
      setDataTableAPIpos([]);
    }
  }, [datafromAPIpos]);

  function formatdatewithtime(date) {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    const formattedDate = new Date(date).toLocaleString(undefined, options);
    return formattedDate;
  }

  const columns = [
    {
      field: "line_machine",
      headerName: "Machine",
      width: 120,
      renderCell: (params) => (
        <span style={{ color: "#34495E", fontWeight: "bold" }}>
          {params.value}
        </span>
      ),
    },
    {
      field: "program_name_cut",
      headerName: "Program",
      width: 200,
      renderCell: (params) => (
        <span style={{ color: "#6495ED", fontWeight: "bold" }}>
          {params.value}
        </span>
      ),
    },
    {
      field: "update_at",
      headerName: "Date",
      width: 230,
      renderCell: (params) => {
        return formatdatewithtime(params.row.update_at);
      },
    },
    {
      field: "x",
      headerName: "X",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "y",
      headerName: "Y",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "angle",
      headerName: "Angle",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
  ];

  return (
    <Box sx={{ height: 550, width: "100%" }}>
      <DataGrid
        rows={DataTableAPIpos}
        columns={columns}
        pagination
        rowHeight={25}
        pageSize={5}
        sx={{
          height: 550,
          maxWidth: "100%",
          marginTop: 2,
          "& .MuiDataGrid-cell": {
            borderRight: "1px solid #e0e0e0",
            // borderTop: "1px solid #e0e0e0",
          },
          "& .MuiDataGrid-columnHeader": {
            borderRight: "1px solid #e0e0e0",
            borderTop: "1px solid #e0e0e0",
            alignItems: "center",
            justifyContent: "center",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bold",
            color: "#17202A",
            fontSize: "14px",
            textAlign: "center",
            FontFace: "Poppins",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
        slots={{
          toolbar: GridToolbar,
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
      />
    </Box>
  );
}
