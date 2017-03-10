import React from 'react';
import {Link, hashHistory} from 'react-router';

class NavBar extends React.Component {
	render() {
		const current = hashHistory.getCurrentLocation().pathname;
		const links = this.props.links || [];

		const items = links.map(({text, path}, i) => {
			path = path || "/";
			const activeClass = (path === current) ? "active" : ""
			return (
				<li className="nav-bar-li" key={`nav-bar-link-${i}-${path}`}>
					<Link 
						to={path}
						className={`nav-bar-link ${activeClass}`} >
						{text}
					</Link>
					<img className="arrow-right" src={"arrow-right.svg"} />
				</li>
			);
		})


		return(
			<ul className="nav-bar">
				{items}
			</ul>
		);
	}
}

export default NavBar;