import React, { useState, useRef } from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { FaSignOutAlt, FaSignInAlt, FaPercent } from 'react-icons/fa';

import { createCalculation, updateCalculation } from '../../features/compoundInterestCalculator/compoundInterestCalculatorSlice';
import { customStyles, customTheme } from '../../helpers/reactSelectStyles';
import FormControlsTop from './FormControlsTop';
import {
	durationMultipliers,
	currencies,
	contributionFrequencies,
	compoundFrequencies,
} from '../../assets/data';
import { updateUserPreferences } from '../../features/auth/authSlice';
import calculateCompoundInterest from '../../helpers/calculateCompoundInterest';
import CompoundInterestSaveModal from './CompoundInterestSaveModal';

const CompoundInterestForm = ({
	user,
	formData,
	setFormData,
	setReport,
	currency,
	setCurrency,
	setCalculationCount,
	setLoadingCalculation,
}) => {
	const [calculationName, setCalculationName] = useState('');
	const [saveModalOpen, setSaveModalOpen] = useState(false);

	const { activeCalculation } = useSelector((state) => state.compoundInterestCalculations);

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
	} = formData || {};

	const currencyRef = useRef();
	const interestIntervalRef = useRef();
	const durationRef = useRef();
	const contributionRef = useRef();
	const contributionFrequencyRef = useRef();

	const handleChange = (e) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const disableArrowKeys = (e) => {
		if (e.which === 38 || e.which === 40) {
			e.preventDefault();
		}
	};

	const handleCurrencySelect = (e) => {
		setCurrency(e);
		!user && localStorage.setItem('currency', JSON.stringify(e));
		user && dispatch(updateUserPreferences({ ...user.preferences, currency: { ...e } }));
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
			const compoundInterest = calculateCompoundInterest(formData);
			let breakdown;

			// If investment duration is over 24 months set the chart breakdown option to yearly
			if (durationMultiplier.value * duration >= 24) {
				breakdown = 'yearly';
			} else {
				breakdown = 'monthly';
			}

			setReport({
				...compoundInterest,
				depositting: depositting(),
				currency,
				breakdown,
			});
			setCalculationCount((prev) => prev + 1);
			setLoadingCalculation(true);
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

		setReport(null);

		toast.success('Form cleared');
	};

	const openSaveModal = () => {
		if (user) {
			if (formValidated()) {
				setSaveModalOpen(true);
			} else {
				toast.error('Incorrect field values');
			}
		} else {
			toast.error('Please login to save calculation');
		}
	};

	const save = () => {
		const data = {
			name: calculationName,
			formData,
		};

		if(activeCalculation) {
			// Update excisting active calculation
			dispatch(updateCalculation(data));
			toast.success('Calculation saved');
		} else {
			// Create a new calculation
			dispatch(createCalculation(data));
			toast.success('New calculation saved');
		}
		setCalculationName('');
	};

	const openCalculation = () => {
		if (user) {
			console.log('OPENING CALCULATION!!!');
		} else {
			toast.error('Please login to load a calculation');
		}
	};

	const toggleContributionMultiplier = () => {
		let value = depositting() ? -1 : 1;
		setFormData({ ...formData, contributionMultiplier: value });
		contributionRef.current.focus();
	};

	const depositting = () => {
		return contributionMultiplier > -1;
	};

	return (
		<div className="form">
			<CompoundInterestSaveModal
				modalOpen={saveModalOpen}
				setModalOpen={setSaveModalOpen}
				calculationName={calculationName}
				setCalculationName={setCalculationName}
				save={save}
			/>
			<FormControlsTop
				openSaveModal={openSaveModal}
				setModalOpen={setSaveModalOpen}
				resetCalculator={resetCalculator}
			/>
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
								min="0"
								autoComplete="off"
								value={startingBalance}
								onKeyDown={(e) => disableArrowKeys(e)}
								onWheel={(e) => document.activeElement.blur()}
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
							<label htmlFor="interestRate">Annual Interest Rate</label>
							<input
								id="interestRate"
								className="icon-input"
								name="interestRate"
								placeholder="Your projected interest rate"
								type="number"
								min="0"
								autoComplete="off"
								value={interestRate}
								onChange={(e) => handleChange(e)}
								onKeyDown={(e) => disableArrowKeys(e)}
								onWheel={(e) => document.activeElement.blur()}
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
								min="0"
								max="999"
								autoComplete="off"
								value={duration}
								onChange={(e) => handleChange(e)}
								onKeyDown={(e) => disableArrowKeys(e)}
								onWheel={(e) => document.activeElement.blur()}
							/>
						</div>
						<div className="input-group">
							{/* Duration selector */}
							<label onClick={() => durationRef.current.focus()}>Duration Type</label>
							<Select
								ref={durationRef}
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
								className="icon-input"
								name="contribution"
								placeholder={depositting() ? 'Your deposits' : 'Your withdrawals'}
								type="number"
								min="0"
								autoComplete="off"
								value={contribution}
								ref={contributionRef}
								onChange={(e) => handleChange(e)}
								onKeyDown={(e) => disableArrowKeys(e)}
								onWheel={(e) => document.activeElement.blur()}
							/>
							<div
								tabIndex={0}
								className={`contribution-multiplier-icon-container 
								${depositting() ? 'deposit' : 'withdraw'} `}
								onClick={toggleContributionMultiplier}
							>
								{depositting() ? <FaSignInAlt /> : <FaSignOutAlt />}
							</div>
						</div>
						<div className="input-group">
							{/* Contribution selector */}
							<label onClick={() => contributionFrequencyRef.current.focus()}>
								Contribution Frequency
							</label>
							<Select
								className="react-select-container"
								classNamePrefix="react-select"
								ref={contributionFrequencyRef}
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
