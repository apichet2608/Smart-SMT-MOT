import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import RestoreIcon from "@mui/icons-material/Restore";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import LineChartTemp from "./Components/LineChartTemp";
import LineChartHumid from "./Components/LineChartHumid";
import CircularIndeterminate from "./Components/CircleProgress";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Temp_Humid() {
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

  const [isLoading, setisLoading] = useState(false);
  const [valueHr, setValueHr] = useState(24);
  const [DataAPItable, setDataAPItable] = useState([]);
  const [distinctselect_line, setdistinctselect_line] = useState([]);
  const [select_line, setselect_line] = useState({ line: "ALL" });
  const [machine, setMachine] = useState("");

  const fetchdistinct_line = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_IP_API}${
          import.meta.env.VITE_Table_smt_print_lock_data
        }/distinct_line`
      );
      const jsonData = await response.json();
      console.log(jsonData);
      setdistinctselect_line(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchdistinct_line();
  }, []);

  const handleLineChange = (event, newValue) => {
    if (newValue) {
      setselect_line(newValue);
      setMachine(newValue.machine);
    } else {
      setselect_line({ line: "ALL" });
      setMachine("");
      setDataAPItable([]);
    }
  };

  const handleClear = () => {
    setValueHr(24);
  };

  const handleInputChange = (event) => {
    const newValue = event.target.value;

    if (newValue === "" || isNaN(newValue) || newValue <= 0) {
      setValueHr(" ");
    } else {
      setValueHr(newValue);
    }
    const timeoutId = setTimeout(() => {
      fetchDataAPItable();
    }, 1000);
    clearTimeout(timeoutId);
  };

  const handleIncrement = () => {
    setValueHr((prevValueHr) => {
      const newValue = prevValueHr + 1;
      // handleInputChange({ target: { value: newValue } });
      fetchDataAPItable();
      return newValue;
    });
  };

  const handleDecrement = () => {
    setValueHr((prevValueHr) => {
      const newValue = prevValueHr > 1 ? prevValueHr - 1 : 1;
      // handleInputChange({ target: { value: newValue } });
      fetchDataAPItable();
      return newValue;
    });
  };

  const fetchDataAPItable = async () => {
    setisLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_IP_API}${
          import.meta.env.VITE_Table_smt_print_lock_data
        }/Chart?select_line=${select_line.line}&hour=${valueHr}`
      );
      const jsonData = await response.json();
      const formattedData = jsonData.map((item) => ({
        ...item,
        create_at: formatCreateDate(item.create_at),
      }));

      console.log("formattedData");
      setDataAPItable(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    if (select_line.line !== "ALL") {
      fetchDataAPItable();
      fetchdistinct_line();
    }
  }, [select_line, machine, valueHr]);

  const formatCreateDate = (createDate) => {
    if (createDate !== null) {
      const date = new Date(createDate);
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, "0");
      const day = String(date.getUTCDate()).padStart(2, "0");
      const hours = String(date.getUTCHours()).padStart(2, "0");
      const minutes = String(date.getUTCMinutes()).padStart(2, "0");

      return `${year}-${month}-${day} ${hours}:${minutes}`;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {/* <Main open={open}> */}
      {/* <Main open={open}> */}
      {/* <CssBaseline /> */}
      {/* <Container className="custom-container"> */}

      <Grid container spacing={2}>
        {/* ########################################################### Auto Complete #################################################################### */}
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
          <Item>
            <Autocomplete
              size="small"
              options={distinctselect_line}
              getOptionLabel={(option) => option && option.line}
              value={select_line}
              onChange={handleLineChange}
              sx={{ width: "100%", display: "inline-block" }}
              renderInput={(params) => (
                <TextField {...params} label="Select Line" variant="outlined" />
              )}
            />
          </Item>
        </Grid>
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3} mt={1}>
          <TextField
            size="small"
            id="outlined-read-only-input"
            label="Machine"
            value={machine}
            InputProps={{
              readOnly: true,
              style: {
                cursor: "not-allowed",
                pointerEvents: "none",
                backgroundColor: "#f4f4f4",
              },
            }}
          />
        </Grid>
        {/* ############################################################### HR ########################################################################### */}
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1 },
              display: "flex",
              alignItems: "center",
            }}
            noValidate
            autoComplete="off"
          >
            <IconButton
              aria-label="Decrease"
              onClick={handleDecrement}
              size="small"
              sx={{
                width: "36px",
                height: "36px",
                backgroundColor: "#F1948A",
                color: "#FFF ",
                "&:hover": {
                  backgroundColor: "#CB4335",
                },
              }}
            >
              <RemoveIcon sx={{ fontSize: "20px" }} />
            </IconButton>

            <TextField
              size="small"
              id="outlined-basic"
              label="Hr"
              variant="outlined"
              type="number"
              value={valueHr}
              onChange={handleInputChange}
              sx={{ width: "200px" }}
              inputProps={{
                style: {
                  textAlign: "center",
                },
              }}
            />

            <IconButton
              aria-label="Increase"
              onClick={handleIncrement}
              size="small"
              sx={{
                width: "36px",
                height: "36px",
                backgroundColor: "#82E0AA",
                color: "#FFF",
                "&:hover": {
                  backgroundColor: "#2ECC71",
                },
              }}
            >
              <AddIcon sx={{ fontSize: "20px" }} />
            </IconButton>

            <IconButton
              aria-label="Clear"
              onClick={handleClear}
              size="small"
              sx={{
                width: "36px",
                height: "36px",
                backgroundColor: "#F8C471",
                color: "#FFF",
                "&:hover": {
                  backgroundColor: "#F5B041",
                },
              }}
            >
              <RestoreIcon sx={{ fontSize: "20px" }} />
            </IconButton>
          </Box>
        </Grid>
        {/* ######################################################### LINE CHART ######################################################################### */}
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isLoading ? (
            <CircularIndeterminate />
          ) : DataAPItable && DataAPItable.length > 0 ? (
            <LineChartTemp data={DataAPItable} titles={machine} hr={valueHr} />
          ) : (
            <Typography variant="body1">
              {select_line.line === "ALL" ? (
                <>Please Select Line</>
              ) : (
                <>Data not available</>
              )}
            </Typography>
          )}
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isLoading ? (
            <CircularIndeterminate />
          ) : DataAPItable && DataAPItable.length > 0 ? (
            <LineChartHumid data={DataAPItable} titles={machine} hr={valueHr} />
          ) : (
            <Typography variant="body1">
              {select_line.line === "ALL" ? (
                <>Please Select Line</>
              ) : (
                <>Data not available</>
              )}
            </Typography>
          )}
        </Grid>
      </Grid>

      {/* </Container> */}
      {/* </Main> */}
    </ThemeProvider>
  );
}
