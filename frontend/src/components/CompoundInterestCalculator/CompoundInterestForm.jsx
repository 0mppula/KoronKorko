import React, { useRef } from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { FaSignOutAlt, FaSignInAlt, FaPercent } from 'react-icons/fa';

import { customStyles, customTheme } from '../../helpers/reactSelectStyles';
import FormControlsTop from './FormControlsTop';
import {
	durationMultipliers,
	currencies,
	contributionFrequencies,
	compoundFrequencies,
} from '../../assets/data';
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
		compoundFrequency,
		duration,
		durationMultiplier,
		contribution,
		contributionMultiplier,
		contributionFrequency,
	} = formData;

	const currencyRef = useRef();
	const interestIntervalRef = useRef();
	const durationRef = useRef();
	const contributionFrequencyRef = useRef();

	const handleChange = (e) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleCurrencySelect = (e) => {
		setCurrency(e);
	};

	const handleCompoundFrequencySelect = (e) => {
		setFormData((prev) => ({ ...prev, compoundFrequency: e }));
	};

	const handleDurationSelect = (e) => {
		setFormData((prev) => ({ ...prev, durationMultiplier: e }));
	};

	const handleContributionSelect = (e) => {
		setFormData((prev) => ({ ...prev, contributionFrequency: e }));
	};

	const formValidated = () => {
		const requiredFields = [startingBalance, interestRate, duration];
		const optionalFields = [contribution];
		const optionalFieldsValidated = optionalFields.every(
			(of) => of === '' || (!isNaN(of) && of !== '')
		);

		// Check that all the required and optional fields are numbers and not empty values
		return optionalFieldsValidated && requiredFields.every((rf) => !isNaN(rf) && rf !== '');
	};

	const handleCalculation = (e) => {
		e.preventDefault();
		if (formValidated()) {
			// Compounded Interest for Principal
			// CI = P(1 + r/n)^(nt)

			// Future Value of a Series
			// FV = PMT * (((1 + r / n) ** (n * t) - 1) / (r / n))

			// Total amount
			// T = CI + FV

			// Where:
			// PMT = addition freq / compound freq
			// CI = the future value of the investment/loan, including interest
			// P = Principal investment amount (the initial deposit or loan amount)
			// r = Annual interest rate (decimal)
			// n = Compound frequency per year
			// t = Investment time in years

			const PMT =
				contributionMultiplier *
				contribution *
				(contributionFrequency.value / compoundFrequency.value);
			const P = +startingBalance;
			const r = interestRate / 100;
			const n = compoundFrequency.value;
			const t = (duration * durationMultiplier.value) / 12;

			const CI = P * (1 + r / n) ** (n * t);
			const FV = PMT * (((1 + r / n) ** (n * t) - 1) / (r / n));
			const T = CI + FV;
			const APY = ((1 + r / n) ** n - 1) * 100;

			const totalContributions =
				contributionMultiplier * contribution * contributionFrequency.value * t;

			const totalPrincipal = totalContributions + P;
			const totalProfit = T - totalPrincipal;

			!user && localStorage.setItem('currency', JSON.stringify(currency));
			user && dispatch(updateUserPreferences({ ...user.preferences, currency }));

			setReport({
				contribution: totalPrincipal,
				futureValue: T,
				totalProfit,
				totalReturn: APY,
				principal: P,
				additional: totalContributions,
				depositting: depositting(),
				currency,
			});
		} else {
			toast.error('Incorrect field values');
		}
	};

	const resetCalculator = () => {
		setFormData({
			...formData,
			startingBalance: '',
			interestRate: '',
			compoundFrequency: compoundFrequencies[0],
			duration: '',
			durationMultiplier: durationMultipliers[0],
			contribution: '',
			contributionMultiplier: 1,
			contributionFrequency: contributionFrequencies[0],
		});

		setReport({
			...report,
			contribution: 0,
			futureValue: 0,
			totalProfit: 0,
			totalReturn: 0,
			principal: 0,
			additional: 0,
		});

		toast.success('Form cleared');
	};

	const save = () => {
		toast.success('Form Saved');
	};

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
								type="number"
								autoComplete="off"
								value={startingBalance}
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

				<div className="form-group split">
					<div className="input-group-container">
						<div className="input-group">
							<label htmlFor="interestRate">Interest Rate</label>
							<input
								id="interestRate"
								name="interestRate"
								placeholder="Your projected interest rate"
								type="number"
								autoComplete="off"
								value={interestRate}
								onChange={(e) => handleChange(e)}
							/>
							<div className="input-icon-wrapper">
								<FaPercent />
							</div>
						</div>
						<div className="input-group">
							{/* Compound frequency selector */}
							<label onClick={() => interestIntervalRef.current.focus()}>
								Compound Interval
							</label>
							<Select
								ref={interestIntervalRef}
								className="react-select-container"
								classNamePrefix="react-select"
								value={compoundFrequency}
								options={compoundFrequencies}
								theme={customTheme}
								onChange={handleCompoundFrequencySelect}
								styles={customStyles}
								isSearchable={false}
							/>
						</div>
					</div>
				</div>

				<div className="form-group split">
					<div className="input-group-container">
						<div className="input-group">
							<label htmlFor="duration">Duration</label>
							<input
								id="duration"
								name="duration"
								placeholder="Duration of your investment"
								type="number"
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
								value={durationMultiplier}
								options={durationMultipliers}
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
								type="number"
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
								value={contributionFrequency}
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
