"use strict";

var React = require('react');
var Link = require('react-router').Link;

var NotFoundPage = React.createClass({
  render: function() {
    return (
      <div>
        <h1>404 - Page Not Found</h1>
        <p>Whoops! These aren't the droids you are looking for.</p>
        <p><Link to="/">Back to Home</Link></p>
      </div>
    );
  }
});

module.exports = NotFoundPage;
