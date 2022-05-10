import React from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';

import { customStyles, customTheme } from '../../helpers/reactSelectStyles';
import FormControlsTop from './FormControlsTop';
import { durations, currencies, contributionFrequencies } from '../../assets/data';
import { updateUserPreferences } from '../../features/auth/authSlice';

const CompoundInterestForm = ({
	user,
	formData,
	setFormData,
	report,
	setReport,
	currency,
	setCurrency,
}) => {
	const dispatch = useDispatch();
	const {
		startingBalance,
		interestRate,
		duration,
		durationMultiplier,
		contribution,
		contributionMultiplier,
	} = formData;

	const handleChange = (e) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleCurrencySelect = (e) => {
		setCurrency(e);
	};

	const handleDurationSelect = (e) => {
		setFormData((prev) => ({ ...prev, durationMultiplier: e.value }));
	};

	const handleContributionSelect = (e) => {
		setFormData((prev) => ({ ...prev, contributionFrequency: e.value }));
	};

	const formValidated = () => {
		const requiredFields = [startingBalance, interestRate, duration];
		const optionalFields = [contribution];
		const optionalFieldsValidated = optionalFields.every(of => of === '' || (!isNaN(of) && of !== ''))


		// Check that all the required and optional fields are numbers and not empty values
		return optionalFieldsValidated && requiredFields.every((rf) => !isNaN(rf) && rf !== '');
	};

	const handleCalculation = (e) => {
		e.preventDefault();
		if (formValidated()) {
			// Compounded Interest for Principal
			// CI = P(1 + r/n)^(nt)

			// Future Value of a Series
			// FV = PMT * (((1 + r / n) ^ (nt - 1)) / (r / 2));

			// Total amount
			// T = CI + FV

			// Where:
			// CI = the future value of the investment/loan, including interest
			// P = the principal investment amount (the initial deposit or loan amount)
			// r = the annual interest rate (decimal)
			// n = the number of times that interest is compounded per unit t
			// t = investment time in years

			const rate = +interestRate / 100 + 1;
			const annualizedDuration = (duration * durationMultiplier) / 12;
			const futureValue = +(startingBalance * rate ** annualizedDuration).toFixed(2);
			const totalProfit = +(futureValue - startingBalance);
			const totalReturn = +(futureValue / startingBalance - 1) * 100;

			!user && localStorage.setItem('currency', JSON.stringify(currency));

			setReport({
				startingBalance,
				futureValue,
				totalProfit,
				totalReturn,
				currency,
			});

			user && dispatch(updateUserPreferences({ ...user.preferences, currency }));
		} else {
			toast.error('Incorrect field values');
		}
	};

	const resetCalculator = () => {
		setFormData({
			...formData,
			startingBalance: '',
			interestRate: '',
			duration: '',
			contribution: '',
			contributionMultiplier: 1,
		});

		setReport({
			...report,
			startingBalance: 0,
			futureValue: 0,
			totalProfit: 0,
			totalReturn: 0,
		});

		toast.success('Form cleared')
	};

	const save = () => {
		toast.success('Form Saved')
	}

	const toggleContributionMultiplier = () => {
		let value = depositting() ? -1 : 1;
		setFormData({ ...formData, contributionMultiplier: value });
	};

	const depositting = () => {
		return contributionMultiplier > -1;
	};

	return (
		<div className="form">
			<FormControlsTop save={save} resetCalculator={resetCalculator} />
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

				<div className="form-group split">
					<div className="input-group-container">
						<div className="input-group">
							<label htmlFor="contribution">Contributions (optional)</label>
							<input
								id="contribution"
								name="contribution"
								placeholder={depositting() ? 'Your deposits' : 'Your withdrawals'}
								type="text"
								autoComplete="off"
								value={contribution}
								onChange={(e) => handleChange(e)}
							/>
							<div
								className={`contribution-multiplier-icon-container 
								${depositting() ? 'deposit' : 'withdraw'} `}
								onClick={toggleContributionMultiplier}
							>
								{depositting() ? <FaSignInAlt /> : <FaSignOutAlt />}
							</div>
						</div>
						<div className="input-group">
							{/* Contribution selector */}
							<Select
								className="react-select-container"
								classNamePrefix="react-select"
								defaultValue={contributionFrequencies[0]}
								options={contributionFrequencies}
								theme={customTheme}
								onChange={handleContributionSelect}
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
	);
};

export default CompoundInterestForm;
