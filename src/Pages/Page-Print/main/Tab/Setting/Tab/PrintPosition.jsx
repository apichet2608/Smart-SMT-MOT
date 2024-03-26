import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import CleaningTable from "./Components/subTable/CleaningTable";
import Print_conTable from "./Components/subTable/PrintConTable";
import Print_posTable from "./Components/subTable/PrintPosTable";
import Loading_dot from "../../../../../../Components/common/Loading/loading";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function PrintPosition() {
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

  const [DataAPItable, setDataAPItable] = useState([]);

  const [distinct_machine, setdistinct_machine] = useState([]);
  const [select_machine, setselect_machine] = useState({ line_machine: "ALL" });

  const [distinct_program, setdistinct_program] = useState([]);
  const [select_program, setselect_program] = useState({ program_name: "ALL" });

  //loading table
  const [loading, setLoading] = useState(false);

  const fetch_machine = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_IP_API}${
          import.meta.env.VITE_Table_smt_print_program_log_printposition
        }/distinct_machine`
      );
      const jsonData = await response.json();
      console.log(jsonData);
      console.log("machine API");
      setdistinct_machine(jsonData);
    } catch (error) {
      //   console.error("Error fetching data:", error);
    }
  };

  const fetch_program = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_IP_API}${
          import.meta.env.VITE_Table_smt_print_program_log_printposition
        }/distinct_program`,
        {
          params: {
            select_machine: select_machine.line_machine,
          },
        }
      );
      const jsonData = response.data;
      console.log("Program API");
      console.log(jsonData);
      if (Array.isArray(jsonData) && jsonData.length > 0) {
        setdistinct_program(jsonData);
      } else {
        console.log("No data available.");
      }
    } catch (error) {
      //   console.error("Error fetching data:", error);
    }
  };

  const fetchDataTable = async () => {
    setLoading(true);
    try {
      // Create a new URLSearchParams object to construct the query string
      const params = new URLSearchParams();
      params.append("select_machine", select_machine.line_machine);
      params.append("select_program", select_program.program_name);

      const url = `${import.meta.env.VITE_IP_API}${
        import.meta.env.VITE_Table_smt_print_program_log_printposition
      }/print_posTable?${params.toString()}`;
      const response = await fetch(url);
      const jsonData = await response.json();
      console.log("TableData_API");
      console.log(jsonData);

      if (Array.isArray(jsonData) && jsonData.length > 0) {
        setDataAPItable(jsonData);
      } else {
        console.log("No data available.");
      }
    } catch (error) {
      //   console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMachineChange = (event, newvalue) => {
    if (newvalue === null) {
      setselect_machine({ line_machine: "ALL" });
      setselect_program({ program_name: "ALL" });
    } else {
      setselect_machine(newvalue);
      setselect_program({ program_name: "ALL" });
    }
  };

  const handleProgramChange = (event, newvalue) => {
    if (newvalue === null) {
      setselect_program({ program_name: "ALL" });
    } else {
      setselect_program(newvalue);
    }
  };

  useEffect(() => {
    fetch_machine();
    fetch_program();
  }, []);

  useEffect(() => {
    if (select_machine.line_machine !== "ALL") {
      fetch_program();
      fetchDataTable();
    }
  }, [select_machine]);

  useEffect(() => {
    if (
      select_machine &&
      select_machine.line_machine !== "" &&
      select_program &&
      select_program.program_name !== ""
    ) {
      fetchDataTable();
    }
  }, [select_machine, select_program]);

  return (
    <ThemeProvider theme={theme}>
      {/* <Main open={open}> */}
      {/* <Main open={open}> */}
      {/* <CssBaseline /> */}
      {/* <Container className="custom-container"> */}
      <Grid container spacing={2}>
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
          <Item>
            <Autocomplete
              size="small"
              options={distinct_machine}
              getOptionLabel={(option) => option && option.line_machine}
              value={select_machine}
              onChange={handleMachineChange}
              sx={{ width: "100%", display: "inline-block" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Machine"
                  variant="outlined"
                />
              )}
            />
          </Item>
        </Grid>
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
          <Item>
            <Autocomplete
              size="small"
              options={distinct_program}
              getOptionLabel={(option) => option && option.program_name}
              value={select_program}
              onChange={handleProgramChange}
              sx={{ width: "100%", display: "inline-block" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Program"
                  variant="outlined"
                />
              )}
            />
          </Item>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Loading_dot />
            </div>
          ) : DataAPItable && DataAPItable.length > 0 ? (
            <Item>
              <Print_posTable datafromAPIpos={DataAPItable} />
            </Item>
          ) : (
            <Loading_dot />
          )}
        </Grid>
      </Grid>
      {/* </Container> */}
      {/* </Main> */}
    </ThemeProvider>
  );
}
