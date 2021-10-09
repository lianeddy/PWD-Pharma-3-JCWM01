import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
// Reduc Config
import { Provider } from "react-redux"; // untuk menghungkan antara action, reducer dan component
import { applyMiddleware, createStore } from "redux"; // untuk membuat global store untuk reducer
import { Reducers } from "./redux/reducers";
import ReduxThunk from "redux-thunk";

import DateFnsUtils from "@date-io/date-fns";

const storeReducer = createStore(Reducers, applyMiddleware(ReduxThunk));

ReactDOM.render(
  <Provider store={storeReducer}>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <App />
    </MuiPickersUtilsProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
