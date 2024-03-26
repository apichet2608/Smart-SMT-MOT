import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SettingPage from "./Tab/Setting/Setting";
import PickupRatePage from "./Tab/PickupRate/PickupRate";
import AlarmPage from "./Tab/Alarm/Alarm";
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
              backgroundColor: "#B0C4DE",
            },
            "&.Mui-selected": {
              color: "#EBF5FB",
              backgroundColor: "#4682B4",
            },
            "&.Mui-focusVisible": {
              backgroundColor: "#FDFEFE",
              color: "primary.contrastText",
            },
          },
        }}
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
        <>
          <PickupRatePage />
        </>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <>
          <AlarmPage />
        </>
      </CustomTabPanel>
    </>
  );
}
