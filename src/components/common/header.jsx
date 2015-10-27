"use strict";

var React = require('react');
var Link = require('react-router').Link;
var IndexLink = require('react-router').IndexLink;

var Header = React.createClass({
	render: function() {
		return (
			<nav className="navbar navbar-default">
				<div className="container-fluid">
					<IndexLink to="/" className="navbar-brand">
						<img className="navbar__site-logo" src="images/pluralsight-logo.png"></img>
					</IndexLink>
					<ul className="nav navbar-nav">
						<li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
						<li><Link to="/authors" activeClassName="active">Authors</Link></li>
						<li><Link to="/about" activeClassName="active">About</Link></li>
					</ul>
				</div>
			</nav>
		);
	}
});

module.exports = Header;
