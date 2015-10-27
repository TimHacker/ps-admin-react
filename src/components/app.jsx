/* eslint strict:0 */ //Disable check because we can't run in strict mode due to need for global jQuery variables
$ = jQuery = require('jquery');

var React = require('react');
var Header = require('./common/header.jsx');

var App = React.createClass({
	render: function() {
		return (
			<div >
				<Header/>
        <div className="container-fluid">
          {this.props.children}
        </div>
			</div>
		);
	}
});

module.exports = App;
