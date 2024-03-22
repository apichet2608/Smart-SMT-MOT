import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import Chip from "@mui/material/Chip";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { formatdatewithtimeforplotly } from "../../../../../utils/formatdatewithtimeforplotly"; // Import formatDate function from utils
import LoadingPage from "../../../../../Components/common/Loading/loading";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function QuantitySelect() {
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 640, // breakpoint xs
        sm: 768, // breakpoint sm
        md: 1024, // breakpoint md
        lg: 1488, // breakpoint lg
        xl: 1872, // breakpoint xl
      },
    },
  });

  const [selectedline, setSelectedline] = useState(null);
  const [distinctline, setDistinctline] = useState([]);
  const fetchDistinctline = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_IP_API}${
          import.meta.env.VITE_smt_data_reflow_smic_set_log
        }/distinctline_no`
      );
      const distinctline = response.data;
      setDistinctline(distinctline);
    } catch (error) {
      console.error(`Error fetching distinct factories: ${error}`);
    }
  };
  const handlelineChange = (event, newValue) => {
    if (newValue === null) {
      console.log(newValue);
      setSelectedline(newValue);
      setSelectedMachine(newValue);

      // location.reload(true);
    } else {
      console.log(newValue);
      setSelectedline(newValue);
      setSelectedMachine({ machine: "-" });
      // location.reload(true);
    }
  };

  const [selectedMachine, setSelectedMachine] = useState(null);
  const [distinctMachine, setDistinctMachine] = useState([]);
  const fetchDistinctMachine = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_IP_API}${
          import.meta.env.VITE_smt_data_reflow_smic_set_log
        }/distinctmachine?machine=${selectedline.line_no}`
      );
      const distinctMachine = response.data;
      setDistinctMachine(distinctMachine);
    } catch (error) {
      console.error(`Error fetching distinct factories: ${error}`);
    }
  };
  const handleMachineChange = (event, newValue) => {
    console.log(newValue);
    setSelectedMachine(newValue);
    // location.reload(true);
  };

  useEffect(() => {
    fetchDistinctline();
    // fetchDistinctMachine();
  }, []);

  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (selectedline) {
      fetchDistinctMachine();
    }
  }, [selectedline]);

  useEffect(() => {
    if (selectedline && selectedMachine && selectedline !== null) {
      fetchDataapi();
    }
  }, [selectedline, selectedMachine]);
  const [isLoading, setisLoading] = useState(false);

  const fetchDataapi = async () => {
    setisLoading(true);
    setData([]);

    console.log(`test`);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_IP_API}${
          import.meta.env.VITE_smt_data_reflow_smic_set_log
        }/page2/tab2/table?line=${selectedline.line_no}&machine=${
          selectedMachine.machine
        }`
      );
      const dataapi = response.data;
      console.log(dataapi);
      setData(dataapi);
      console.log(dataapi);
      const categories = dataapi.map((item) => {
        let date = formatdatewithtimeforplotly(item.update_datetime);
        return date;
      });
      setCategories(categories); // ตั้งค่า categories ที่นี่
    } catch (error) {
      console.error(`Error fetching distinct lines: ${error}`);
    } finally {
      setisLoading(false);
    }
  };

  const columns = [
    {
      field: "verify",
      headerName: "Verify",
      width: 70,
      renderCell: (params) => {
        let bgColor = "";
        let borderRadius = "4px"; // You can adjust the radius as needed
        let cellValue = params.value; // Store the original value
        let color = "";

        if (params.value === 1) {
          bgColor = "#C0392B"; // Red with full opacity
          cellValue = "Lock"; // Replace 0 with "Match"
          color = "#FDFEFE";
        } else if (params.value === 0) {
          bgColor = "#0BDA51"; // Green with full opacity
          cellValue = "Match"; // Replace 0 with "Match"
          color = "#34495E";
        } else {
          // No bgcolor for other cases
          bgColor = "transparent"; // No bgcolor for other values
          borderRadius = "0"; // No border radius for other values
          color = "#34495E";
        }

        const cellStyle = {
          backgroundColor: bgColor,
          borderRadius: borderRadius,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70%",
          width: "100%",
          color: color,
          fontWeight: "bold",
        };

        return <div style={cellStyle}>{cellValue}</div>;
      },
    },
    { field: "update_by", headerName: "Update By", width: 100 },
    // { field: "line", headerName: "Line", width: 100 },
    // { field: "machine", headerName: "Machine", width: 120 },
    {
      field: "program",
      headerName: "Program",
      width: 220,
      renderCell: (params) => {
        return (
          <div
            style={{
              color: "#34495E",
              fontWeight: "bold",
            }}
          >
            {params.value}
          </div>
        );
      },
    },
    { field: "conveyor_speed", headerName: "Con(m/min)", width: 120 },
    { field: "o2_setting", headerName: "O2 ppm", width: 100 },
    { field: "interval_time", headerName: "Time int", width: 100 },

    {
      field: "upper_heater_zone1",
      headerName: "UP Z 1",
      width: 80,
    },
    {
      field: "lower_heater_zone1",
      headerName: "LOW Z 1",
      width: 80,
    },
    {
      field: "upper_heater_zone2",
      headerName: "UP Z 2",
      width: 80,
    },
    {
      field: "lower_heater_zone2",
      headerName: "LOW Z 2",
      width: 80,
    },
    {
      field: "upper_heater_zone3",
      headerName: "UP Z 3",
      width: 80,
    },
    {
      field: "lower_heater_zone3",
      headerName: "LOW Z 3",
      width: 80,
    },
    {
      field: "upper_heater_zone4",
      headerName: "UP Z 4",
      width: 80,
    },
    {
      field: "lower_heater_zone4",
      headerName: "LOW Z 4",
      width: 80,
    },
    {
      field: "upper_heater_zone5",
      headerName: "UP Z 5",
      width: 80,
    },
    {
      field: "lower_heater_zone5",
      headerName: "LOW Z 5",
      width: 80,
    },
    {
      field: "upper_heater_zone6",
      headerName: "UP Z 6",
      width: 80,
    },
    {
      field: "lower_heater_zone6",
      headerName: "LOW Z 6",
      width: 80,
    },
    {
      field: "upper_heater_zone7",
      headerName: "UP Z 7",
      width: 80,
    },
    {
      field: "lower_heater_zone7",
      headerName: "LOW Z 7",
      width: 80,
    },

    // { field: "process", headerName: "Process", width: 150 },
    {
      field: "upper_heater_zone8",
      headerName: "UP Z 8",
      width: 80,
    },
    {
      field: "lower_heater_zone8",
      headerName: "LOW Z 8",
      width: 80,
    },
    {
      field: "upper_heater_zone9",
      headerName: "UP Z 9",
      width: 80,
    },
    {
      field: "lower_heater_zone9",
      headerName: "LOW Z 9",
      width: 80,
    },
    {
      field: "upper_heater_zone10",
      headerName: "UP Z 10",
      width: 80,
    },
    {
      field: "lower_heater_zone10",
      headerName: "LOW Z 10",
      width: 80,
    },
    {
      field: "create_time",
      headerName: "Create Time",
      width: 200,
      renderCell: (params) => (
        <Typography variant="h7">
          {formatdatewithtimeforplotly(params.row.update_datetime)}
        </Typography>
      ),
    },
    {
      field: "update_datetime",
      headerName: "Update Time",
      width: 200,
      renderCell: (params) => (
        <Typography variant="h7">
          {formatdatewithtimeforplotly(params.row.update_datetime)}
        </Typography>
      ),
    },
  ];

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Grid container spacing={2}>
          <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
            <Item>
              <Autocomplete
                options={distinctline}
                getOptionLabel={(option) => option && option.line_no}
                value={selectedline}
                onChange={handlelineChange}
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="เลือก line"
                    variant="outlined"
                  />
                )}
              />
            </Item>
          </Grid>
          <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
            <Item>
              <Autocomplete
                options={distinctMachine}
                getOptionLabel={(option) => option && option.machine}
                value={selectedMachine}
                onChange={handleMachineChange}
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="เลือก Machine"
                    variant="outlined"
                  />
                )}
              />
            </Item>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            <div style={{ display: "flex", justifyContent: "right" }}>
              <Chip
                variant="outlined"
                color="primary"
                label={categories[categories.length - 1]}
              />
            </div>
          </Grid>
          {data.length > 0 ? (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Item>
                <DataGrid
                  rows={data}
                  columns={columns}
                  pagination
                  // getRowHeight={() => "auto"}
                  pageSize={5}
                  sx={{
                    height: "750px",
                    maxWidth: "100%",
                    "& .MuiDataGrid-cell": {
                      borderRight: "1px solid #e0e0e0",
                      // borderTop: "1px solid #e0e0e0",
                    },
                    "& .MuiDataGrid-columnHeaderTitle": {
                      fontWeight: "bold",
                      color: "#3371ff",
                      fontSize: "15px",
                      textAlign: "center",
                      fontFace: "Poppins",
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
              </Item>
            </Grid>
          ) : (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <>{isLoading ? <LoadingPage /> : <Item>No Data</Item>}</>
            </Grid>
          )}
        </Grid>
      </ThemeProvider>
    </React.Fragment>
  );
}
