import React, { useEffect, useState } from 'react';
import Select from 'react-select';

import CompoundInterestReport from '../../components/CompoundInterestCalculator/CompoundInterestReport';
import { customStyles, customTheme } from '../../helpers/reactSelectStyles';
import { durations, currencies } from '../../assets/data';
import './styles.css';

const CompoundInterestCalculator = () => {
	const [formData, setFormData] = useState({
		startingBalance: '',
		interestRate: '',
		duration: '',
		durationMultiplier: '12',
	});
	const [report, setReport] = useState({
		startingBalance: 0,
		futureValue: 0,
		totalProfit: 0,
		totalReturn: 0,
	});
	const [currency, setCurrency] = useState({
		name: 'dollar',
		value: 'usd',
		label: '$',
		locale: 'en-US',
	});

	const { startingBalance, interestRate, duration } = formData;

	const handleChange = (e) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSelectChange = (e) => {
		setCurrency(e);
	};


	console.log(currency.label);
	console.log('currency');

	const handleCalculation = (e) => {
		e.preventDefault();

		const rate = +interestRate / 100 + 1;
		const futureValue = +(startingBalance * rate ** duration).toFixed(2);
		const totalProfit = +(futureValue - startingBalance);
		const totalReturn = +(futureValue / startingBalance - 1) * 100;

		setReport({
			startingBalance,
			futureValue,
			totalProfit,
			totalReturn,
		});
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
							<div className="input-group">
								<Select
									className="react-select-container"
									classNamePrefix="react-select"
									theme={customTheme}
									styles={customStyles}
									options={currencies}
									defaultValue={currencies[0]}
									onChange={handleSelectChange}
								/>
							</div>
						</div>
					</div>

					<div className="form-group">
						<label htmlFor="interestRate">Interest Rate</label>
						<input
							id="interestRate"
							name="interestRate"
							placeholder="Your projected interest rate"
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
								<Select
									className="react-select-container"
									classNamePrefix="react-select"
									defaultValue={durations[0]}
									options={durations}
									theme={customTheme}
									styles={customStyles}
								/>
							</div>
						</div>
					</div>

					<div className="form-group">
						<button className="btn btn-block">Calculate</button>
					</div>
				</form>
			</div>
			<CompoundInterestReport report={report} />
		</>
	);
};

export default CompoundInterestCalculator;
