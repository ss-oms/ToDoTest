import React from "react";
import "./styles/reset.css";
import "./styles/common.css";
import { render } from "react-dom";
import App from "./components/App";
import store from "./redux/store";
import { Provider } from "react-redux";

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
