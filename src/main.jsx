/* eslint strict:0 */
/* global $:true, jQuery:true */
$ = jQuery = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;

var HomePage = require('./components/homePage.jsx');
var AuthorPage = require('./components/authors/authorPage.jsx');
var AuthorDetails = require('./components/authors/authorDetails.jsx');
var AboutPage = require('./components/about/aboutPage.jsx');
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
			<IndexRoute component={HomePage} />
      <Route path="about" component={AboutPage}/>
      <Route path="authors" component={AuthorPage}>
        <Route path=":userId" component={AuthorDetails}/>
      </Route>
      <Route path="*" component={HomePage}/>
    </Route>
  </Router>
), document.getElementById('app'));
