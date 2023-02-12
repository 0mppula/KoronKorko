import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';

import BalanceInput from '../FormComponents/BalanceInput';
import PercentInput from '../FormComponents/PercentInput';
import DurationInput from '../FormComponents/DurationInput';
import CalculateButton from '../FormComponents/CalculateButton';
import { durationMultipliers } from '../../assets/data';
import FormGroup from '../FormComponents/FormGroup';
import CurrencySelector from '../FormComponents/CurrencySelector';
import FormSelector from '../FormComponents/FormSelector';
import FormControlsTop from '../FormComponents/FormControlsTop';
import ImportCalculationModal from '../Modals/ImportCalculationModal';
import SaveCalculationModal from '../Modals/SaveCalculationModal';
import RenameCalculationModal from '../Modals/RenameCalculationModal';
import {
	closeCalculation,
	deleteCalculation,
	getCalculation,
	getCalculations,
	updateCalculation,
	createCalculation,
	renameCalculation,
} from '../../features/presentValueCalculator/presentValueCalculatorSlice';

const PresentValueCalculator = ({
	user,
	formData,
	setFormData,
	formErrors,
	setFormErrors,
	setReport,
	setCalculationCount,
	setActiveCalculationId,
}) => {
	const [calculationName, setCalculationName] = useState('');
	const [saveModalOpen, setSaveModalOpen] = useState(false);
	const [importModalOpen, setImportModalOpen] = useState(false);
	const [renameModalOpen, setRenameModalOpen] = useState(false);

	const { activeCalculation, calculations, isLoading } = useSelector(
		(state) => state.presentValueCalculations
	);

	const { currency } = useSelector((state) => state.currency);

	const dispatch = useDispatch();
	const { startingBalance, duration, discountRate, durationMultiplier } = formData || {};

	const handleCalculation = (e) => {
		e.preventDefault();

		if (formValidated()) {
			// PV = FV * (1 / (1 + r) ^ n)
			const FV = startingBalance;
			const r = discountRate / 100;
			const n = (duration * durationMultiplier.value) / 12;
			const PV = FV * (1 / (1 + r) ** n);

			setReport({
				presentValue: PV,
				currency,
			});

			setCalculationCount((prev) => prev + 1);
		} else {
			toast.error('Incorrect field values');
		}
	};

	const formValidated = () => {
		const requiredFields = [startingBalance, duration, discountRate];
		const requiredFieldLabels = ['startingBalance', 'duration', 'discountRate'];
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
			duration: '',
			durationMultiplier: durationMultipliers[0],
			discountRate: '',
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
			duration: '',
			durationMultiplier: durationMultipliers[0],
			discountRate: '',
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
					{/* Starting */}
					<BalanceInput
						balance={startingBalance}
						error={formErrors.startingBalance}
						handleChange={handleChange}
						label="Future Value"
						placeholder="Your Future Value"
					/>

					<CurrencySelector />
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
					<PercentInput
						rate={discountRate}
						handleChange={handleChange}
						error={formErrors.discountRate}
						label="Discount Rate"
						name="discountRate"
						placeholder="Your projected discount rate"
					/>
				</FormGroup>

				<CalculateButton />
			</form>
		</div>
	);
};

export default PresentValueCalculator;
