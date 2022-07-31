import React from 'react';

const FormGroup = ({ children }) => {
	return (
		<div className="form-group">
			<div className="input-group-container">{children}</div>
		</div>
	);
};

export default FormGroup;
