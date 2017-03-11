import React from 'react';

const FormErrors = ({keyName, msgs}) => {
	if (!msgs || msgs.length < 1) return null;
	const errors = msgs.map((msg, i) => <li key={`form-error-${keyName}=${i}`}>{msg}</li>);
	return <ul className="form-errors">{errors}</ul>
}

export default FormErrors;