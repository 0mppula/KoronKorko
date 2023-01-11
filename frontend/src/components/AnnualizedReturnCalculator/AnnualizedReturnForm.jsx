import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import BalanceInput from '../FormComponents/BalanceInput';
import DurationInput from '../FormComponents/DurationInput';
import CalculateButton from '../FormComponents/CalculateButton';
import { durationMultipliers } from '../../assets/data';
import FormGroup from '../FormComponents/FormGroup';
import CurrencySelector from '../FormComponents/CurrencySelector';
import FormSelector from '../FormComponents/FormSelector';
import FormControlsTop from '../FormComponents/FormControlsTop';
import ImportCalculationModal from '../Modals/ImportCalculationModal';
import {
	closeCalculation,
	deleteCalculation,
	getCalculation,
	getCalculations,
	updateCalculation,
	createCalculation,
	renameCalculation,
} from '../../features/AnnualizedReturnCalculator/annualizedReturnCalculatorSlice';
import SaveCalculationModal from '../Modals/SaveCalculationModal';
import RenameCalculationModal from '../Modals/RenameCalculationModal';

const AnnualizedReturnForm = ({
	user,
	formData,
	setFormData,
	formErrors,
	setFormErrors,
	currency,
	setCurrency,
	setReport,
	setCalculationCount,
	setActiveCalculationId,
}) => {
	const [calculationName, setCalculationName] = useState('');
	const [saveModalOpen, setSaveModalOpen] = useState(false);
	const [importModalOpen, setImportModalOpen] = useState(false);
	const [renameModalOpen, setRenameModalOpen] = useState(false);

	const { activeCalculation, calculations } = useSelector(
		(state) => state.annualizedReturnCalculations
	);

	const dispatch = useDispatch();
	const { startingBalance, endingBalance, duration, durationMultiplier } = formData || {};

	const handleCalculation = (e) => {
		e.preventDefault();

		if (formValidated()) {
			// Time in years
			const t = (duration * durationMultiplier.value) / 12;
			const annualizedReturn = ((endingBalance / startingBalance) ** (1 / t) - 1) * 100;
			const percentReturn = ((endingBalance - startingBalance) / startingBalance) * 100;

			setReport({
				startingBalance,
				endingBalance,
				annualizedReturn,
				percentReturn,
				currency,
			});

			setCalculationCount((prev) => prev + 1);
		} else {
			toast.error('Incorrect field values');
		}
	};

	const formValidated = () => {
		const requiredFields = [startingBalance, endingBalance, duration];
		const requiredFieldLabels = ['startingBalance', 'endingBalance', 'duration'];
		const errors = { ...formErrors };

		requiredFields.forEach((rf, i) => {
			const notNumberAndEmpty = !(!isNaN(rf) && rf !== '');
			errors[requiredFieldLabels[i]] = notNumberAndEmpty;
			setFormErrors(errors);
		});

		// Check that all the required fields are numbers and not empty values
		return requiredFields.every((rf) => {
			const numberAndNotEmpty = !isNaN(rf) && rf !== '';
			return numberAndNotEmpty;
		});
	};

	const handleChange = (e) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const resetCalculator = () => {
		const errors = { ...formErrors };

		setFormData({
			startingBalance: '',
			endingBalance: '',
			duration: '',
			durationMultiplier: durationMultipliers[0],
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
			endingBalance: '',
			duration: '',
			durationMultiplier: durationMultipliers[0],
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
					{/* Starting */}
					<BalanceInput
						balance={startingBalance}
						currency={currency}
						error={formErrors.startingBalance}
						handleChange={handleChange}
					/>

					{/* Ending */}
					<BalanceInput
						balance={endingBalance}
						currency={currency}
						error={formErrors.endingBalance}
						placeholder="Your Ending Balance"
						handleChange={handleChange}
						label="Ending Balance"
						name="endingBalance"
					/>
				</FormGroup>

				<FormGroup>
					<CurrencySelector currency={currency} setCurrency={setCurrency} />
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

				<CalculateButton />
			</form>
		</div>
	);
};

export default AnnualizedReturnForm;
