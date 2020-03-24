import ThemeProvider from "@material-ui/styles/ThemeProvider";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import { Auth } from "./components/authentication";
import * as serviceWorker from "./serviceWorker";
import theme from "./theme";

import App from "./App";


ReactDOM.render(
  <Auth>
    <Router>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Router>
  </Auth>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
