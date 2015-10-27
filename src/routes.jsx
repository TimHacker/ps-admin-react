"use strict";

var React = require('react');
var ReactRouter = require('react-router');
var IndexRoute = ReactRouter.IndexRoute;
var Route = ReactRouter.Route;

var App = require('./components/app.jsx');
var HomePage = require('./components/homePage.jsx');
var AuthorPage = require('./components/authors/authorPage.jsx');
var AuthorDetails = require('./components/authors/authorDetails.jsx');
var AboutPage = require('./components/about/aboutPage.jsx');
var NotFoundPage = require('./components/notFoundPage.jsx');

var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="about" component={AboutPage}/>
    <Route path="authors" component={AuthorPage}>
      <Route path=":userId" component={AuthorDetails}/>
    </Route>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);

module.exports = routes;
