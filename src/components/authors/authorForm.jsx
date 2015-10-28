"use strict";

var React = require('react');
var TextInput = require('../common/textInput.jsx');

var AuthorForm = React.createClass({
  propTypes: {
    author: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onSave: React.PropTypes.func.isRequired,
    errors: React.PropTypes.object
  },
  render: function() {
    return (
      <div>
        <h1>
          Manage Author
        </h1>
        <form>
          <TextInput
            label="First Name"
            name="firstName"
            placeholder="Joe"
            value={this.props.author.firstName}
            onChange={this.props.onChange}
            error={this.props.errors.firstName} />
          <TextInput
            label="Last Name"
            name="lastName"
            placeholder="Bloggs"
            value={this.props.author.lastName}
            onChange={this.props.onChange}
            error={this.props.errors.lastName} />
          <input
            type="submit"
            value="Save"
            onClick={this.props.onSave}
            className="btn btn-default" />
        </form>
      </div>
    );
  }

});

module.exports = AuthorForm;
