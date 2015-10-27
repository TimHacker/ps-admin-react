"use strict";

var React = require('react');

var AuthorDetails = React.createClass({
  render: function() {
    return (
      <div>
        Yolo!
        {this.props.params.userId}
      </div>
    );
  }
});

module.exports = AuthorDetails;
