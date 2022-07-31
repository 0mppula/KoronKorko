import React, { useRef } from 'react';
import Select from 'react-select';
import { FaPercent } from 'react-icons/fa';

import { customStyles, customTheme } from '../../helpers/reactSelectStyles';
import disableArrowKeys from '../../helpers/disableArrowKeys';
import { compoundFrequencies } from '../../assets/data';

const RateInput = ({
	rate,
	handleChange,
	compoundFrequency,
	handleFormSelectChange,
	error,
	label,
	name,
	placeholder,
	showInterval,
}) => {
	const rateRef = useRef();

	return (
		<>
			<div className="input-group">
				<label htmlFor={name}>{label}</label>
				<input
					id={name}
					className={`${error ? 'error' : ''}`}
					name={name}
					placeholder={placeholder}
					type="number"
					min="0"
					step=".01"
					autoComplete="off"
					value={rate}
					onChange={(e) => handleChange(e)}
					onKeyDown={(e) => disableArrowKeys(e)}
					onWheel={() => document.activeElement.blur()}
				/>
				<div className="input-icon-wrapper">
					<FaPercent />
				</div>
			</div>
			{showInterval && (
				<div className="input-group">
					{/* Compound frequency selector */}
					<label onClick={() => rateRef.current.focus()}>Compound Interval</label>
					<Select
						ref={rateRef}
						className="react-select-container"
						classNamePrefix="react-select"
						value={compoundFrequency}
						options={compoundFrequencies}
						theme={customTheme}
						onChange={(e) => handleFormSelectChange(e, 'compoundFrequency')}
						styles={customStyles}
						isSearchable={false}
					/>
				</div>
			)}
		</>
	);
};

RateInput.defaultProps = {
	showInterval: true,
	label: 'Annual Interest Rate',
	name: 'interestRate',
	placeholder: 'Annual interest rate',
};

export default RateInput;
