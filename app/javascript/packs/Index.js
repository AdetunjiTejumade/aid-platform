import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import App from "../components/App";
import actionCable from "actioncable";
import { BrowserRouter as Router } from "react-router-dom";

const CableApp = {};

CableApp.cable = actionCable.createConsumer("wss://helping-neighbours.herokuapp.com/cable");
document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Router>
      <App cableApp={CableApp} />
    </Router>,

    document.getElementById("root")
  );
});
