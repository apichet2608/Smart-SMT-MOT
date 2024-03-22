import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid } from "@mui/material";
import Table_SPI_Alarm from "./Table_alarm";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import ApexPieChart from "./alarm_piechart";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Alarm_main() {
  const [Table_alarm, setTable_alarm] = useState([]);

  const [distinct_line, setdistinct_line] = useState([]);
  const [line, setline] = useState({ line: "ALL" });

  const [alarm_piechart, setalarm_piechart] = useState([]);

  const [showChart, setShowChart] = useState(false);

  const fetch_line = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_IP_API}${
          import.meta.env.VITE_SPI_ALARM_smt_spi_alarm
        }/distinct_line`
      );

      const jsonData = response.data;
      console.log("Line : ", jsonData);
      setdistinct_line(jsonData);
    } catch (error) {
      // console.error("Error fetching data:", error);
    }
  };

  const fetch_Table_alarm = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_IP_API}${
          import.meta.env.VITE_SPI_ALARM_smt_spi_alarm
        }/Table_spi_alarm`,
        {
          params: {
            line: line.line,
          },
        }
      );

      const jsonData = response.data;
      console.log("Table alarm : ", jsonData);
      setTable_alarm(jsonData);
    } catch (error) {
      // console.error("Error fetching data:", error);
    }
  };

  const fetch_alarm_piechart = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_IP_API}${
          import.meta.env.VITE_SPI_ALARM_smt_spi_alarm
        }/alarm_piechart`,
        {
          params: {
            line: line.line,
          },
        }
      );

      const jsonData = response.data;
      console.log("Alarm Piechart : ", jsonData);
      setalarm_piechart(jsonData);
    } catch (error) {
      // console.error("Error fetching data:", error);
    }
  };

  const handleLineChange = (event, newvalue) => {
    if (newvalue === null) {
      setline({ line: "ALL" });
    } else {
      setline(newvalue);
    }
  };

  useEffect(() => {
    fetch_line();
    fetch_Table_alarm();
    fetch_alarm_piechart();
  }, [line]);

  return (
    <div>
      <Grid container spacing={1}>
        {/* Autocomplete for line selection */}
        <Grid item xs={4} sm={4} md={4} lg={2} xl={2}>
          <Item sx={{ borderRadius: 3 }}>
            <Autocomplete
              size="small"
              options={distinct_line}
              getOptionLabel={(option) =>
                option && option.line ? option.line : ""
              }
              value={line}
              onChange={handleLineChange}
              sx={{ width: "100%", display: "inline-block" }}
              renderInput={(params) => <TextField {...params} label="Line" />}
            />
          </Item>
        </Grid>
        {line.line !== "ALL" && (
          <Button
            variant="contained"
            onClick={() => setShowChart(!showChart)}
            sx={{
              ml: 2,
              height: 40,
              display: "inline-block",
              alignSelf: "center",
              mt: 1,
              borderRadius: 2,
              fontWeight: "bold",
              backgroundColor: "#3f51b5",
              color: "white",
            }}
          >
            {showChart ? "Hide Pie Chart" : "Show Pie Chart"}
          </Button>
        )}
      </Grid>

      {showChart && (
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} mt={2}>
          <Item
            sx={{
              borderRadius: 3,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <ApexPieChart
              series={alarm_piechart.map((alarm) =>
                parseInt(alarm.count_total)
              )}
              labels={alarm_piechart.map((alarm) => alarm.alarms_name)}
            />
          </Item>
        </Grid>
      )}

      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} mt={2}>
        <Item sx={{ borderRadius: 3 }}>
          <Table_SPI_Alarm data_alarm={Table_alarm} />
        </Item>
      </Grid>
    </div>
  );
}

export default Alarm_main;
