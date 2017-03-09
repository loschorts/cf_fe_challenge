import React from 'react';
import ReactDOM from 'react-dom';

const Root = () => (
	<main className="center widgets">
		<div className="container widgets">
			<section id="left" className="flex">
			</section>
			<section id="middle" className="flex">
			</section>
			<section id="right" className="flex">
			</section>
		</div>
	</main>
)


document.addEventListener("DOMContentLoaded", ()=>{
	ReactDOM.render(<Root/>, document.querySelector("#root"))
})

