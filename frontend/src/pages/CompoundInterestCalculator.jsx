import React, { useState } from 'react';

import CompoundInterestReport from '../components/CompoundInterestReport/CompoundInterestReport';

const CompoundInterestCalculator = () => {
	const [formData, setFormData] = useState({
		startingBalance: '',
		interestRate: '',
		duration: '',
	});
	const [report, setReport] = useState({
		startingBalance: 0,
		futureValue: 0,
		totalProfit: 0,
		totalReturn: 0,
	});

	const { startingBalance, interestRate, duration } = formData;

	const handleChange = (e) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

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
						<label htmlFor="startingBalance">Starting Balance</label>
						<input
							id="startingBalance"
							name="startingBalance"
							placeholder="Enter your starting balance"
							type="text"
							value={startingBalance}
							onChange={(e) => handleChange(e)}
						/>
					</div>

					<div className="form-group">
						<label htmlFor="interestRate">Interest Rate</label>
						<input
							id="interestRate"
							name="interestRate"
							placeholder="Enter your projected interest rate"
							type="text"
							value={interestRate}
							onChange={(e) => handleChange(e)}
						/>
					</div>

					<div className="form-group">
						<label htmlFor="duration">Duration</label>
						<input
							id="duration"
							name="duration"
							placeholder="Enter the duration of the compoundment"
							type="text"
							value={duration}
							onChange={(e) => handleChange(e)}
						/>
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
