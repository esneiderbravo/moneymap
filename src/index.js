import React from "react";
import { createRoot } from "react-dom/client";
import AppContainer from "./modules/containers/AppContainer";

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<AppContainer />);
