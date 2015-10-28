"use strict";

var React = require('react');
var TextInput = require('../common/textInput.jsx');

var AuthorForm = React.createClass({
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
            wrapperClass="form-group"
            value={this.props.author.firstName}
            onChange={this.props.onChange} />
          <TextInput
            label="Last Name"
            name="lastName"
            placeholder="Bloggs"
            wrapperClass="form-group"
            value={this.props.author.lastName}
            onChange={this.props.onChange} />
          <input
            type="submit"
            value="Save"
            className="btn btn-default" />
        </form>
      </div>
    );
  }

});

module.exports = AuthorForm;
