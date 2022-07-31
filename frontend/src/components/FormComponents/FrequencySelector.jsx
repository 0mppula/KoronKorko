import React, { useRef } from 'react';
import Select from 'react-select';

import { customStyles, customTheme } from '../../helpers/reactSelectStyles';
import { compoundFrequencies } from '../../assets/data';

const FrequencySelector = ({ frequencyValue, setFormData, formField, label }) => {
	const rateRef = useRef();

	const handleFormSelectChange = (e, inputField) => {
		setFormData((prev) => ({ ...prev, [inputField]: e }));
	};

	return (
		<div className="input-group">
			<label onClick={() => rateRef.current.focus()}>{label}</label>
			<Select
				ref={rateRef}
				className="react-select-container"
				classNamePrefix="react-select"
				value={frequencyValue}
				options={compoundFrequencies}
				theme={customTheme}
				onChange={(e) => handleFormSelectChange(e, formField)}
				styles={customStyles}
				isSearchable={false}
			/>
		</div>
	);
};

FrequencySelector.defaultProps = {
	label: 'Compound Interval',
};

export default FrequencySelector;
