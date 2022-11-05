//Style import
import "./styles/index.scss";
//React Components import
import React from "react";
import ReactDOM from "react-dom";
//Redux/ DataManagement import
import { Provider } from "react-redux";
import { createStore } from "redux";
import allReducers from "./redux/reducers";
//Own Components import
import App from "./App";

//DATA STORE
const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

//MAIN RENDER
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
