"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var createBrowserHistory = require('history/lib/createBrowserHistory');
var history = createBrowserHistory();
var routes = require('./routes.jsx');
var InitializeActions = require('./actions/initializeActions');

InitializeActions.initApp();

ReactDOM.render((
  <Router history={history}>
    {routes}
  </Router>
), document.getElementById('app'));
