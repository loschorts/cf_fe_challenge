import React from 'react';
import ReactDOM from 'react-dom';

import LoginForm from './components/login_form';
import NavBar from './components/nav_bar'

import {Router, Route, IndexRoute, hashHistory} from 'react-router'

import {Promise} from 'es6-promise';
if (!window.Promise) window.Promise = Promise;

const DNSTable = () => (<div>DNSTABLE</div>);
const NotFound = () => (<div>NotFound</div>);

const links = [
	{text: "DNS Records", path: "/dns"},
	{text: "Something Else"},
	{text: "Another Link"},
	{text: "Yet Another Link"},
	{text: "Here be Dragons"},
	{text: "Linky Link"},
	{text: "A Link"},
]

const Root = ({ children }) => (
	<main className="center widgets">
		<div className="container widgets">
			<section id="left" className="widget">
				<NavBar links={links}/>
			</section>
			<section id="middle" className="widget">
			{children}
			</section>
			<section id="right" className="widget">
				<LoginForm/>
			</section>
		</div>
	</main>
)

const AppRouter = () => (
	<Router history={hashHistory}>
		<Route path="/" component={Root}>
			<IndexRoute component={NotFound}/>
			<Route path="dns" component={DNSTable}/>
		</Route>
	</Router>
)


document.addEventListener("DOMContentLoaded", ()=>{
	hashHistory.push("dns");
	ReactDOM.render(<AppRouter/>, document.querySelector("#root"))
})

