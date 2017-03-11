import React from 'react';
import { shallow, mount, render } from 'enzyme';
// import {SyntheticEvent} from 'react';

import LoginForm from '../src/components/login_form';

describe("LoginForm", ()=> {

	LoginForm.prototype.updateErrors = jest.fn((LoginForm.prototype.updateErrors));
	LoginForm.prototype.handleSubmit = jest.fn(LoginForm.prototype.handleSubmit);
	LoginForm.prototype.render = jest.fn(LoginForm.prototype.render);

	const loginForm = <LoginForm/>;
  const wrapper = mount(loginForm);
  const form = wrapper.find('form');
	const fields = form.find('label');
	const email = fields.filterWhere(x => x.text() === "Email");
	const password = fields.filterWhere(x => x.text() === "Password");  	
	const emailInput = email.find('input');
	const passwordInput = password.find('input');

  it('contains email and password fields', () => {
		expect(form.exists()).toBe(true)
		expect(emailInput.exists()).toBe(true)
		expect(passwordInput.exists()).toBe(true)
  });

	it('rejects improperly formatted data', ()=>{
		form.simulate('submit', {preventDefault(){}});
		expect(form.find('.form_errors').exists()).toBe(true);
	})

  it.skip('submits properly formatted data', () => {

  });


	it.skip('shows server-side error messages', ()=>{

	})
})