import React from 'react';
import ReactDOM from 'react-dom';

import LoginForm from './components/login_form'

const Root = () => (
	<main className="center widgets">
		<div className="container widgets">
			<section id="left" className="widget">
			</section>
			<section id="middle" className="widget">
			</section>
			<section id="right" className="widget">
				<LoginForm/>
			</section>
		</div>
	</main>
)


document.addEventListener("DOMContentLoaded", ()=>{
	ReactDOM.render(<Root/>, document.querySelector("#root"))
})

