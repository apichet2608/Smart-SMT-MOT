import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

export default function Print_conTable({ datafromAPIprintcon }) {
  const [DataTableAPIprintcon, setDataTableAPIprintcon] = useState([]);

  useEffect(() => {
    // Make an API request and fetch dataz
    console.log(datafromAPIprintcon);
    if (datafromAPIprintcon && datafromAPIprintcon.length > 0) {
      setDataTableAPIprintcon(datafromAPIprintcon);
    } else {
      setDataTableAPIprintcon([]);
    }
  }, [datafromAPIprintcon]);

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
    { field: "line_machine", headerName: "Machine", width: 100 },
    { field: "program_name", headerName: "Program", width: 200 },
    {
      field: "update_at",
      headerName: "Date",
      width: 210,
      renderCell: (params) => {
        return formatdatewithtime(params.row.update_at);
      },
    },
    { field: "f_sq_speed", headerName: "Print speed F", width: 200 },
    { field: "r_sq_speed", headerName: "Print speed R", width: 200 },
    { field: "sq_press_f", headerName: "Print pressure F", width: 200 },
    { field: "sq_press_r", headerName: "Print pressure R", width: 200 },
    { field: "sq_length", headerName: "Squeege length", width: 200 },
    { field: "prt_stroke_f", headerName: "Offset F", width: 200 },
    { field: "prt_stroke_r", headerName: "Offset R", width: 200 },
    { field: "clearance", headerName: "Cleanrance", width: 200 },
    { field: "lift_dwn_speed", headerName: "Down speed", width: 200 },
    { field: "lift_dwn_stroke", headerName: "Down stroke", width: 200 },
  ];

  return (
    <Box sx={{ height: 550, width: "100%" }}>
      <DataGrid
        rows={DataTableAPIprintcon}
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
