import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Temp_Humid from "./Tab/TempandHumid/smt_print_lock_data";
import Print_set from "./Tab/Setting/Print_set";
import AlarmTab from "./Tab/Alarm/Alarm";

function Print_Page(props) {
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

Print_Page.propTypes = {
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
    // <Box sx={{ width: "100%" }}>
    //   <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
    <>
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
              backgroundColor: "#F5B7B1",
            },
            "&.Mui-selected": {
              color: "#EBF5FB",
              backgroundColor: "#DE3163",
            },
            "&.Mui-focusVisible": {
              backgroundColor: "#FDFEFE",
              color: "primary.contrastText",
            },
          },
        }}
      >
        <Tab label="SETTING" {...a11yProps(0)} />
        <Tab label="TEMP&HUMID" {...a11yProps(1)} />
        <Tab label="ALARM" {...a11yProps(2)} />
      </Tabs>
      {/* // </Box> */}
      <Print_Page value={value} index={0}>
        <Print_set />
      </Print_Page>
      <Print_Page value={value} index={1}>
        <Temp_Humid />
      </Print_Page>
      <Print_Page value={value} index={2}>
        <AlarmTab />
      </Print_Page>
    </>
    // </Box>
  );
}
