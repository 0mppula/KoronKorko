import React, { useState } from 'react';

const CompoundInterestCalculator = () => {
	const [formData, setFormData] = useState({
		startingBalance: '',
		interestRate: '',
		duration: '',
	});

	const { startingBalance, interestRate, duration } = formData;

	const handleChange = (e) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<>
			<section className="heading">
				<h1>Compound Interest Calculator</h1>
			</section>

			<div className="form">
				<form onSubmit={handleSubmit}>
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
				</form>
			</div>
		</>
	);
};

export default CompoundInterestCalculator;
