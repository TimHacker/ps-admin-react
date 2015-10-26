/* eslint strict:0 */
/* global $:true, jQuery:true */
$ = jQuery = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;

var Home = require('./components/homePage.jsx');
var Authors = require('./components/authors/authorPage.jsx');
var About = require('./components/about/aboutPage.jsx');
var Header = require('./components/common/header.jsx');

var App = React.createClass({
	render: function() {

		return (
			<div>
				<Header/>
				{this.props.children}
			</div>
		);
	}
});

ReactDOM.render((
  <Router>
    <Route path="/" component={App}>
      <Route path="about" component={About}/>
      <Route path="authors" component={Authors}>
        <Route path="/authors/:userId" component={Authors}/>
      </Route>
      <Route path="*" component={Home}/>
    </Route>
  </Router>
), document.getElementById('app'));
