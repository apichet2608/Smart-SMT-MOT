import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { DarkModeProvider } from "./Components/common/DarkModeContext/DarkModeContext.jsx";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <DarkModeProvider>
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  </DarkModeProvider>
);
