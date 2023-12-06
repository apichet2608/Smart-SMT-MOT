import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Autocomplete_Line from "./Components/Autocomplete/Autocomplete";
import Autocomplete_Machine from "./Components/Autocomplete/Autocomplete";
import Autocomplete_Program from "./Components/Autocomplete/Autocomplete";
import axios from "axios";
import Loading from "../../../../../Components/common/Loading/loading";
import { distinct_line } from "./API/GET/distinct_line";
import { distinct_machine } from "./API/GET/distinct_machine";
import { distinct_program_name } from "./API/GET/distinct_program_name";
import { Table_Header } from "./API/GET/Table_Header";
import { Table_Result } from "./API/GET/Table_Result";
import Divider from "@mui/material/Divider";

import TableHeader from "./Components/TableHeader/TableHeader";
import TableResult from "./Components/TableResult/TableResult";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Setting = () => {
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

  const [SelectLine, setSelectLine] = useState("");
  const [DistinctLine, setDistinctLine] = useState([]); // ["Line 1", "Line 2", "Line 3"
  const [IsloadDistinctLine, setIsloadDistinctLine] = useState(false); // ["Line 1", "Line 2", "Line 3"
  const [SelectMachine, setSelectMachine] = useState({ machine: "" });
  const [DistinctMachine, setDistinctMachine] = useState([]); // ["Machine 1", "Machine 2", "Machine 3"
  const [IsloadDistinctMachine, setIsloadDistinctMachine] = useState(false); // ["Machine 1", "Machine 2", "Machine 3"
  const [SelectProgram, setSelectProgram] = useState({ program_name: "ALL" });
  const [DistinctProgram, setDistinctProgram] = useState([]); // ["Program 1", "Program 2", "Program 3"
  const [IsloadDistinctProgram, setIsloadDistinctProgram] = useState(false); // ["Program 1", "Program 2", "Program 3"
  const [DataTableHeader, setDataTableHeader] = useState([]); // ["Program 1", "Program 2", "Program 3"
  const [IsloadTableHeader, setIsloadTableHeader] = useState(false); // ["Program 1", "Program 2", "Program 3"
  const [DataTableresult, setDataTableresult] = useState([]); // ["Program 1", "Program 2", "Program 3"
  const [IsloadTableresult, setIsloadTableresult] = useState(false); // ["Program 1", "Program 2", "Program 3"

  const handleLineChange = (event, newValue) => {
    // newValue = { line: "Line 1" }
    setSelectLine(newValue);
    setSelectMachine({ machine: "" });
    setSelectProgram({ program_name: "ALL" });
  };

  const handleMachineChange = (event, newValue) => {
    // newValue = { machine: "Machine 1" }
    setSelectMachine(newValue);
    setSelectProgram({ program_name: "ALL" });
  };

  const handleProgramChange = (event, newValue) => {
    // newValue = { program_name: "Program 1" }
    setSelectProgram(newValue);
  };

  useEffect(() => {
    // ทำงานเมื่อเปิดหน้าเว็บครั้งแรก
    featchDistinctLine();
  }, []);

  const featchDistinctLine = async () => {
    setIsloadDistinctLine(true);
    setDistinctLine([]);
    const params = {};
    try {
      const response = await distinct_line(params);
      console.log(response);
      const DistinctLine = response;
      setDistinctLine(DistinctLine);
    } catch (err) {
      console.error(err.message);
    } finally {
      console.log("finally");
      setIsloadDistinctLine(false);
    }
  };

  useEffect(() => {
    setDistinctMachine([]);
    setDistinctProgram([]);
    if (SelectLine) {
      featchDistinctMachine();
    }
  }, [SelectLine]);

  const featchDistinctMachine = async () => {
    setIsloadDistinctMachine(true);
    setDistinctMachine([]);
    const params = { line: SelectLine.line };
    try {
      const response = await distinct_machine(params);
      console.log(response);
      const DistinctMachine = response;
      if (DistinctMachine.length === 1) {
        setSelectMachine(DistinctMachine[0]);
      } else {
        setSelectMachine({ machine: "" });
      }
      setDistinctMachine(DistinctMachine);
    } catch (err) {
      console.error(err.message);
    } finally {
      console.log("finally");
      setIsloadDistinctMachine(false);
    }
  };

  useEffect(() => {
    setDistinctProgram([]);
    if (SelectLine && SelectMachine) {
      featchDistinctProgram();
    }
  }, [SelectLine, SelectMachine]);

  const featchDistinctProgram = async () => {
    setIsloadDistinctProgram(true);
    setDistinctProgram([]);
    const params = { line: SelectLine.line, machine: SelectMachine.machine };
    try {
      const response = await distinct_program_name(params);
      console.log(response);
      const Distinctprogram = response;
      setDistinctProgram(Distinctprogram);
    } catch (err) {
      console.error(err.message);
    } finally {
      console.log("finally");
      setIsloadDistinctProgram(false);
    }
  };

  useEffect(() => {
    if (
      SelectLine &&
      SelectLine.line !== "" &&
      SelectMachine &&
      SelectMachine.machine !== "" &&
      SelectProgram &&
      SelectProgram.program_name !== ""
    ) {
      console.log("SelectLine", SelectLine);
      console.log("SelectMachine", SelectMachine);
      console.log("SelectProgram", SelectProgram);
      featchTableHeader();
      featchTableResult();
    } else {
      setDataTableHeader([]);
      setDataTableresult([]);
    }
  }, [SelectLine, SelectMachine, SelectProgram]);

  const featchTableHeader = async () => {
    setIsloadTableHeader(true);
    setDataTableHeader([]);
    const params = {
      line: SelectLine.line,
      machine: SelectMachine.machine,
      program_name: SelectProgram.program_name,
    };
    try {
      const response = await Table_Header(params);
      console.log(response);
      const DataHeader = response;
      setDataTableHeader(DataHeader);
    } catch (err) {
      console.error(err.message);
    } finally {
      console.log("finally");
      setIsloadTableHeader(false);
    }
  };

  const featchTableResult = async () => {
    setIsloadTableresult(true);
    setDataTableresult([]);
    const params = {
      line: SelectLine.line,
      machine: SelectMachine.machine,
      program_name: SelectProgram.program_name,
    };
    try {
      const response = await Table_Result(params);
      console.log(response);
      const DataResult = response;
      setDataTableresult(DataResult);
    } catch (err) {
      console.error(err.message);
    } finally {
      console.log("finally");
      setIsloadTableresult(false);
    }
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        {/* <div className="container mx-auto"> */}
        {/* <h1>Welcome to Real Time Parametor Dashboard</h1> */}
        <Grid container spacing={2}>
          <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
            {IsloadDistinctLine ? (
              <Loading />
            ) : (
              <Paper>
                <Autocomplete_Line
                  labelProp={"Line"}
                  options={DistinctLine}
                  selectedValue={SelectLine}
                  getOptionLabelProp={(option) => option && option.line}
                  onValueChange={handleLineChange}
                />
              </Paper>
            )}
          </Grid>

          <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
            {IsloadDistinctMachine ? (
              <Loading />
            ) : (
              <Paper>
                <Autocomplete_Machine
                  labelProp={"Machine"}
                  options={DistinctMachine}
                  selectedValue={SelectMachine}
                  getOptionLabelProp={(option) => option && option.machine}
                  onValueChange={handleMachineChange}
                />
              </Paper>
            )}
          </Grid>
          <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
            {IsloadDistinctProgram ? (
              <Loading />
            ) : (
              <Paper>
                <Autocomplete_Program
                  labelProp={"Program"}
                  options={DistinctProgram}
                  selectedValue={SelectProgram}
                  getOptionLabelProp={(option) => option && option.program_name}
                  onValueChange={handleProgramChange}
                />
              </Paper>
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            {DataTableHeader && DataTableHeader.length > 0 ? (
              <>
                {IsloadTableHeader ? (
                  <>
                    <Loading />
                  </>
                ) : (
                  <>
                    <TableHeader Datas={DataTableHeader} />
                  </>
                )}
              </>
            ) : (
              <>No Data Header</>
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Divider />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            {DataTableresult && DataTableresult.length > 0 ? (
              <>
                {IsloadTableresult ? (
                  <>
                    <Loading />
                  </>
                ) : (
                  <>
                    <TableResult Datas={DataTableresult} />
                  </>
                )}
              </>
            ) : (
              <>No Data Result</>
            )}
          </Grid>
        </Grid>
        {/* <h4>Overall Energy Monitoring</h4> */}
        {/* </div> */}
      </ThemeProvider>
    </div>
  );
};

export default Setting;
