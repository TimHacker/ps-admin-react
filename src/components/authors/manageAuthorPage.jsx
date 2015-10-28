"use strict";

var React = require('react');
var ReactRouter = require('react-router');
var History = ReactRouter.History;
var Lifecycle = ReactRouter.Lifecycle;

var AuthorForm = require('./authorForm.jsx');
var AuthorApi = require('../../api/authorApi');
var toastr = require('toastr');

var ManageAuthorPage = React.createClass({
  mixins: [ History, Lifecycle ],

  getInitialState: function() {
    return {
      author: { id: '', firstName: '', lastName: ''},
      errors: {},
      dirty: false
    };
  },

  componentWillMount: function() {
    var authorId = this.props.params.id; //This comes from the path /authors/:id

    if (authorId) {
      this.setState({author: AuthorApi.getAuthorById(authorId)});
    }
  },

  setAuthorState: function(event) {
    this.setState({dirty: true});

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

    this.setState({dirty: false}, function() {
      this.history.pushState(null, '/authors');
    });
  },

  routerWillLeave: function(nextLocation) {
    if (this.state.dirty) {
      return 'Your work is not saved! Are you sure you want to leave?';
    }
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
