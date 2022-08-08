import React from "react";
import ReactDOM from "react-dom";
//import { createRoot } from "react-dom/client";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
//import AppWithReducers from "./AppWithReducers";
import { store } from "./state/store";
import { Provider } from "react-redux";
import AppWithRedux from "./AppWithRedux";

ReactDOM.render(
  <Provider store={store}>
    <AppWithRedux />
  </Provider>,
  document.getElementById("root")
);

// const container = document.getElementById("root");
// const root = createRoot(container);
// root.render(
//   <Provider store={store}>
//     <AppWithRedux />
//   </Provider>
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
