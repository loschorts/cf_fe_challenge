import React from 'react';
import FormErrors from './form_errors';

const emailValidator = /^.+@.+\..+$/;
const invalidEmailMsg = "Email must follow 'test@example.com' format.";

const pwValidator = /^.{6,}$/;
const invalidPwMsg = "Password must be 6 or more characters."

const getNewErrors = () => ({
	email: [],
	password: []
})

class LoginForm extends React.Component {
	constructor() {
		super();
		this.state = {
			email: "",
			password: "",
			errors: {email: [], password: []},
			disabled: true,
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.validate = this.validate.bind(this);
		this.clearErrors = this.clearErrors.bind(this);
		this.updateErrors = this.updateErrors.bind(this);
		this.submit = this.submit.bind(this);
	}
	onChange(key){
		return (e)=>{
			let {email, password} = this.state;
			// disable if form not filled
			this.setState({[key]: e.target.value},
			()=>{
				let {email, password} = this.state;
				const disabled = (email.length === 0 || password.length === 0)
				this.setState({disabled})
			})
		}
	}
	handleSubmit(e){
		e.preventDefault();
		this.clearErrors().then(this.validate).then(this.submit, this.updateErrors);
	}
	clearErrors(){
		const errors = getNewErrors();
		return new Promise(resolve => {
			this.setState({errors}, resolve)
		});
	}
	validate(){
		let {email, password} = this.state;
		const emailIsValid = emailValidator.test(email)
		const pwIsValid = pwValidator.test(password)

		return new Promise((resolve, reject) => {

			if (emailIsValid && pwIsValid) {
				resolve()
			} else {
				const errors = getNewErrors();
				if (!emailIsValid) errors.email.push(invalidEmailMsg)
				if (!pwIsValid) errors.password.push(invalidPwMsg)
				reject(errors);
			}
		})
	}
	submit(){
		// simulates server-side error response
		setTimeout(()=>{
			const resErrorMsg = "Server-side authentication error."
			const errors = getNewErrors();
			errors.email.push(resErrorMsg);
			this.updateErrors(errors);
		}, 500)
	}
	updateErrors(errors){
		// disable the form if errors occur
		const disabled = (errors.email.length > 0 || errors.password.length > 0)
		this.setState({errors, disabled});
	}
	render(){
		const {email, password, errors, disabled} = this.state;
		// setup error decorations
		const disabledClass = disabled ? "disabled" : "enabled";
		const styles = {
			email: errors.email.length > 0 ? "invalid" : "",
			password: errors.password.length > 0 ? "invalid" : ""
		}

		// render the form
		return(
			<form onSubmit={this.handleSubmit} className="center login-form">
				<label>Email
				<input 
					className={`text ${styles.email}`}
					type="text"
					value={email} 
					placeholder="sample@email.com"
					onChange={this.onChange("email")}
					/>
				</label>
				<FormErrors keyName={"login-email"} msgs={errors.email}/>
				<label>Password
				<input 
					className={`text ${styles.password}`}
					type="password"
					value={password} 
					placeholder="password"
					onChange={this.onChange("password")}
					/>
				</label>
				<FormErrors keyName={"login-pw"} msgs={errors.password}/>
				<input
					disabled={disabled}
					className={`submit button ${disabledClass}`}
					type="submit"
					value="Login" />
			</form>
		);
	}
}

export default LoginForm;