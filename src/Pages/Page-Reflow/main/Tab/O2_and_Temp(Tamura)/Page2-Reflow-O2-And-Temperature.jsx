import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import O2_Conc_Cool1_Zone1_6_8_Chart from "./Components/O2_and_Temp(Tamura)/O2_Conc_Cool1_Zone1_6_8";
import O2_Conc_Zone7_Chart from "./Components/O2_and_Temp(Tamura)/O2_Conc_Zone7";
import TempChart from "./Components/O2_and_Temp(Tamura)/Temp";
import Reflow_TamuraChart from "./Components/O2_and_Temp(Tamura)/Reflow_Tamura";
import Chip from "@mui/material/Chip";
import { formatdatewithtimeforplotly } from "../../../../../utils/formatdatewithtimeforplotly"; // Import formatDate function from utils
import LoadingPage from "../../../../..//Components/common/Loading/loading";
import { ThemeProvider, createTheme } from "@mui/material/styles";

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
  const [quantity, setQuantity] = useState(24);
  const [isLoading, setisLoading] = useState(false);

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

  const [selectedMachine, setSelectedMachine] = useState(null);
  const [distinctMachine, setDistinctMachine] = useState([]);
  const fetchDistinctMachine = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_IP_API}${
          import.meta.env.VITE_smt_reflow_tamura_temp_log
        }/distinctMachine`
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
    fetchDistinctMachine();
  }, []);

  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [dataTamura, setDataTamura] = useState([]);
  const [categoriesTamura, setCategoriesTamura] = useState([]);
  useEffect(() => {
    if (selectedMachine !== null) {
      fetchDataapi();
      fetchTamura();
    } else if (selectedMachine === null) {
      setData([]);
    }
  }, [selectedMachine, quantity]);

  const fetchTamura = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_IP_API}${
          import.meta.env.VITE_smt_reflow_tamura_temp_log
        }/dataplot/Reflow-Tamura?machine_code=${
          selectedMachine.machine_code
        }&hours=${quantity}`
      );
      const dataapi = response.data;
      setDataTamura(dataapi);
      console.log(dataapi);
      const categories = dataapi.map((item) => {
        let date = formatdatewithtimeforplotly(item.create_at);
        return date;
      });
      setCategoriesTamura(categories); // ตั้งค่า categories ที่นี่
    } catch (error) {
      console.error(`Error fetching distinct machines: ${error}`);
    }
  };

  const fetchDataapi = async () => {
    setisLoading(true);
    setData([]);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_IP_API}${
          import.meta.env.VITE_smt_reflow_tamura_temp_log
        }/dataplot?machine_code=${
          selectedMachine.machine_code
        }&hours=${quantity}`
      );
      const dataapi = response.data;
      setData(dataapi);
      console.log(dataapi);
      const categories = dataapi.map((item) => {
        let date = formatdatewithtimeforplotly(item.create_at);
        return date;
      });
      console.log(categories);
      setCategories(categories); // ตั้งค่า categories ที่นี่
    } catch (error) {
      console.error(`Error fetching distinct machines: ${error}`);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Grid container spacing={2}>
          <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
            <Item>
              <Autocomplete
                options={distinctMachine}
                getOptionLabel={(option) => option && option.machine_code}
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
          <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
            <Item>
              <TextField
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                label="Hr"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton onClick={handleDecrement}>
                        <RemoveIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleIncrement}>
                        <AddIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                  inputProps: {
                    style: {
                      textAlign: "center",
                    },
                  },
                }}
                sx={{ width: "100%" }}
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
            <React.Fragment>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} mt={2}>
                <Item>
                  {/* <O2_Conc_Cool1_Zone1_6_8_Chart
                    dataplot={data}
                    categories={categories}
                  /> */}
                  <O2_Conc_Zone7_Chart
                    dataplot={data}
                    categories={categories}
                  />
                </Item>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} mt={2}>
                <Item>
                  {/* <O2_Conc_Zone7_Chart
                    dataplot={data}
                    categories={categories}
                  /> */}
                  <O2_Conc_Cool1_Zone1_6_8_Chart
                    dataplot={data}
                    categories={categories}
                  />
                </Item>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Item>
                  <TempChart dataplot={data} categories={categories} />
                </Item>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "right",
                    // marginBottom: "6",
                  }}
                >
                  <Chip
                    variant="outlined"
                    color="primary"
                    label={categoriesTamura[categoriesTamura.length - 1]}
                  />
                </div>

                <Item>
                  <Reflow_TamuraChart
                    dataplot={dataTamura}
                    categories={categoriesTamura}
                  />
                </Item>
              </Grid>
            </React.Fragment>
          ) : (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <>{isLoading ? <LoadingPage /> : <Item>Choose Data</Item>}</>
            </Grid>
          )}
        </Grid>
      </ThemeProvider>
    </React.Fragment>
  );
}
