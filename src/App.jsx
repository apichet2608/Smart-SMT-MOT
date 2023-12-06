import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageFormat1 from "./Pages/Page-Format/main/page-format.jsx";
import PreBaking from "./Pages/Pre-Baking/main/Pre-Baking.jsx";
import Reflow from "./Pages/Page-Reflow/main/Page-Select-Tab.jsx";
import Print from "./Pages/Page-Print/main/Print-main.jsx";
import Pick_and_Place from "./Pages/Page-Pick_and_Place/main/Page-Pick_and_Place.jsx";
import Navbar from "./Components/common/Navbar/navbar.jsx";
import { useDarkMode } from "./Components/common/DarkModeContext/DarkModeContext.jsx";
import { useLocation } from "react-router-dom";
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

export default function MiniDrawer() {
  const { isDarkMode } = useDarkMode();
  const theme = useTheme();
  const location = useLocation();

  return (
    <div
      style={{
        backgroundColor: isDarkMode ? "#E0E4E5" : "#FFFFFF",
        height: "100%",
        minHeight: "100vh",
      }}
      // className="h-screen"
    >
      <>
        <Box
          sx={{
            display: "fixed",
            // bgcolor: isDarkMode ? theme.palette.background.default : "green",
          }}
        >
          <Navbar isDarkMode={isDarkMode} />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <div className="container mx-auto">
              <DrawerHeader />
              <Routes>
                <Route
                  path="/"
                  element={<PageFormat1 isDarkMode={isDarkMode} />}
                />
                <Route
                  path="/pre-baking"
                  element={<PreBaking isDarkMode={isDarkMode} />}
                />
                <Route
                  path="/reflow"
                  element={<Reflow isDarkMode={isDarkMode} />}
                />
                <Route
                  path="/print"
                  element={<Print isDarkMode={isDarkMode} />}
                />
                <Route
                  path="/pickandplace"
                  element={<Pick_and_Place isDarkMode={isDarkMode} />}
                />
              </Routes>
            </div>
          </Box>
        </Box>
      </>
    </div>
  );
}
