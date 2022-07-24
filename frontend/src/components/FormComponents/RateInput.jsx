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
	rateLabel,
	rateFieldName,
	rateFieldPlaceholder,
	showInterval,
}) => {
	const rateRef = useRef();

	return (
		<div className="form-group split">
			<div className="input-group-container">
				<div className="input-group">
					<label htmlFor={rateFieldName}>{rateLabel}</label>
					<input
						id={rateFieldName}
						className={`${error ? 'error' : ''}`}
						name={rateFieldName}
						placeholder={rateFieldPlaceholder}
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
						<label onClick={() => rateRef.current.focus()}>
							Compound Interval
						</label>
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
			</div>
		</div>
	);
};

RateInput.defaultProps = {
	showInterval: true,
	rateLabel: 'Annual Interest Rate',
	rateFieldName: 'interestRate',
	rateFieldPlaceholder: 'Your projected interest rate',
};

export default RateInput;
