import React, { useState, useRef } from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';

import {
	createCalculation,
	updateCalculation,
} from '../../features/compoundInterestCalculator/compoundInterestCalculatorSlice';
import { customStyles, customTheme } from '../../helpers/reactSelectStyles';
import FormControlsTop from './FormControlsTop';
import {
	durationMultipliers,
	contributionFrequencies,
	compoundFrequencies,
} from '../../assets/data';
import calculateCompoundInterest from '../../helpers/calculateCompoundInterest';
import CompoundInterestSaveModal from './modals/CompoundInterestSaveModal';
import CompoundInterestImportModal from './modals/CompoundInterestImportModal';
import CompoundInterestRenameModal from './modals/CompoundInterestRenameModal';
import disableArrowKeys from '../../helpers/disableArrowKeys';
import BalanceInput from '../FormComponents/BalanceInput';
import CalculateButton from '../FormComponents/CalculateButton';
import RateInput from '../FormComponents/RateInput';
import FormGroup from '../FormComponents/FormGroup';
import CurrencySelector from '../FormComponents/CurrencySelector';

const CompoundInterestForm = ({
	user,
	formData,
	setFormData,
	formErrors,
	setFormErrors,
	setReport,
	currency,
	setCurrency,
	setCalculationCount,
	setLoadingCalculation,
	setActiveCalculationId,
}) => {
	const [calculationName, setCalculationName] = useState('');
	const [saveModalOpen, setSaveModalOpen] = useState(false);
	const [renameModalOpen, setRenameModalOpen] = useState(false);
	const [importModalOpen, setImportModalOpen] = useState(false);

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

	const durationRef = useRef();
	const contributionRef = useRef();
	const contributionFrequencyRef = useRef();

	const handleChange = (e) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleFormSelectChange = (e, inputField) => {
		setFormData((prev) => ({ ...prev, [inputField]: e }));
	};

	const formValidated = () => {
		const requiredFields = [startingBalance, interestRate, duration];
		const requiredFieldLabels = ['startingBalance', 'interestRate', 'duration'];
		const errors = { ...formErrors };

		requiredFields.forEach((rf, i) => {
			const notNumberAndEmpty = !(!isNaN(rf) && rf !== '');
			errors[requiredFieldLabels[i]] = notNumberAndEmpty;
			setFormErrors(errors);
		});

		const optionalFields = [contribution];
		const optionalFieldsValidated = optionalFields.every(
			(of) => of === '' || (!isNaN(of) && of !== '')
		);

		// Check that all the required and optional fields are numbers and not empty values
		return optionalFieldsValidated && requiredFields.every((rf) => !isNaN(rf) && rf !== '');
	};

	const handleCalculation = (e) => {
		e.preventDefault();
		// Default value for contributions is 0
		contribution === '' && setFormData({ ...formData, contribution: 0 });

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
		const errors = { ...formErrors };

		setFormData({
			startingBalance: '',
			interestRate: '',
			compoundFrequency: compoundFrequencies[1],
			duration: '',
			durationMultiplier: durationMultipliers[0],
			contribution: '',
			contributionMultiplier: 1,
			contributionFrequency: contributionFrequencies[1],
		});

		// Reset all form errors
		for (const field in errors) {
			errors[field] = false;
		}

		setFormErrors(errors);
		setReport(null);

		toast.success('Form cleared');
	};

	const closeAndResetCalculation = () => {
		setFormData({
			startingBalance: '',
			interestRate: '',
			compoundFrequency: compoundFrequencies[1],
			duration: '',
			durationMultiplier: durationMultipliers[0],
			contribution: '',
			contributionMultiplier: 1,
			contributionFrequency: contributionFrequencies[1],
		});

		setReport(null);
		setActiveCalculationId(null);
	};

	const openSaveModal = () => {
		if (user) {
			if (formValidated()) {
				if (!activeCalculation) {
					// Prompt user to name the calculation
					setSaveModalOpen(true);
				} else {
					const data = {
						_id: activeCalculation._id,
						name: calculationName,
						formData,
					};

					// Update excisting active calculation
					dispatch(updateCalculation(data));
					setCalculationName('');
				}
			} else {
				toast.error('Incorrect field values');
			}
		} else {
			toast.error('Please login to save calculation');
		}
	};

	const openRenameModal = () => {
		setRenameModalOpen(true);
	};

	const save = () => {
		const data = {
			name: calculationName,
			formData,
		};

		// Create a new calculation and set it as active
		dispatch(createCalculation(data));

		setCalculationName('');
	};

	const openImportModal = () => {
		if (user) {
			setImportModalOpen(true);
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
			<CompoundInterestImportModal
				modalOpen={importModalOpen}
				setModalOpen={setImportModalOpen}
				setActiveCalculationId={setActiveCalculationId}
			/>
			<CompoundInterestRenameModal
				modalOpen={renameModalOpen}
				setModalOpen={setRenameModalOpen}
			/>
			<FormControlsTop
				openSaveModal={openSaveModal}
				openRenameModal={openRenameModal}
				openImportModal={openImportModal}
				resetCalculator={resetCalculator}
				closeAndResetCalculation={closeAndResetCalculation}
			/>
			<form onSubmit={handleCalculation}>
				<FormGroup>
					<BalanceInput
						balance={startingBalance}
						error={formErrors.startingBalance}
						handleChange={handleChange}
						currency={currency}
						setCurrency={setCurrency}
					/>

					<CurrencySelector currency={currency} setCurrency={setCurrency} />
				</FormGroup>

				<FormGroup>
					<RateInput
						rate={interestRate}
						handleChange={handleChange}
						compoundFrequency={compoundFrequency}
						handleFormSelectChange={handleFormSelectChange}
						error={formErrors.interestRate}
					/>
				</FormGroup>

				<FormGroup>
					<div className="input-group">
						<label htmlFor="duration">Duration</label>
						<input
							id="duration"
							className={`icon-input ${formErrors.duration ? 'error' : ''}`}
							name="duration"
							placeholder="Duration of your investment"
							type="number"
							min="0"
							max="200"
							step=".01"
							autoComplete="off"
							value={duration}
							onChange={(e) => handleChange(e)}
							onKeyDown={(e) => disableArrowKeys(e)}
							onWheel={() => document.activeElement.blur()}
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
							onChange={(e) => handleFormSelectChange(e, 'durationMultiplier')}
							styles={customStyles}
							isSearchable={false}
						/>
					</div>
				</FormGroup>

				<FormGroup>
					<div className="input-group">
						<label htmlFor="contribution">Contributions (optional)</label>
						<input
							id="contribution"
							className="icon-input"
							name="contribution"
							placeholder={depositting() ? 'Your deposits' : 'Your withdrawals'}
							type="number"
							min="0"
							step=".01"
							autoComplete="off"
							value={contribution}
							ref={contributionRef}
							onChange={(e) => handleChange(e)}
							onKeyDown={(e) => disableArrowKeys(e)}
							onWheel={() => document.activeElement.blur()}
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
							onChange={(e) => handleFormSelectChange(e, 'contributionFrequency')}
							styles={customStyles}
							isSearchable={false}
						/>
					</div>
				</FormGroup>

				<CalculateButton />
			</form>
		</div>
	);
};

export default CompoundInterestForm;
