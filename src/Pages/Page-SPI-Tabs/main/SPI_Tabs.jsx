import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Spi from "../../Page-SPI/main/SPI";
import Alarm_main from "../ALARM/alarm_main";

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

export default function SPI_Tabs() {
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
          <Tab label="SPI" {...a11yProps(0)} />
          <Tab label="ALARM" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Spi />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Alarm_main />
      </CustomTabPanel>
    </Box>
  );
}
