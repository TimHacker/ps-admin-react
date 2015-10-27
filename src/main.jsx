"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;

var routes = require('./routes.jsx');

ReactDOM.render((
  <Router>
    {routes}
  </Router>
), document.getElementById('app'));
