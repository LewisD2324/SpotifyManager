import App from "./app/App";
import ReactDOM from "react-dom";
import React from "react";
import { StateProvider } from "./store/spotifystore";

ReactDOM.render(
  <StateProvider>
    <App />
  </StateProvider>,
  document.getElementById("root")
);
