import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { DarkModeProvider } from "./Components/common/DarkModeContext/DarkModeContext.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

ReactDOM.createRoot(document.getElementById("root")).render(
  <DarkModeProvider>
    <React.StrictMode>
      <Router>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </Router>
    </React.StrictMode>
  </DarkModeProvider>
);
