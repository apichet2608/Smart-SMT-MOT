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
    { field: "line_machine", headerName: "Machine", width: 120 },
    { field: "program_name", headerName: "Program", width: 200 },
    {
      field: "update_at",
      headerName: "Date",
      width: 230,
      renderCell: (params) => {
        return formatdatewithtime(params.row.update_at);
      },
    },
    { field: "x", headerName: "X", width: 200 },
    { field: "y", headerName: "Y", width: 200 },
    { field: "angle", headerName: "Angle", width: 200 },
  ];

  return (
    <Box sx={{ height: 550, width: "100%" }}>
      <DataGrid
        rows={DataTableAPIpos}
        columns={columns}
        pagination
        getRowHeight={() => "auto"}
        pageSize={5}
        sx={{ height: 550, maxWidth: "100%", marginTop: 2 }}
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
