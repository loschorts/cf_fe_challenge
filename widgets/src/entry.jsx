import React from 'react';
import ReactDOM from 'react-dom';

import LoginForm from './components/login_form';
import NavBar from './components/nav_bar';
import DNSTable from './components/dns_table';

import {Router, Route, IndexRoute, hashHistory, Redirect} from 'react-router'

import {Promise} from 'es6-promise';
if (!window.Promise) window.Promise = Promise;

const NotFound = ({params: {missing}}) => (<div>No route matches '{missing}'</div>);

const links = [
	{text: "DNS Records", path: "/dns"},
	{text: "Something Else", path: "/a"},
	{text: "Another Link", path: "/b"},
	{text: "Yet Another Link", path: "/c"},
	{text: "A Link", path: "/d"},
	{text: "Linky Link", path: "/e"},
	{text: "A Link", path: "/f"},
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
		<Redirect from="/" to="/dns" />
		<Route path="/" component={Root}>
			<Route path="dns" component={DNSTable}/>
			<Route path=":missing" component={NotFound}/>
			<IndexRoute component={DNSTable}/>
		</Route>
	</Router>
)


document.addEventListener("DOMContentLoaded", ()=>{
	ReactDOM.render(<AppRouter/>, document.querySelector("#root"))
})

