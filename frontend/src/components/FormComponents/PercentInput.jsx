import React from 'react';
import { FaPercent } from 'react-icons/fa';

import disableArrowKeys from '../../helpers/disableArrowKeys';

const PercentInput = ({ rate, handleChange, error, label, name, placeholder }) => {
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
		</>
	);
};

PercentInput.defaultProps = {
	showInterval: true,
	label: 'Annual Interest Rate',
	name: 'interestRate',
	placeholder: 'Annual interest rate',
};

export default PercentInput;
