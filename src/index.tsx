import App from "./app/App";
import ReactDOM from "react-dom";
import React from "react";
import { AppProvider } from "./app/state/app.store";

ReactDOM.render(
  <AppProvider>
    <App />
  </AppProvider>,
  document.getElementById("root")
);
