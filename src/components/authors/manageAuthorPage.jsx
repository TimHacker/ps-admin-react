"use strict";

var React = require('react');
var ReactRouter = require('react-router');
var History = ReactRouter.History;

var AuthorForm = require('./authorForm.jsx');
var AuthorApi = require('../../api/authorApi');
var toastr = require('toastr');

var ManageAuthorPage = React.createClass({
  mixins: [ History ],

  getInitialState: function() {
    return {
      author: { id: '', firstName: '', lastName: ''},
      errors: {}
    };
  },

  setAuthorState: function(event) {
    var field = event.target.name;
    var value = event.target.value;
    this.state.author[field] = value;
    return this.setState({author: this.state.author});
  },

  authorFormIsValid: function() {
    var formIsValid = true;
    this.state.errors = {}; // Clear any previous errors

    if (this.state.author.firstName.length < 3) {
      this.state.errors.firstName = 'First name must be at least 3 chars';
      formIsValid = false;
    }

    if (this.state.author.lastName.length < 3) {
      this.state.errors.lastName = 'Last name must be at least 3 chars';
      formIsValid = false;
    }

    this.setState({errors: this.state.errors});
    return formIsValid;
  },

  saveAuthor: function(event) {
    event.preventDefault();

    if (!this.authorFormIsValid()) {
      return;
    }

    AuthorApi.saveAuthor(this.state.author);
    toastr.success('Author name: ' + this.state.author.firstName + ' ' + this.state.author.lastName, 'Successfully added author');
    this.history.pushState(null, '/authors');
  },

  render: function() {
    return (
      <div>
        <AuthorForm
          author={this.state.author}
          onChange={this.setAuthorState}
          onSave={this.saveAuthor}
          errors={this.state.errors} />
      </div>
    );
  }
});

module.exports = ManageAuthorPage;
