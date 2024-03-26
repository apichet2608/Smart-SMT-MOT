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
    {
      field: "line_machine",
      headerName: "Machine",
      width: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <span style={{ color: "#34495E", fontWeight: "bold" }}>
          {params.value}
        </span>
      ),
    },
    {
      field: "program_name",
      headerName: "Program",
      width: 160,
      // align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <span style={{ color: "  #6495ED", fontWeight: "bold" }}>
          {params.value}
        </span>
      ),
    },
    {
      field: "update_at",
      headerName: "Date",
      width: 200,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return formatdatewithtime(params.row.update_at);
      },
    },
    {
      field: "cln_mode_1_flg",
      headerName: "1st round operate",
      width: 140,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const cln_mode_2_flg = params.value;
        let backgroundColor, result;
        let color = "";

        switch (cln_mode_2_flg) {
          case "ON":
            backgroundColor = "#ABEBC6";
            color = "#0E6655";

            result = "ON";
            break;
          case "OFF":
            backgroundColor = "#F5B7B1";
            color = "#922B21";
            result = "OFF";
            break;
        }

        return (
          <span
            style={{
              backgroundColor,
              width: 60,
              height: 20,
              color: color,
              borderRadius: "10px",
              fontSize: 15,
              fontWeight: "bold",
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
      field: "interval_mode_1",
      headerName: "1st round interval",
      width: 140,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "cln_mode_2_flg",
      headerName: "2nd round operate",
      width: 140,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const cln_mode_2_flg = params.value;
        let backgroundColor, result;
        let color = "";

        switch (cln_mode_2_flg) {
          case "ON":
            backgroundColor = "#ABEBC6";
            color = "#0E6655";

            result = "ON";
            break;
          case "OFF":
            backgroundColor = "#F5B7B1";
            color = "#922B21";
            result = "OFF";
            break;
        }

        return (
          <span
            style={{
              backgroundColor,
              width: 60,
              height: 20,
              color: color,
              borderRadius: "10px",
              fontSize: 15,
              fontWeight: "bold",
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
      field: "interval_mode_2",
      headerName: "2nd round interval",
      width: 140,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "auto_flg",
      headerName: "Process wait",
      width: 110,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const cln_mode_2_flg = params.value;
        let backgroundColor, result;
        let color = "";

        switch (cln_mode_2_flg) {
          case "ON":
            backgroundColor = "#ABEBC6";
            color = "#0E6655";

            result = "ON";
            break;
          case "OFF":
            backgroundColor = "#F5B7B1";
            color = "#922B21";
            result = "OFF";
            break;
        }

        return (
          <span
            style={{
              backgroundColor,
              width: 60,
              height: 20,
              color: color,
              borderRadius: "10px",
              fontSize: 15,
              fontWeight: "bold",
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
    {
      field: "auto_time",
      headerName: "Wait print (min)",
      width: 130,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "fwd_speed_1_st",
      headerName: "1st clean speed forward",
      width: 180,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "bwd_speed_1_st",
      headerName: "1st clean speed backward",
      width: 190,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "fwd_speed_2_nd",
      headerName: "2nd clean speed forward",
      width: 190,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "bwd_speed_2_nd",
      headerName: "2nd clean speed backward",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "wet_flg_1_st",
      headerName: "1st wet forward",
      width: 130,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const cln_mode_2_flg = params.value;
        let backgroundColor, result;
        let color = "";

        switch (cln_mode_2_flg) {
          case "ON":
            backgroundColor = "#ABEBC6";
            color = "#0E6655";

            result = "ON";
            break;
          case "OFF":
            backgroundColor = "#F5B7B1";
            color = "#922B21";
            result = "OFF";
            break;
        }

        return (
          <span
            style={{
              backgroundColor,
              width: 60,
              height: 20,
              color: color,
              borderRadius: "10px",
              fontSize: 15,
              fontWeight: "bold",
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
      width: 140,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const cln_mode_2_flg = params.value;
        let backgroundColor, result;
        let color = "";

        switch (cln_mode_2_flg) {
          case "ON":
            backgroundColor = "#ABEBC6";
            color = "#0E6655";

            result = "ON";
            break;
          case "OFF":
            backgroundColor = "#F5B7B1";
            color = "#922B21";
            result = "OFF";
            break;
        }

        return (
          <span
            style={{
              backgroundColor,
              width: 60,
              height: 20,
              color: color,
              borderRadius: "10px",
              fontSize: 15,
              fontWeight: "bold",
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
      width: 150,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const cln_mode_2_flg = params.value;
        let backgroundColor, result;
        let color = "";

        switch (cln_mode_2_flg) {
          case "ON":
            backgroundColor = "#ABEBC6";
            color = "#0E6655";

            result = "ON";
            break;
          case "OFF":
            backgroundColor = "#F5B7B1";
            color = "#922B21";
            result = "OFF";
            break;
        }

        return (
          <span
            style={{
              backgroundColor,
              width: 60,
              height: 20,
              color: color,
              borderRadius: "10px",
              fontSize: 15,
              fontWeight: "bold",
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
      width: 170,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const cln_mode_2_flg = params.value;
        let backgroundColor, result;
        let color = "";

        switch (cln_mode_2_flg) {
          case "ON":
            backgroundColor = "#ABEBC6";
            color = "#0E6655";

            result = "ON";
            break;
          case "OFF":
            backgroundColor = "#F5B7B1";
            color = "#922B21";
            result = "OFF";
            break;
        }

        return (
          <span
            style={{
              backgroundColor,
              width: 60,
              height: 20,
              color: color,
              borderRadius: "10px",
              fontSize: 15,
              fontWeight: "bold",
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
      width: 160,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const cln_mode_2_flg = params.value;
        let backgroundColor, result;
        let color = "";

        switch (cln_mode_2_flg) {
          case "ON":
            backgroundColor = "#ABEBC6";
            color = "#0E6655";

            result = "ON";
            break;
          case "OFF":
            backgroundColor = "#F5B7B1";
            color = "#922B21";
            result = "OFF";
            break;
        }

        return (
          <span
            style={{
              backgroundColor,
              width: 60,
              height: 20,
              color: color,
              borderRadius: "10px",
              fontSize: 15,
              fontWeight: "bold",
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
      width: 180,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const cln_mode_2_flg = params.value;
        let backgroundColor, result;
        let color = "";

        switch (cln_mode_2_flg) {
          case "ON":
            backgroundColor = "#ABEBC6";
            color = "#0E6655";

            result = "ON";
            break;
          case "OFF":
            backgroundColor = "#F5B7B1";
            color = "#922B21";
            result = "OFF";
            break;
        }

        return (
          <span
            style={{
              backgroundColor,
              width: 60,
              height: 20,
              color: color,
              borderRadius: "10px",
              fontSize: 15,
              fontWeight: "bold",
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
        // getRowHeight={() => "auto"}
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
          backgroundColor: "#fff",
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
