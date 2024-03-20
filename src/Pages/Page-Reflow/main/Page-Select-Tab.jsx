import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Reflowo2templog from "./Tab/O2_and_Temp(Tamura)/Page2-Reflow-O2-And-Temperature";
import Reflowdemo1 from "./Tab/Setting(Tamura)/Page2-Reflow";
import Reflowdemo2 from "./Tab/Setting(SMIC)/Page2-Reflow smic";
import Reflowdemo3 from "./Tab/O2_and_Temp(SMIC)/Page2-O2-and-Temp(SMIC)";
import ReflowAlarmTamura from "./Tab/Alarm(Tamura)/AlarmTamura";
import ReflowAlarmSMIC from "./Tab/Alarm(SMIC)/AlarmSMIC";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {/* <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}> */}
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
        sx={{
          ".MuiTabs-indicator": {
            backgroundColor: "#FDFEFE",
            height: "5px",
          },
          ".MuiTab-root": {
            textTransform: "none",
            fontWeight: 600,
            borderRadius: "10px",
            fontSize: "1rem",
            marginRight: 0.2,
            marginLeft: 0.6,
            "&:hover": {
              backgroundColor: "#CCCCFF",
            },
            "&.Mui-selected": {
              color: "#EBF5FB",
              backgroundColor: "#6495ED",
            },
            "&.Mui-focusVisible": {
              backgroundColor: "#FDFEFE",
              color: "primary.contrastText",
            },
          },
        }}
      >
        {/* <Tab label="O2 and Temp(Tamura)" {...a11yProps(0)} />
          <Tab label="Setting(Tamura)" {...a11yProps(1)} />
          <Tab label="Setting(SMIC)" {...a11yProps(2)} />
          <Tab label="O2 and Temp(SMIC)" {...a11yProps(3)} /> */}
        c
        <Tab label="Setting(Tamura)" {...a11yProps(0)} />
        <Tab label="O2 and Temp(Tamura)" {...a11yProps(1)} />
        <Tab label="Alarm(Tamura)" {...a11yProps(2)} />
        <Tab label="Setting(SMIC)" {...a11yProps(3)} />
        <Tab label="O2 and Temp(SMIC)" {...a11yProps(4)} />
        <Tab label="Alarm(SMIC)" {...a11yProps(5)} />
      </Tabs>
      {/* </Box> */}
      <CustomTabPanel value={value} index={0}>
        <Reflowdemo1 />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Reflowo2templog />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <ReflowAlarmTamura />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <Reflowdemo2 />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <Reflowdemo3 />
      </CustomTabPanel>

      <CustomTabPanel value={value} index={5}>
        <ReflowAlarmSMIC />
      </CustomTabPanel>
      {/* // </Box> */}
    </>
  );
}
