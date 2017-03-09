import React from 'react';
import FormErrors from './form_errors';

const emailValidator = /^.+@.+\..+$/;
const invalidEmailMsg = "Email must follow 'test@example.com' format.";

const pwValidator = /^.{6,}$/;
const invalidPwMsg = "Password must be 6 or more characters."

const getEmptyErrors = () => ({
	errors: {email: [], password: []},
	styles: {email: "", password: ""}
})

class LoginForm extends React.Component {
	constructor() {
		super();
		this.state = {
			email: undefined,
			password: undefined,
			errors: {email: [], password: []},
			styles: {
				email: "",
				password: "",
			}
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.validate = this.validate.bind(this);
		this.clearErrors = this.clearErrors.bind(this);
		this.updateErrors = this.updateErrors.bind(this);
		this.submit = this.submit.bind(this);
	}
	onChange(key){
		return (e)=>{
			const value = (e.target.value === "") ? undefined : e.target.value;
			this.setState({[key]: value})
		}
	}
	clearErrors(){
		const emptyErrors = getEmptyErrors();

		return new Promise(resolve => {
			this.setState(emptyErrors, resolve)
		});
	}
	handleSubmit(e){
		e.preventDefault();
		this.clearErrors().then(this.validate).then(this.submit, this.updateErrors);
	}
	updateErrors(newErrorState){
		this.setState(newErrorState);
	}
	submit(){
		// simulates failed API error requests
		setTimeout(()=>{
			const newErrorState = getEmptyErrors();
			newErrorState.errors.email.push("username/password combination not found.");
			newErrorState.styles.email = "invalid";
			this.setState(newErrorState);
		}, 1000)
	}
	validate(){
		const {email, password} = this.state;
		const emailIsValid = emailValidator.test(email)
		const pwIsValid = pwValidator.test(password)

		return new Promise((resolve, reject) => {

			if (emailIsValid && pwIsValid) {
				resolve()
			} else {
				const newErrorState = getEmptyErrors();

				if (!emailIsValid) {
					newErrorState.errors.email.push(invalidEmailMsg);
					newErrorState.styles.email = "invalid";
				}
				if (!pwIsValid) {
					newErrorState.errors.password.push(invalidPwMsg);
					newErrorState.styles.password = "invalid";
				}
				reject(newErrorState);
			}
		})
	}
	render(){
		const {email, password, errors, styles} = this.state;

		// setup error decorations
		const formFilled = (email && password);
		const submitEnabledClass = formFilled ? "enabled" : "disabled";

		// render the form
		return(
			<form onSubmit={this.handleSubmit} className="center login-form">
				<p>Email</p>
				<input 
					className={`text ${styles.email}`}
					type="text"
					value={email} 
					placeholder="sample@email.com"
					onChange={this.onChange("email")}
					/>
				<FormErrors keyName={"login-email"} msgs={errors.email}/>
				<p>Password</p>
				<input 
					className={`text ${styles.password}`}
					type="password"
					value={password} 
					placeholder="password"
					onChange={this.onChange("password")}
					/>
				<FormErrors keyName={"login-pw"} msgs={errors.password}/>
				<input
					className="submit button"
					type="submit"
					value="Login" />
			</form>
		);
	}
}

export default LoginForm;