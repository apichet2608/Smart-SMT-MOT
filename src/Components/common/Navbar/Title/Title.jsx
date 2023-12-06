import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { NavLink, useLocation } from "react-router-dom";

export default function Title() {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    const getPageTitle = () => {
      switch (location.pathname) {
        case "/pre-baking":
          return "Pre-Bakign";
        case "/reflow":
          return "Reflow";
        case "/print":
          return "Print";
        default:
          return "SMT-MOT";
      }
    };
    const title = getPageTitle();
    setPageTitle(title);
  }, [location.pathname]);

  return (
    <>
      <Typography variant="h6" noWrap component="div">
        {pageTitle}
      </Typography>
    </>
  );
}
