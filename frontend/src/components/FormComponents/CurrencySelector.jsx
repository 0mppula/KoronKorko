import React, { useRef } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';

import { customStyles, customTheme } from '../../helpers/reactSelectStyles';
import { updateUserPreferences } from '../../features/auth/authSlice';
import { currencies } from '../../assets/data';

const CurrencySelector = ({ currency, setCurrency }) => {
	const { user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const currencyRef = useRef();

	const handleCurrencySelect = (e) => {
		setCurrency(e);
		!user && localStorage.setItem('currency', JSON.stringify(e));
		user && dispatch(updateUserPreferences({ ...user.preferences, currency: { ...e } }));
	};

	return (
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
	);
};

export default CurrencySelector;
