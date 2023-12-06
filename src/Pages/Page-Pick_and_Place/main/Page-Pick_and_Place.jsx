import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SettingPage from "./Tab/Setting/Setting";
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
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label="Setting" {...a11yProps(0)} />
        <Tab label="Pickup Rate" {...a11yProps(1)} />
        <Tab label="Alarm" {...a11yProps(2)} />
      </Tabs>

      <CustomTabPanel value={value} index={0}>
        <>
          <SettingPage />
        </>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <>2</>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <>3</>
      </CustomTabPanel>
    </>
  );
}
