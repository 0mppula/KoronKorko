import React, { useRef } from 'react';
import Select from 'react-select';

import { customStyles, customTheme } from '../../helpers/reactSelectStyles';
import { durationMultipliers } from '../../assets/data';

const DurationSelector = ({ setFormData, durationMultiplier, formField, label }) => {
	const durationRef = useRef();

	const handleFormSelectChange = (e, inputField) => {
		setFormData((prev) => ({ ...prev, [inputField]: e }));
	};

	return (
		<div className="input-group">
			<label onClick={() => durationRef.current.focus()}>{label}</label>
			<Select
				ref={durationRef}
				className="react-select-container"
				classNamePrefix="react-select"
				value={durationMultiplier}
				options={durationMultipliers}
				theme={customTheme}
				onChange={(e) => handleFormSelectChange(e, formField)}
				styles={customStyles}
				isSearchable={false}
			/>
		</div>
	);
};

DurationSelector.defaultProps = {
	label: 'Duration Type',
};

export default DurationSelector;
