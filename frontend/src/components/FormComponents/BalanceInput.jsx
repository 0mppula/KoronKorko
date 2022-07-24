import React, { useRef } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';

import { customStyles, customTheme } from '../../helpers/reactSelectStyles';
import { updateUserPreferences } from '../../features/auth/authSlice';
import disableArrowKeys from '../../helpers/disableArrowKeys';
import { currencies } from '../../assets/data';

const BalanceInput = ({
	balance,
	handleChange,
	currency,
	setCurrency,
	balanceLabel,
	balanceFieldName,
	balanceFieldPlaceholder,
	error,
}) => {
	const { user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const currencyRef = useRef();

	const handleCurrencySelect = (e) => {
		setCurrency(e);
		!user && localStorage.setItem('currency', JSON.stringify(e));
		user && dispatch(updateUserPreferences({ ...user.preferences, currency: { ...e } }));
	};

	return (
		<div className="form-group">
			<div className="input-group-container">
				<div className="input-group">
					<label htmlFor={balanceFieldName}>{balanceLabel}</label>
					<input
						className={`${error ? 'error' : ''}`}
						id={balanceFieldName}
						name={balanceFieldName}
						placeholder={balanceFieldPlaceholder}
						type="number"
						min="0"
						step=".01"
						autoComplete="off"
						value={balance}
						onKeyDown={(e) => disableArrowKeys(e)}
						onWheel={() => document.activeElement.blur()}
						onChange={(e) => handleChange(e)}
					/>
				</div>
				{/* Currency selector */}
				<div className="input-group">
					<label onClick={() => currencyRef.current.focus()}>Currency</label>
					<Select
						ref={currencyRef}
						className="react-select-container"
						classNamePrefix="react-select"
						theme={customTheme}
						styles={customStyles}
						options={currencies}
						value={currency}
						isSearchable={false}
						onChange={handleCurrencySelect}
					/>
				</div>
			</div>
		</div>
	);
};

BalanceInput.defaultProps = {
	balanceLabel: 'Starting Balance',
	balanceFieldName: 'startingBalance',
	balanceFieldPlaceholder: 'Your starting balance',
};

export default BalanceInput;
