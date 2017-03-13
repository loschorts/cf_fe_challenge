var config = require('../../nightwatch.conf.js');

const setup = b => {
		b.url('localhost:3000')
}

const valid = {email: "proper@format.com", password: "longenough"}
const invalid = {email: "not.right@", password: "short"}

const form = '.login-form';
const email = `${form} input[name=Email]`
const password = `${form} input[name=Password]`
const submit = `${form} input[type=submit]`

const elements = [form, email, password, submit]

const FillOutForm = (b, input) => {
	b.setValue(email, input.email)
	b.setValue(password, input.password)
}

const FormDisabled = b => {
	setup(b)

	elements.forEach(el => {
		b.expect.element(el).to.be.present
	})

	b.getValue(email, r => b.assert.equal(r.value, ''))
	b.getValue(password, r => b.assert.equal(r.value, ''))
	b.getAttribute(submit, "disabled", r => b.assert.equal(r.value, 'true'))

	FillOutForm(b, valid);

	b.getAttribute(submit, "disabled", r => b.assert.equal(r.value, null))

	b.end();
}

const ErrorMessagesAppear = b => {
	setup(b)
	b.expect.element('.form-errors').not.to.be.present

	FillOutForm(b, invalid);
	b.click(submit);

	b.expect.element('.form-errors').to.be.present

	b.end();
}

const ServerErrorsAppear = b => {
	setup(b)
	b.expect.element('.form-errors').not.to.be.present
	FillOutForm(b, valid);
	b.click(submit);

	b.pause(500);
	b.expect.element('.form-errors').text.to.contain('Server');

	b.end();

}

module.exports =  {
	"Form submission is disabled until fields are not empty": FormDisabled,
	"Form displays error messages on invalid fields": ErrorMessagesAppear,
	"Form displays server errors after login attempt": ServerErrorsAppear,
}