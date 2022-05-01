import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserCurrency } from '../../features/auth/authSlice';
import Select from 'react-select';

import CompoundInterestReport from '../../components/CompoundInterestCalculator/CompoundInterestReport';
import { customStyles, customTheme } from '../../helpers/reactSelectStyles';
import { durations, currencies } from '../../assets/data';
import './styles.css';
import { useTitle } from '../../hooks/useTitle';

const CompoundInterestCalculator = () => {
	useTitle('Compound Interest Calculator');
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	const [formData, setFormData] = useState({
		startingBalance: '',
		interestRate: '',
		duration: '',
		durationMultiplier: '12',
	});
	const [currency, setCurrency] = useState(
		JSON.parse(localStorage.getItem('currency')) || currencies[0]
	);
	const [report, setReport] = useState({
		startingBalance: 0,
		futureValue: 0,
		totalProfit: 0,
		totalReturn: 0,
		currency: JSON.parse(localStorage.getItem('currency')) || currencies[0],
	});

	useEffect(() => {
		if (user) {
			setCurrency(user?.preferences.currency);
		}
	}, [user]);

	const { startingBalance, interestRate, duration, durationMultiplier } = formData;

	const handleChange = (e) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleCurrencySelect = (e) => {
		setCurrency(e);
	};

	const handleDurationSelect = (e) => {
		setFormData((prev) => ({ ...prev, durationMultiplier: e.value }));
	};

	const handleCalculation = (e) => {
		e.preventDefault();

		// Interest rate as a mutliplier
		const rate = +interestRate / 100 + 1;
		const annualizedDuration = (duration * durationMultiplier) / 12;
		const futureValue = +(startingBalance * rate ** annualizedDuration).toFixed(2);
		const totalProfit = +(futureValue - startingBalance);
		const totalReturn = +(futureValue / startingBalance - 1) * 100;

		localStorage.setItem('currency', JSON.stringify(currency));

		setReport({
			startingBalance,
			futureValue,
			totalProfit,
			totalReturn,
			currency,
		});

			console.log(user.preferences.currency);
		dispatch(updateUserCurrency(user.preferences.currency));
	};

	return (
		<>
			<section className="heading">
				<h1>
					<span>C</span>ompound&nbsp;<span>I</span>nterest&nbsp;<span>C</span>alculator
				</h1>
			</section>

			<div className="form">
				<form onSubmit={handleCalculation}>
					<div className="form-group">
						<div className="input-group-container">
							<div className="input-group">
								<label htmlFor="startingBalance">Starting Balance</label>
								<input
									id="startingBalance"
									name="startingBalance"
									placeholder="Your starting balance"
									type="text"
									autoComplete="off"
									value={startingBalance}
									onChange={(e) => handleChange(e)}
								/>
							</div>
							{/* Currency selector */}
							<div className="input-group">
								<Select
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

					<div className="form-group">
						<label htmlFor="interestRate">Annual Interest Rate</label>
						<input
							id="interestRate"
							name="interestRate"
							placeholder="Your projected annual interest rate"
							type="text"
							autoComplete="off"
							value={interestRate}
							onChange={(e) => handleChange(e)}
						/>
					</div>

					<div className="form-group split">
						<div className="input-group-container">
							<div className="input-group">
								<label htmlFor="duration">Duration</label>
								<input
									id="duration"
									name="duration"
									placeholder="Duration of your investment"
									type="text"
									autoComplete="off"
									value={duration}
									onChange={(e) => handleChange(e)}
								/>
							</div>
							<div className="input-group">
								{/* Duration selector */}
								<Select
									className="react-select-container"
									classNamePrefix="react-select"
									defaultValue={durations[0]}
									options={durations}
									theme={customTheme}
									onChange={handleDurationSelect}
									styles={customStyles}
									isSearchable={false}
								/>
							</div>
						</div>
					</div>

					<div className="form-group btn-group">
						<button className="btn btn-block">Calculate</button>
					</div>
				</form>
			</div>
			<CompoundInterestReport report={report} />
		</>
	);
};

export default CompoundInterestCalculator;
