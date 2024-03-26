import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CleaningCondition from "./Tab/CleaningCondition";
import PrintCondition from "./Tab/PrintCondition";
import PrintPosition from "./Tab/PrintPosition";

function Print_set(props) {
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

Print_set.propTypes = {
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
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            ".MuiTabs-indicator": {
              backgroundColor: "#45B39D",
              height: "5px",
            },
            ".MuiTab-root": {
              textTransform: "none",
              fontWeight: 600,
              borderRadius: "3px",
              fontSize: "1rem",
              marginRight: 0.2,
              marginLeft: 0.6,
              "&:hover": {
                backgroundColor: "#E8F6F3",
              },
              "&.Mui-selected": {
                color: "#0E6655",
                backgroundColor: "#9FE2BF",
              },
              "&.Mui-focusVisible": {
                backgroundColor: "#FDFEFE",
                color: "primary.contrastText",
              },
            },
          }}
        >
          <Tab label="CLEANING CONDITION" {...a11yProps(0)} />
          <Tab label="PRINT CONDITION" {...a11yProps(1)} />
          <Tab label="PRINT POSITION" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <Print_set value={value} index={0}>
        <CleaningCondition />
      </Print_set>
      <Print_set value={value} index={1}>
        <PrintCondition />
      </Print_set>
      <Print_set value={value} index={2}>
        <PrintPosition />
      </Print_set>
    </Box>
  );
}
