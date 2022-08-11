import React, { useRef } from 'react';
import Select from 'react-select';

import { customStyles, customTheme } from '../../helpers/reactSelectStyles';

const FormSelector = ({ options, value, setFormData, formField, label }) => {
	const selectorRef = useRef();

	const handleFormSelectChange = (e, inputField) => {
		setFormData((prev) => ({ ...prev, [inputField]: e }));
	};

	return (
		<div className="input-group">
			<label onClick={() => selectorRef.current.focus()}>{label}</label>
			<Select
				ref={selectorRef}
				className="react-select-container"
				classNamePrefix="react-select"
				value={value}
				options={options}
				theme={customTheme}
				onChange={(e) => handleFormSelectChange(e, formField)}
				styles={customStyles}
				isSearchable={false}
			/>
		</div>
	);
};

export default FormSelector;
