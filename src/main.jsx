import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { HarvestProvider } from "./components/context/HarvestContext";
import './index.css'

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <HarvestProvider>
      <App />
    </HarvestProvider>
  </React.StrictMode>
);