import React from 'react';
import { FaEuroSign, FaDollarSign, FaYenSign, FaPoundSign, FaRupeeSign } from 'react-icons/fa';
import { useSelector } from 'react-redux';

import disableArrowKeys from '../../helpers/disableArrowKeys';

const BalanceInput = ({ balance, handleChange, label, name, placeholder, error }) => {
	const { currency } = useSelector((state) => state.currency);

	const printCurrencySign = () => {
		const expr = currency?.value;
		let icon;

		switch (expr) {
			case 'eur':
				icon = <FaEuroSign />;
				break;
			case 'gbp':
				return <FaPoundSign />;
			case 'jpy':
				icon = <FaYenSign />;
				break;
			case 'inr':
				icon = <FaRupeeSign />;
				break;
			default:
				icon = <FaDollarSign />;
				break;
		}

		return icon;
	};

	return (
		<div className="input-group">
			<label htmlFor={name}>{label}</label>
			<input
				className={`${error ? 'error' : ''}`}
				id={name}
				name={name}
				placeholder={placeholder}
				type="number"
				min="0"
				step=".01"
				autoComplete="off"
				value={balance}
				onKeyDown={(e) => disableArrowKeys(e)}
				onWheel={() => document.activeElement.blur()}
				onChange={(e) => handleChange(e)}
			/>

			<div className="input-icon-wrapper currency">{printCurrencySign()}</div>
		</div>
	);
};

BalanceInput.defaultProps = {
	label: 'Starting Balance',
	name: 'startingBalance',
	placeholder: 'Your starting balance',
};

export default BalanceInput;
