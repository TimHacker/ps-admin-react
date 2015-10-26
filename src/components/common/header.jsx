"use strict";

var React = require('react');
var Link = require('react-router').Link;

var Header = React.createClass({
	render: function() {
		return (
			<nav className="navbar navbar-default">
				<div className="container-fluid">
					<a href="/" className="navbar-brand">
						<img className="navbar__site-logo" src="images/pluralsight-logo.png"></img>
					</a>
					<ul className="nav navbar-nav">
						<li><Link to="/">Home</Link></li>
						<li><Link to="/authors">Authors</Link></li>
						<li><Link to="/about">About</Link></li>
					</ul>
				</div>
			</nav>
		);
	}
});

module.exports = Header;
