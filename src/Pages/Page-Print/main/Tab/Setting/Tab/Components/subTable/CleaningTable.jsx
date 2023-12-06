import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

export default function CleaningTable({ datafromAPIcleaning }) {
  const [DataTableAPIcleaning, setDataTableAPIcleaning] = useState([]);

  useEffect(() => {
    // Make an API request and fetch dataz
    console.log(datafromAPIcleaning);
    if (datafromAPIcleaning && datafromAPIcleaning.length > 0) {
      setDataTableAPIcleaning(datafromAPIcleaning);
    } else {
      setDataTableAPIcleaning([]);
    }
  }, [datafromAPIcleaning]);

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
    { field: "program_name", headerName: "Program", width: 160 },
    {
      field: "update_at",
      headerName: "Date",
      width: 200,
      renderCell: (params) => {
        return formatdatewithtime(params.row.update_at);
      },
    },
    {
      field: "cln_mode_1_flg",
      headerName: "1st round operate",
      width: 130,
      renderCell: (params) => {
        const cln_mode_1_flg = params.value;
        let backgroundColor, result;

        switch (cln_mode_1_flg) {
          case "ON":
            backgroundColor = "#58D68D";
            result = "ON";
            break;
          case "OFF":
            backgroundColor = "#F1948A";
            result = "OFF";
            break;
        }

        return (
          <span
            style={{
              backgroundColor,
              width: 60,
              height: 20,
              color: "black",
              borderRadius: "10px",
              fontSize: 15,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {result}
          </span>
        );
      },
    },
    { field: "interval_mode_1", headerName: "1st round interval", width: 130 },
    {
      field: "cln_mode_2_flg",
      headerName: "2nd round operate",
      width: 130,
      renderCell: (params) => {
        const cln_mode_2_flg = params.value;
        let backgroundColor, result;

        switch (cln_mode_2_flg) {
          case "ON":
            backgroundColor = "#58D68D";
            result = "ON";
            break;
          case "OFF":
            backgroundColor = "#F1948A";
            result = "OFF";
            break;
        }

        return (
          <span
            style={{
              backgroundColor,
              width: 60,
              height: 20,
              color: "black",
              borderRadius: "10px",
              fontSize: 15,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {result}
          </span>
        );
      },
    },
    { field: "interval_mode_2", headerName: "2nd round interval", width: 135 },
    {
      field: "auto_flg",
      headerName: "Process wait",
      width: 105,
      renderCell: (params) => {
        const auto_flg = params.value;
        let backgroundColor, result;

        switch (auto_flg) {
          case "ON":
            backgroundColor = "#58D68D";
            result = "ON";
            break;
          case "OFF":
            backgroundColor = "#F1948A";
            result = "OFF";
            break;
        }

        return (
          <span
            style={{
              backgroundColor,
              width: 60,
              height: 20,
              color: "black",
              borderRadius: "10px",
              fontSize: 15,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {result}
          </span>
        );
      },
    },
    // {
    //   field: "auto_flg",
    //   headerName: "Process wait",
    //   width: 105,
    //    renderCell: (params) => (
    //   <span
    //     style={{
    //       color: params.value === "OFF" ? "#E74C3C" : "#2ECC71",
    //     }}
    //   >
    //     {params.value}
    //   </span>
    // ),
    // },
    { field: "auto_time", headerName: "Wait print (min)", width: 110 },
    {
      field: "fwd_speed_1_st",
      headerName: "1st clean speed forward",
      width: 170,
    },
    {
      field: "bwd_speed_1_st",
      headerName: "1st clean speed backward",
      width: 180,
    },
    {
      field: "fwd_speed_2_nd",
      headerName: "2nd clean speed forward",
      width: 170,
    },
    {
      field: "bwd_speed_2_nd",
      headerName: "2nd clean speed backward",
      width: 190,
    },
    {
      field: "wet_flg_1_st",
      headerName: "1st wet forward",
      width: 120,
      renderCell: (params) => {
        const wet_flg_1_st = params.value;
        let backgroundColor, result;

        switch (wet_flg_1_st) {
          case "ON":
            backgroundColor = "#58D68D";
            result = "ON";
            break;
          case "OFF":
            backgroundColor = "#F1948A";
            result = "OFF";
            break;
        }

        return (
          <span
            style={{
              backgroundColor,
              width: 60,
              height: 20,
              color: "black",
              borderRadius: "10px",
              fontSize: 15,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {result}
          </span>
        );
      },
    },
    {
      field: "wet_flg_2_nd",
      headerName: "1st wet backward",
      width: 130,
      renderCell: (params) => {
        const wet_flg_2_nd = params.value;
        let backgroundColor, result;

        switch (wet_flg_2_nd) {
          case "ON":
            backgroundColor = "#58D68D";
            result = "ON";
            break;
          case "OFF":
            backgroundColor = "#F1948A";
            result = "OFF";
            break;
        }

        return (
          <span
            style={{
              backgroundColor,
              width: 60,
              height: 20,
              color: "black",
              borderRadius: "10px",
              fontSize: 15,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {result}
          </span>
        );
      },
    },
    {
      field: "fwd_vac_flg_1_st",
      headerName: "1st vacuum forward",
      width: 140,
      renderCell: (params) => {
        const fwd_vac_flg_1_st = params.value;
        let backgroundColor, result;

        switch (fwd_vac_flg_1_st) {
          case "ON":
            backgroundColor = "#58D68D";
            result = "ON";
            break;
          case "OFF":
            backgroundColor = "#F1948A";
            result = "OFF";
            break;
        }

        return (
          <span
            style={{
              backgroundColor,
              width: 60,
              height: 20,
              color: "black",
              borderRadius: "10px",
              fontSize: 15,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {result}
          </span>
        );
      },
    },
    {
      field: "bwd_vac_flg_1_st",
      headerName: "1st vacuum backward",
      width: 160,
      renderCell: (params) => {
        const bwd_vac_flg_1_st = params.value;
        let backgroundColor, result;

        switch (bwd_vac_flg_1_st) {
          case "ON":
            backgroundColor = "#58D68D";
            result = "ON";
            break;
          case "OFF":
            backgroundColor = "#F1948A";
            result = "OFF";
            break;
        }

        return (
          <span
            style={{
              backgroundColor,
              width: 60,
              height: 20,
              color: "black",
              borderRadius: "10px",
              fontSize: 15,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {result}
          </span>
        );
      },
    },
    {
      field: "fwd_vac_flg_2_nd",
      headerName: "2nd vacuum forward",
      width: 140,
      renderCell: (params) => {
        const fwd_vac_flg_2_nd = params.value;
        let backgroundColor, result;

        switch (fwd_vac_flg_2_nd) {
          case "ON":
            backgroundColor = "#58D68D";
            result = "ON";
            break;
          case "OFF":
            backgroundColor = "#F1948A";
            result = "OFF";
            break;
        }

        return (
          <span
            style={{
              backgroundColor,
              width: 60,
              height: 20,
              color: "black",
              borderRadius: "10px",
              fontSize: 15,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {result}
          </span>
        );
      },
    },
    {
      field: "bwd_vac_flg_2_nd",
      headerName: "2nd vacuum backward",
      width: 160,
      renderCell: (params) => {
        const bwd_vac_flg_2_nd = params.value;
        let backgroundColor, result;

        switch (bwd_vac_flg_2_nd) {
          case "ON":
            backgroundColor = "#58D68D";
            result = "ON";
            break;
          case "OFF":
            backgroundColor = "#F1948A";
            result = "OFF";
            break;
        }

        return (
          <span
            style={{
              backgroundColor,
              width: 60,
              height: 20,
              color: "black",
              borderRadius: "10px",
              fontSize: 15,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {result}
          </span>
        );
      },
    },
  ];

  return (
    <Box sx={{ height: 550, width: "100%" }}>
      <DataGrid
        rows={DataTableAPIcleaning}
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
