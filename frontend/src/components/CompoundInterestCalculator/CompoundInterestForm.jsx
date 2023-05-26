import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';

import {
	closeCalculation,
	createCalculation,
	getCalculations,
	getCalculation,
	deleteCalculation,
	updateCalculation,
	renameCalculation,
} from '../../features/compoundInterestCalculator/compoundInterestCalculatorSlice';
import {
	durationMultipliers,
	contributionFrequencies,
	compoundFrequencies,
} from '../../assets/data';
import calculateCompoundInterest from '../../helpers/calculateCompoundInterest';
import disableArrowKeys from '../../helpers/disableArrowKeys';
import BalanceInput from '../FormComponents/BalanceInput';
import CalculateButton from '../FormComponents/CalculateButton';
import PercentInput from '../FormComponents/PercentInput';
import DurationInput from '../FormComponents/DurationInput';
import FormGroup from '../FormComponents/FormGroup';
import CurrencySelector from '../FormComponents/CurrencySelector';
import FormSelector from '../FormComponents/FormSelector';
import FormControlsTop from '../FormComponents/FormControlsTop';
import ImportCalculationModal from '../Modals/ImportCalculationModal';
import SaveCalculationModal from '../Modals/SaveCalculationModal';
import RenameCalculationModal from '../Modals/RenameCalculationModal';

const CompoundInterestForm = ({
	user,
	formData,
	setFormData,
	formErrors,
	setFormErrors,
	setReport,
	setCalculationCount,
	setLoadingCalculation,
	setActiveCalculationId,
}) => {
	const [calculationName, setCalculationName] = useState('');
	const [saveModalOpen, setSaveModalOpen] = useState(false);
	const [importModalOpen, setImportModalOpen] = useState(false);
	const [renameModalOpen, setRenameModalOpen] = useState(false);

	const { activeCalculation, calculations, isLoading } = useSelector(
		(state) => state.compoundInterestCalculations
	);
	const { currency } = useSelector((state) => state.currency);

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

	const contributionRef = useRef();

	const handleChange = (e) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
		setCalculationName('');
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

	const openImportModal = () => {
		if (user) {
			setImportModalOpen(true);
		} else {
			toast.error('Please login to load a calculation');
		}
	};

	const closeActiveCalculation = () => {
		dispatch(closeCalculation());
		closeAndResetCalculation();
	};

	const toggleContributionMultiplier = (e) => {
		e.preventDefault();
		let value = depositting() ? -1 : 1;
		setFormData({ ...formData, contributionMultiplier: value });
		contributionRef.current.focus();
	};

	const depositting = () => {
		return contributionMultiplier > -1;
	};

	return (
		<div className="form">
			<SaveCalculationModal
				modalOpen={saveModalOpen}
				setModalOpen={setSaveModalOpen}
				calculationName={calculationName}
				formData={formData}
				setCalculationName={setCalculationName}
				createCalculation={createCalculation}
			/>

			<ImportCalculationModal
				modalOpen={importModalOpen}
				setModalOpen={setImportModalOpen}
				calculations={calculations}
				getCalculation={getCalculation}
				getCalculations={getCalculations}
				deleteCalculation={deleteCalculation}
				setActiveCalculationId={setActiveCalculationId}
				isLoading={isLoading}
			/>

			<RenameCalculationModal
				modalOpen={renameModalOpen}
				setModalOpen={setRenameModalOpen}
				activeCalculation={activeCalculation}
				renameCalculation={renameCalculation}
				calculationName={calculationName}
				setCalculationName={setCalculationName}
			/>

			<FormControlsTop
				activeCalculation={activeCalculation}
				openRenameModal={openRenameModal}
				closeActiveCalculation={closeActiveCalculation}
				openImportModal={openImportModal}
				openSaveModal={openSaveModal}
				resetForm={resetCalculator}
			/>

			<form onSubmit={handleCalculation}>
				<FormGroup>
					<BalanceInput
						balance={startingBalance}
						error={formErrors.startingBalance}
						handleChange={handleChange}
					/>

					<CurrencySelector />
				</FormGroup>

				<FormGroup>
					<PercentInput
						rate={interestRate}
						handleChange={handleChange}
						compoundFrequency={compoundFrequency}
						error={formErrors.interestRate}
					/>

					<FormSelector
						label="Compound Interval"
						formField="compoundFrequency"
						value={compoundFrequency}
						setFormData={setFormData}
						options={compoundFrequencies}
					/>
				</FormGroup>

				<FormGroup>
					<DurationInput
						duration={duration}
						error={formErrors.duration}
						handleChange={handleChange}
					/>

					<FormSelector
						label="Duration Type"
						formField="durationMultiplier"
						value={durationMultiplier}
						setFormData={setFormData}
						options={durationMultipliers}
					/>
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
						<button
							type="button"
							title={depositting() ? 'deposit' : 'withdraw'}
							className={`contribution-multiplier-icon-container 
								${depositting() ? 'deposit' : 'withdraw'} `}
							onClick={(e) => toggleContributionMultiplier(e)}
						>
							{depositting() ? <FaSignInAlt /> : <FaSignOutAlt />}
						</button>
					</div>

					<FormSelector
						label="Contribution Frequency"
						formField="contributionFrequency"
						value={contributionFrequency}
						setFormData={setFormData}
						options={contributionFrequencies}
					/>
				</FormGroup>

				<CalculateButton />
			</form>
		</div>
	);
};

export default CompoundInterestForm;
