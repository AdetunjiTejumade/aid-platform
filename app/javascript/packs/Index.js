import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import App from '../components/App'
import actionCable from "actioncable"

const CableApp = {}

CableApp.cable = actionCable.createConsumer('ws:://localhost:3000/cable')
document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App CableApp={CableApp} />,
    document.getElementById("root"),
  );
})