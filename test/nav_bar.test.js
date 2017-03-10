import React from 'react';
import { shallow, mount, render } from 'enzyme';
import NavBar from '../src/components/nav_bar';
import {Link} from 'react-router';

describe("NavBar", () => {

	const data = [{text: "a", path: "aa"}, {text: "b", path: "bb"}];
	const navBar = shallow(<NavBar links={data}/>);

  it('renders links', () => {
  	const links = navBar.render().find('a')
    expect(links.length).toBe(2)
  });
})