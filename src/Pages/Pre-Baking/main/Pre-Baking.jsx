import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import LoadingPage from "../../../Components/common/Loading/loading.jsx";
import axios from "axios";
import { formatdatewithtimeforplotly } from "../../../utils/formatdatewithtimeforplotly.js";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Autocomplete from "@mui/material/Autocomplete";
import Tempereture from "../Components/Tempereture";
import Humidity from "../Components/Humidity";
import Chip from "@mui/material/Chip";
import Datagrid from "../Components/Datagrid.jsx";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const PreBaking = () => {
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

  const [selectedMccode, setSelectedMccode] = useState("");
  const [distinctMccode, setDistinctMccode] = useState([]);

  const fetchDistinctMccode = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_IP_API}${
          import.meta.env.VITE_smt_binder_oven_data
        }/distinctMccode`
      );
      const distinctMccode = response.data;
      setDistinctMccode(distinctMccode);
    } catch (error) {
      console.error(`Error fetching distinct factories: ${error}`);
    }
  };

  const handleMccodeChange = (event, newValue) => {
    console.log(newValue);
    setSelectedMccode(newValue);
  };

  useEffect(() => {
    fetchDistinctMccode();
  }, []);

  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (selectedMccode !== null) {
      fetchDataapi();
    } else if (selectedMccode === null) {
      setData([]);
    }
  }, [selectedMccode, quantity]);

  const fetchDataapi = async () => {
    setisLoading(true);
    setData([]);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_IP_API}${
          import.meta.env.VITE_smt_binder_oven_data
        }/dataplot?mc_code=${selectedMccode.mc_code}&hours=${quantity}`
      );
      const dataapi = response.data;
      if (dataapi.length > 0) {
        console.log("Have Data");
        setData(dataapi);
        // setisLoading(false);
      } else {
        console.log("No Data");
        setData([]);
        // setisLoading(false);
      }
      console.log(dataapi);
      const categories = dataapi.map((item) => {
        let date = formatdatewithtimeforplotly(item.create_at);
        return date;
      });
      setCategories(categories); // ตั้งค่า categories ที่นี่
    } catch (error) {
      console.error(`Error fetching distinct Mccodes: ${error}`);
      setData([]);
    } finally {
      setisLoading(false);
    }
  };

  //! Datagrid
  const [rows, setRows] = useState([]);
  const columns = [
    // {
    //   field: "id",
    //   headerName: "ID",
    //   width: 100,
    //   headerAlign: "center",
    //   align: "center",
    // },
    {
      field: "create_at",
      headerName: "Create At",
      width: 200,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return <div>{formatdatewithtimeforplotly(params.value)}</div>;
      },
    },
    {
      field: "mc_code",
      headerName: "MC Code",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "temp_pv",
      headerName: "Temperature PV",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "humid_pv",
      headerName: "Humidity PV",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "alarm_temp_desc",
      headerName: "Temperature Alarm Desc",
      width: 400,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div
            className={`${
              params.value === "Normal" ? "text-success" : "text-error"
            }`}
          >
            {params.value}
          </div>
        );
      },
    },
    {
      field: "alarm_humid_desc",
      headerName: "Humidity Alarm Desc",
      width: 400,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div
            className={`${
              params.value === "Normal" ? "text-success" : "text-error"
            }`}
          >
            {params.value}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_IP_API}${
          import.meta.env.VITE_smt_binder_oven_data
        }/dataTable?hours=${quantity}&mc_code=${selectedMccode.mc_code}`
      )
      .then((response) => {
        console.log(response.data);
        setRows(response.data);
      })
      .catch((error) => {
        console.error(`Error fetching distinct Mccodes: ${error}`);
      });
  }, [selectedMccode, quantity]);

  return (
    <div>
      <ThemeProvider theme={theme}>
        {/* <div className="container mx-auto"> */}
        {/* <h1>Welcome to Real Time Parametor Dashboard</h1> */}
        <Grid container spacing={2}>
          <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
            <Item>
              <Autocomplete
                options={distinctMccode}
                getOptionLabel={(option) => option && option.mc_code}
                value={selectedMccode}
                onChange={handleMccodeChange}
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="เลือก Mccode"
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
          {data && data.length > 0 ? (
            <>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Item>
                  <Tempereture dataplot={data} categories={categories} />
                </Item>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Item>
                  <Humidity dataplot={data} categories={categories} />
                </Item>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Item>
                  <Datagrid rows={rows} columns={columns} />
                </Item>
              </Grid>
            </>
          ) : (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <>{isLoading ? <LoadingPage /> : <Item>No Data</Item>}</>
            </Grid>
          )}
        </Grid>
        {/* <h4>Overall Energy Monitoring</h4> */}
        {/* </div> */}
      </ThemeProvider>
    </div>
  );
};

export default PreBaking;
