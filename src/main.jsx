/* global $:true, jQuery:true */
$ = jQuery = require('jquery');
var React = require('react');
var Home = require('./components/homePage.jsx')
var About = require('./components/about/aboutPage.jsx')


var App = React.createClass({
	render: function() {
		var Child;
		
		switch(this.props.route) {
			case 'about': Child = About; break;
			default: Child = Home;
		}
		
		return (
			<div>
				<Child/>
			</div>
		)
	}
});

function render() {
	var route = window.location.hash.substr(1);
	React.render(<App route={route} />, document.getElementById('app'));
}

window.addEventListener('hashchange', render);
render();