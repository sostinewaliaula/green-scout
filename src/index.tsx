import './index.css';
import React from "react";
import { render } from "react-dom";
import { App } from "./App";
import { DarkModeProvider } from "./context/DarkModeContext";

render(
  <DarkModeProvider>
    <App />
  </DarkModeProvider>, 
  document.getElementById("root")
);