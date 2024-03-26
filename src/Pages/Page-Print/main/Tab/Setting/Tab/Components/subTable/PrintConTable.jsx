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
    {
      field: "line_machine",
      headerName: "Machine",
      width: 100,
      headerAlign: "center",
      align: "center",
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
      width: 210,
      renderCell: (params) => {
        return formatdatewithtime(params.row.update_at);
      },
    },
    {
      field: "f_sq_speed",
      headerName: "Print speed F",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "r_sq_speed",
      headerName: "Print speed R",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "sq_press_f",
      headerName: "Print pressure F",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "sq_press_r",
      headerName: "Print pressure R",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "sq_length",
      headerName: "Squeege length",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "prt_stroke_f",
      headerName: "Offset F",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "prt_stroke_r",
      headerName: "Offset R",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "clearance",
      headerName: "Cleanrance",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "lift_dwn_speed",
      headerName: "Down speed",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "lift_dwn_stroke",
      headerName: "Down stroke",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
  ];

  return (
    <Box sx={{ height: 550, width: "100%" }}>
      <DataGrid
        rows={DataTableAPIprintcon}
        columns={columns}
        pagination
        rowHeight={25}
        // getRowHeight={() => "auto"}
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
