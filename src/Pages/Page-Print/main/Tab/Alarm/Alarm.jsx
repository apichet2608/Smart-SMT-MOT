import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Autocomplete_Line from "./Components/Autocomplete/Autocomplete";
import Autocomplete_Machine from "./Components/Autocomplete/Autocomplete";
import axios from "axios";
import Loading from "../../../../../Components/common/Loading/loading";
import { distinct_line } from "./API/GET/distinct_line";
import { distinct_machine } from "./API/GET/distinct_machine";
import { Table_Header } from "./API/GET/Table_Header";
import Quantityselect from "./Components/quantityselect/quantityselect";
import TableHeader from "./Components/TableHeader/TableHeader";

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

  const [SelectLine, setSelectLine] = useState({ line_machine: "ALL" });
  const [DistinctLine, setDistinctLine] = useState([]); // ["Line 1", "Line 2", "Line 3"
  const [IsloadDistinctLine, setIsloadDistinctLine] = useState(false); // ["Line 1", "Line 2", "Line 3"

  const [SelectMachine, setSelectMachine] = useState({ machine: "ALL" });
  const [DistinctMachine, setDistinctMachine] = useState([]); // ["Machine 1", "Machine 2", "Machine 3"
  const [IsloadDistinctMachine, setIsloadDistinctMachine] = useState(false); // ["Machine 1", "Machine 2", "Machine 3"

  const [DataTableHeader, setDataTableHeader] = useState([]); // ["Program 1", "Program 2", "Program 3"
  const [IsloadTableHeader, setIsloadTableHeader] = useState(false); // ["Program 1", "Program 2", "Program 3"

  const [quantity, setQuantity] = useState(24);
  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    setQuantity(newQuantity);
  };
  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };
  const handleDecrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleLineChange = (event, newValue) => {
    // newValue = { line_machine: "Line 1" }
    if (newValue === null) {
      newValue = { line_machine: "ALL" };
    }
    setSelectLine(newValue);
    setSelectMachine({ machine: "ALL" });
  };

  const handleMachineChange = (event, newValue) => {
    if (newValue === null) {
      newValue = { machine: "ALL" };
    }
    // newValue = { machine: "Machine 1" }
    setSelectMachine(newValue);
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
    if (SelectLine) {
      featchDistinctMachine();
    }
  }, [SelectLine]);

  const featchDistinctMachine = async () => {
    setIsloadDistinctMachine(true);
    setDistinctMachine([]);
    const params = { line_machine: SelectLine.line_machine };
    try {
      const response = await distinct_machine(params);
      console.log(response);
      const DistinctMachine = response;
      if (DistinctMachine.length === 1) {
        setSelectMachine(DistinctMachine[0]);
      } else {
        setSelectMachine({ machine: "ALL" });
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
    if (
      SelectLine &&
      SelectLine.line_machine !== "" &&
      SelectMachine &&
      SelectMachine.machine !== ""
    ) {
      console.log("SelectLine", SelectLine);
      console.log("SelectMachine", SelectMachine);
      featchTableHeader();
    } else {
      setDataTableHeader([]);
    }
  }, [SelectLine, SelectMachine, quantity]);

  const featchTableHeader = async () => {
    setIsloadTableHeader(true);
    setDataTableHeader([]);
    const params = {
      line_machine: SelectLine.line_machine,
      machine: SelectMachine.machine,
      hours: quantity,
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
                  getOptionLabelProp={(option) => option && option.line_machine}
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
          <Grid item xs={4} sm={4} md={2} lg={2} xl={2}>
            <Paper>
              <Quantityselect
                quantity={quantity}
                handleQuantityChange={handleQuantityChange}
                handleDecrement={handleDecrement}
                handleIncrement={handleIncrement}
              />
            </Paper>
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
        </Grid>
        {/* <h4>Overall Energy Monitoring</h4> */}
        {/* </div> */}
      </ThemeProvider>
    </div>
  );
};

export default Setting;
