import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { createStore } from "redux";
import reducer from "./components/store/reducer";
import { Provider } from "react-redux";
import { createDevTools } from '@redux-devtools/core';

const myStore = createStore(reducer, createDevTools);

ReactDOM.render(
  <Provider store={myStore}>
    <App />
  </Provider>,
  document.getElementById("root")
);
