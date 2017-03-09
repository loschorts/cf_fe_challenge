import React from 'react';

class LoginForm extends React.Component {
	constructor() {
		super();
		this.state = {
			email: undefined,
			password: undefined
		}
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	onChange(key){
		return (e)=>{
			this.setState({[key]: e.target.value})
		}
	}
	handleSubmit(e){
		// validate
		// dispatch
		e.preventDefault();
		alert(JSON.stringify(this.state));
	}
	render(){
		const {email, password} = this.state;
		return(
			<form onSubmit={this.handleSubmit} className="center login-form">
				<p>Email</p>
				<input 
					className="text"
					type="text"
					value={email} 
					placeholder="sample@email.com"
					onChange={this.onChange("email")}
					/>
				<p>Password</p>
				<input 
					className="text"
					type="password"
					value={password} 
					placeholder="password"
					onChange={this.onChange("password")}
					/>
				<input
					className="submit button"
					type="submit"
					value="Login" />
			</form>
		);
	}
}

export default LoginForm;