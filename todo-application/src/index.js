import React from "react";
import ReactDOM from "react-dom";


import { Provider } from "react-redux"; // (3)
import "./index.css";
import App from "./App";
// reducer defined inside counterStore

import { store } from "./Redux/store";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
