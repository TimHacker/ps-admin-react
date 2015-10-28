"use strict";

var React = require('react');

var TextInput = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    placeholder: React.PropTypes.string,
    value: React.PropTypes.string,
    error: React.PropTypes.string
  },
  
  render: function() {
    var wrapperClass = 'form-group';

    if (this.props.error && this.props.error.length > 0) {
      wrapperClass += ' has-error';
    }

    return (
      <div className={wrapperClass}>
        <label htmlFor={this.props.name}>
          {this.props.label}
        </label>
        <input
          type="text"
          className="form-control"
          name={this.props.name}
          placeholder={this.props.placeholder}
          ref={this.props.name}
          onChange={this.props.onChange}
          value={this.props.value} />
        <div className="input">{this.props.error}</div>
      </div>
    );
  }

});

module.exports = TextInput;
